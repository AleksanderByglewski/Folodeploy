import { Platform } from 'react-native';

let requestCameraPermission;

if (Platform.OS === 'android') {
    // Dynamically require PermissionsAndroid only when on Android platform
    const PermissionsAndroid = require('react-native').PermissionsAndroid;

    requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };
} else {
    // For web and iOS, handle permissions here
    requestCameraPermission = async () => {
        try {
            // This will prompt the user for permission if they haven't already granted it
            const stream = await navigator.mediaDevices.getUserMedia({ video: true });

            if (stream) {
                console.log("You can use the camera");
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.error("Error accessing camera: ", err);
        }
    };
}

export default requestCameraPermission;
