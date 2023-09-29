import React, { useEffect, useRef,useState } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Button, Text, TouchableOpacity} from 'react-native';
const NiceCamera = () => {
    if (Platform.OS === 'web') {
        return <WebCamera />;
    } else {
        return <NativeCamera />;
    }
};

const WebCamera = () => {
    const videoRef = useRef(null);

    useEffect(() => {
        const getCameraStream = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });

                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                }
            } catch (error) {
                console.error("Error accessing webcam: ", error);
            }
        };

        getCameraStream();
    }, []);

    return (
        <video ref={videoRef} autoPlay={true} style={{ width: '100%', maxHeight: '400px' }} />
    );
};

const NativeCamera = () => {

    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
  
    if (!permission) {
      // Camera permissions are still loading
      return <View />;
    }
  
    if (!permission.granted) {
      // Camera permissions are not granted yet
      return (
        <View style={styles.container}>
          <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
          <Button onPress={requestPermission} title="grant permission" />
        </View>
      );
    }
    function toggleCameraType() {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
      }
    return (
        <View style={styles.preview}>
        <Camera style={styles.camera} type={type}>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
              <Text style={styles.text}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </Camera>
      </View>
    );
};

const styles = StyleSheet.create({

    preview: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
      },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        width: '100%',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        marginBottom: 12,
        marginRight: 6
      },
      button: {
      
        alignSelf: 'flex-end',
        justifyContent:'flex-end',
        alignItems: 'flex-end',
        // borderWidth:1,
        // borderColor: "#ccc",
        padding:4,
        borderRadius:4
      },
      text: {
        fontSize: 12,
        fontWeight: 'bold',
        color: 'white',
      },
});

export default NiceCamera;
