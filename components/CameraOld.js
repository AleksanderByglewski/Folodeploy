
import HelloUser from './HelloUser';
import Message from './Message';
import CustomButton from './CustomButton';
import Colors from '../assets/css/globalStyles';


import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useAuth } from '../AuthContext';

import React, { useState, useContext,useRef } from 'react';
import requestCameraPermission from './permissions/permissions'; // adjust the path according to your project structure
import WebView from 'react-native-webview';

const CameraComponent = () => {
    const [cameraStream, setCameraStream] = useState(null);
    const [imageSrc, setImageSrc] = useState('');
    const videoRef = useRef(null);

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

    const captureImage = () => {
        if (videoRef.current) {
            const canvas = document.createElement('canvas');
            canvas.width = videoRef.current.videoWidth;
            canvas.height = videoRef.current.videoHeight;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(videoRef.current, 0, 0);
            const src = canvas.toDataURL('image/png');
            setImageSrc(src);
            stopCamera();
        }
    };

    const stopCamera = () => {
        if (cameraStream) {
            const tracks = cameraStream.getTracks();
            tracks.forEach(track => track.stop());
            setCameraStream(null);
        }
    };

    return (
        <View>
         
            {cameraStream ? (
                <>
                    <video ref={videoRef} autoPlay={true} style={{ width: 300, height: 200 }} />
                    <Button title="Capture" onPress={captureImage} />
                </>
            ) : (
                <>
                    <Button title="Start Camera" onPress={startCamera} />
                    {imageSrc && (
                        <WebView source={{ html: `<img src="${imageSrc}" style="width: 300px; height: 200px;" />` }} />
                    )}
                </>
            )}
        </View>
    );
};

export default CameraComponent;