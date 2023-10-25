import React, { useEffect, useRef, useState } from 'react';
import { Platform, View, StyleSheet } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { Button, Text, TouchableOpacity } from 'react-native';
import Colors from '../assets/css/globalStyles';
import I18n from '../translations'

const NiceCamera = (props) => {
  console.log('NiceCamera Props:', props);
  if (Platform.OS === 'web') {
    return <WebCamera setIsGalleryEmpty={props.setIsGalleryEmpty} showMessageButtonToggled={props.showMessageButtonToggled} animateFlash={props.animateFlash} setMessage={props.setMessage} setPhotoTaken={props.setPhotoTaken} />;
  } else {
    return <NativeCamera setIsGalleryEmpty={props.setIsGalleryEmpty} animateFlash={props.animateFlash} setMessage={props.setMessage} setPhotoTaken={props.setPhotoTaken} />;
  }
};

const WebCamera = (props) => {
  let {showMessageButtonToggled} =props
  let {setIsGalleryEmpty} =props
  
  const videoRef = useRef(null);
  const galleryRef = useRef(null);
  const [cameraStream, setCameraStream] = useState(null);
  const [useFrontCamera, setUseFrontCamera] = useState(false);

  const flipCamera = async () => {
    if (cameraStream) {
      const tracks = cameraStream.getTracks();
      tracks.forEach(track => track.stop());
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: useFrontCamera ? 'user' : 'environment',
        },
      });

      setCameraStream(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }

      setUseFrontCamera(!useFrontCamera);
    } catch (error) {
      console.error('Error accessing the camera', error);
    }
  };


  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      const maxWidth = videoRef.current.videoWidth/3;
      const maxHeight = videoRef.current.clientHeight/3;
      const ratio = maxWidth / maxHeight;

      let canvasWidth = maxWidth;
      let canvasHeight = maxWidth / ratio;

      if (canvasHeight > maxHeight) {
        canvasHeight = maxHeight;
        canvasWidth = maxHeight * ratio;
      }

      canvas.width = canvasWidth;
      canvas.height = canvasHeight;

      context.drawImage(videoRef.current, 0, 0, canvasWidth, canvasHeight);
      const imgData = canvas.toDataURL('image/png');
      console.log(imgData);

      // Update state or parent component with base64 image if needed
      props.setMessage && props.setMessage(imgData);
      props.setPhotoTaken && props.setPhotoTaken(true);

      // Create a container for the canvas and the close button
      const canvasContainer = document.createElement('div');
      canvasContainer.style.position = 'relative';
      canvasContainer.style.display = 'inline-block';
      canvasContainer.appendChild(canvas);

      //
      canvas.addEventListener('click', () => {
        if (canvas.style.transform === '') {
            canvas.style.transform = 'scale(2.25)';
            canvas.style.transformOrigin = 'top left';  
            canvas.style.transition = 'transform 0.3s ease-in-out';
            canvasContainer.style.height = `${canvasHeight * 2.25}px`;  // Adjusting container's height
            canvasContainer.style.width = `${canvasWidth * 2.25}px`;    // Adjusting container's width
        } else {
            canvas.style.transform = '';
            canvasContainer.style.height = `${canvasHeight}px`;  // Resetting container's height
            canvasContainer.style.width = `${canvasWidth}px`;    // Resetting container's width
        }
    });

      // Create close button
      const closeButton = document.createElement('div');
      closeButton.innerHTML = '<div style="display:flex;justify-content:center;align-items:center">x</div>';
      closeButton.style.position = 'absolute';
      closeButton.style.top = '2px';
      closeButton.style.right = '2px';
      closeButton.style.width = '20px';

      closeButton.style.height = '20px';

      closeButton.style.cursor = 'pointer';
      closeButton.style.background = 'grey';
      closeButton.style.color = 'white';
      closeButton.style.borderRadius = '100px';
      closeButton.onclick = () => {
        galleryRef.current.removeChild(canvasContainer);
        if (galleryRef.current.children.length === 0) {
          setIsGalleryEmpty(true);  // Set to true to indicate the gallery is empty
        }

      };

      // Append the close button to the canvas container
      canvasContainer.appendChild(closeButton);

      // Append the new canvas container to the gallery container
      galleryRef.current.appendChild(canvasContainer);
     setIsGalleryEmpty(false);
    }
  };

  useEffect(() => {
    const getCameraStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } });
        setCameraStream(stream);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error('Error accessing the camera', error);
      }
    };

    getCameraStream();
  }, []);

  return (
    <>
      <View style={styles.containerButton}>
        <TouchableOpacity style={styles.bigButton} onPress={captureImage}>
          <Text style={styles.buttonText}>{I18n.t('SnapPhoto')}</Text>
        </TouchableOpacity>
      </View>

      <div>


        <div style={{ width: '100%', border: '1px solid #ccc', margin: 'auto' }}>
          <div ref={galleryRef} className="gallery__container"   style={showMessageButtonToggled ? styles.galleryContainerVisible : styles.galleryContainerHidden}>
            {/* Canvases with images will be appended here */}
          </div>
          <div style={{ position: 'relative' }}>
            <div style={{ position: "absolute", right: "2px" }}>
              <button onClick={flipCamera} id="flip" style={{ margin: "2px 2px 0px 0px" }}>{I18n.t('FlipCamera')}</button>
            </div>

            <video ref={videoRef} autoPlay playsInline style={{ lineHeight: 1, width: '100%' }} />

          </div>

        </div>

      </div>
    </>
  );
};

const NativeCamera = (props) => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);  // Ensure you have this ref to reference the camera



  const captureImage = async () => {
    props.animateFlash && props.animateFlash();
    if (cameraRef.current) {
      const options = { quality: 0.5, base64: true };
      const data = await cameraRef.current.takePictureAsync(options);
      const base64image = data.base64;
      console.log(base64image);

      // Update the state with base64 image
      // alert('hello')
      props.setMessage(`data:image/png;base64,${base64image}`);
      props.setPhotoTaken(true);
    }
  };

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }


  // if (permission.granted === null) {
  //   return <View />;
  // }

  // if (permission.granted === false) {
  //   return <Text>No access to camera</Text>;
  // }
  // return (
  //   <View style={{ flex: 1 }}>
  //     <Camera ref={cameraRef}  style={{ flex: 1 }} type={CameraType.back} />
  //   </View>
  // );
  return (
    <View style={styles.preview}>
      <Camera ref={cameraRef} style={styles.camera} type={type}>
        <View style={styles.buttonContainer}>

        </View>
        <TouchableOpacity style={styles.buttonSecond} onPress={captureImage}>
          <Text style={styles.buttonText}>Capture</Text>
        </TouchableOpacity>
      </Camera>
    </View>
  );
};

const styles = StyleSheet.create({

  galleryContainerVisible: {
    minHeight: '10vh', 
    display: 'flex', 
    gap: '2px', 
    overflowX: 'auto'
  },
  galleryContainerHidden: {
    display:"none"
  },

  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  bigButton: {
    width: '98%',
    color: "#fff",


    padding: 8,
    borderRadius: 4,
    marginLeft: "auto",
    marginRight: "auto",
    backgroundColor: "#fe8733"

  },
  container: {

    borderColor: '#ececec',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "white",
    margin: 4,
    marginTop: 4,
    paddingTop: 8,
    paddingBottom: 8

  },

  containerButton: {

    borderColor: '#ececec',
    borderWidth: 1,
    borderRadius: 4,
    backgroundColor: "white",
    margin: 4,
    marginTop: 0,
    paddingTop: 8,
    paddingBottom: 8

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
  buttonSecond: {
    width: '96%',
    margin: 8,
    marginBottom: 0,

    padding: 8,
    borderRadius: 4,
    backgroundColor: Colors.accentColor,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
  button: {

    alignSelf: 'flex-end',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    // borderWidth:1,
    // borderColor: "#ccc",
    padding: 4,
    borderRadius: 4
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default NiceCamera;
