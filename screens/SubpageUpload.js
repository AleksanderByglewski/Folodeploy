import HelloUser from '../components/HelloUser';
import Message from '../components/Message';
import CustomButton from '../components/CustomButton';
import Colors from '../assets/css/globalStyles';

import React, { useState, useContext,useRef } from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useAuth } from '../AuthContext';
// import { RNCamera } from 'react-native-camera';


// import CameraComponent from '../components/CameraOld'; // adjust the path according to your project structure

import Camera from '../components/Camera';
function SubpageUpload() {

    const [cameraStream, setCameraStream] = useState(null);
    const videoRef = useRef(null);
    const imageRef = useRef(null);

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

    const handleSubmit = async () => {
        const currentTime = new Date().toISOString();
        const delayData = {
            city,
            delayAmount,
            message,
            routeDirection: auth.routeDirection,
            submittedTime: currentTime
        };

        try {
            await axios.post('https://1941.methinks.pl/store.php', delayData);
            alert("Data submitted!");
        } catch (error) {
            alert("Error saving data!");
            console.error("Error:", error);
        }
    };

    return (
        <>
            <HelloUser></HelloUser>
            <Message title="Delay Screen"></Message>
            <Camera />
            <View style={styles.container}>
                <TouchableOpacity style={styles.button} onPress={handleSubmit} >
                    <Text style={styles.buttonText}>Take photo </Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

const styles = StyleSheet.create({
    button: {
        width: '96%',
        margin: 8,
        padding: 8,
        borderRadius: 4,
        backgroundColor: Colors.accentColor,
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