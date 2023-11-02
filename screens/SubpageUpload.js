import HelloUser from '../components/HelloUser';
import Message from '../components/Message';
import CustomButton from '../components/CustomButton';
import Colors from '../assets/css/globalStyles';

import React, { useState, useContext,useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Animated } from 'react-native';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useAuth } from '../AuthContext';
import I18n from '../translations'
// import { RNCamera } from 'react-native-camera';


// import CameraComponent from '../components/CameraOld'; // adjust the path according to your project structure

import Camera from '../components/Camera';
function SubpageUpload({ navigation }) {
    const [isButtonDisabled, setIsButtonDisabled] = useState(false); // New state to manage button's disabled state
    const [showMessageButtonToggled, setShowMessageButtonToggled] = useState(false);
    const [isGalleryEmpty, setIsGalleryEmpty] = useState(true);

    const flashOpacity = useRef(new Animated.Value(0)).current;
    const [cameraStream, setCameraStream] = useState(null);
    const videoRef = useRef(null);
    const imageRef = useRef(null);

    const animateFlash = () => {
        // Set the flash opacity to 1 immediately
       
        flashOpacity.setValue(1);

        // Start the fade-out animation
        Animated.timing(flashOpacity, {
            toValue: 0,
            duration: 500, // this can be adjusted
            useNativeDriver: true // use the native driver for performance
        }).start();
    };

    const startCamera = async () => {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            setCameraStream(stream);
        } catch (error) {
            console.error('Error starting the camera', error);
        }
    };

    const stopCamera = () => {
        if (cameraStream) {
            const tracks = cameraStream.getTracks();
            tracks.forEach(track => track.stop());
            setCameraStream(null);
        }
    };

    const captureImage = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0);
            imageRef.current.src = canvas.toDataURL('image/png');
            stopCamera();
        }
    };

    const handleTakePicture = async () => {
        if (cameraRef) {
            const options = { quality: 0.5, base64: true };
            const data = await cameraRef.takePictureAsync(options);
            console.log(data.uri);
        }
    };

    const [city, setCity] = useState("");
    const [delayAmount, setDelayAmount] = useState("");
    const [message, setMessage] = useState("");
    const auth = useAuth();

    
    const [photoTaken, setPhotoTaken] = useState(false);
    const handleSubmit = async () => {
        animateFlash();
    
        // Get all canvas elements inside the galleryRef.current
        // NOTE: Adjust this according to where and how your galleryRef is defined
        const canvases = document.querySelectorAll('.gallery__container canvas');
    
        // I
        // Iterate over all canvas elements
        Array.from(canvases).forEach((canvas) => {
            //debugger
            // Convert each canvas to a Data URL (base64 format)
            const photo = canvas.toDataURL('image/png');
           
            // Log the base64 photo string
            console.log(photo);
    
            // You can use the photo variable to send this base64 image in a request, for example
            const currentTime = new Date().toISOString();
            const delayData = {
                city,
                delayAmount,
                message: "I have uploaded a photo",
                photo, // Here the photo variable is being used
                routeDirection: auth.routeDirection,
                submittedTime: currentTime,
            };
    
            // Use Axios to send the request
            let url = 'https://1944.methinks.pl/backend/mobile/store-image.php';
            url = 'https://folotruck.com/backend/mobile/store-image.php';
            axios.post(url, delayData)
                .then((response) => {
                    // Handle the response accordingly
                    console.log(response);
                })
                .catch((error) => {
                    // Handle the error accordingly
                    console.error("Error:", error);
                });
        });
    
        // The rest of your existing code remains the same
    };
    


    const handleFinish = async() => {
        setIsButtonDisabled(true); // Disable the button once clicked

         const canvases = document.querySelectorAll('.gallery__container canvas');
    
        //debugger
        // Iterate over all canvas elements
        Array.from(canvases).forEach((canvas) => {
           
            // Convert each canvas to a Data URL (base64 format)
            const photo = canvas.toDataURL('image/png');
           
            // Log the base64 photo string
            console.log(photo);
            //debugger
            // You can use the photo variable to send this base64 image in a request, for example
            const currentTime = new Date().toISOString();
            const delayData = {
                userId: auth.userId,
                driverId: auth.driverId,
                city,
                delayAmount,
                message: "I have uploaded a photo",
                photo:photo, // Here the photo variable is being used
                routeDirection: auth.routeDirection,
                submittedTime: currentTime,
            };
    
            // Use Axios to send the request
            let url = 'https://folotruck.com/backend/mobile/store-image.php';
            // url = 'http://localhost:4000/backend/mobile/store-image.php';
            axios.post(url, delayData)
                .then((response) => {
                    // Handle the response accordingly
                    console.log(response);
                    alert('submitted image')
                })
                .catch((error) => {
                    // Handle the error accordingly
                    console.error("Error:", error);
                });
        });

        try {
        const newStatus = 'CMR';  // Set your new status value here
        const statusUrl = 'https://folotruck.com/backend/mobile/set-status.php'; // URL to the set-status.php

            const statusData = {
                userRole: auth.userRole,
                driverId: auth.driverId,
                userId: auth.userId,
                status: newStatus
            };

            const response = await axios.post(statusUrl, statusData);

            if (response.data.success) {
                // alert('Status updated successfully!');
            } else {
                throw new Error('Failed to update status');
            }
        } catch (error) {
            alert("Error saving data!");
            console.error("Error:", error);
        }
        alert("Your data was submitted!");
        navigation.navigate('Home')
    };

    return (
        <>

      
            <Animated.View pointerEvents="none"  style={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                backgroundColor: 'white',
                opacity: flashOpacity, // bind the opacity to flashOpacity
                zIndex: 1000 
            }}></Animated.View>
            {/* <HelloUser></HelloUser> */}
            <Message style={{marginTop:4} } title={I18n.t('uploadCMR')}></Message>

         
            <View style={styles.containerButtons}>
    <TouchableOpacity 
        style={[styles.buttonSecond, !isGalleryEmpty ? styles.redBackground : {}]} 
        onPress={handleFinish} 
        disabled={isGalleryEmpty}
    >
        <Text style={styles.buttonText}>{I18n.t('sendMessagePhoto')}</Text>
    </TouchableOpacity>
    <TouchableOpacity   
        onPress={() => setShowMessageButtonToggled(!showMessageButtonToggled)}  
        style={[styles.buttonSecond, (!isGalleryEmpty ||showMessageButtonToggled) ? styles.redBackground : {}]} 
        disabled={isGalleryEmpty && !showMessageButtonToggled}
    >
        <Text style={styles.buttonText}>

        {showMessageButtonToggled ? I18n.t('hideMessagePhoto') : I18n.t('showMessagePhoto')}
            
        </Text>
    </TouchableOpacity>
</View>
            <Camera 
            animateFlash={animateFlash} 
            setMessage={setMessage} 
            setPhotoTaken={setPhotoTaken} 
            showMessageButtonToggled={showMessageButtonToggled}
            setIsGalleryEmpty={setIsGalleryEmpty} 
            />


  
            {/* <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit} >
                    <Text style={styles.buttonText}>Upload photo </Text>
                </TouchableOpacity>
                </View> */}
       
            
        </>
    );
};

const styles = StyleSheet.create({
    redBackground: {
        backgroundColor: Colors.accentColor,
    },
    button: {
        width: '96%',
        margin: 8,
        
        padding: 8,
        borderRadius: 4,
        backgroundColor: "gainsboro",
    },
    containerButtons: {
        flexDirection: 'row', // to place the buttons in a row
        justifyContent: 'space-between', // to put space between the buttons
        // marginLeft: '2%', // left margin
        // marginRight: '2%', // right margin
        borderColor: '#ececec',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: "white",
        margin: 4,
        marginTop:0,
        marginBottom:4,
        paddingTop:8,
        paddingBottom:8
        
    },


    buttonSecond: {
        flex: 1, // to ensure buttons take equal width
        marginLeft: '1%', // half of the desired space between buttons
        marginRight: '1%', // half of the desired space between buttons
        marginBottom: 0,
        
        padding: 8,
        borderRadius: 4,
        backgroundColor: "gainsboro",
    },
    buttonText: {
        color: '#fff',
        textAlign: 'center',
    },
    label:{
        marginLeft:5,
        marginRight:5,
        paddingLeft:5,
        paddingRight:5,
        paddingBottom:10,
        marginBottom:10,
        borderBottomColor:"#e4e4e4",
        borderBottomWidth:1,
        
    },
    input:{

        paddingLeft:5,
        padding:5,
        marginLeft:5,
        marginRight:5,
      
    },
    container: {
   
        borderColor: '#ececec',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: "white",
        margin: 4,
        marginTop:4,
        paddingTop:8,
        paddingBottom:8
        
      },
});

export default SubpageUpload;