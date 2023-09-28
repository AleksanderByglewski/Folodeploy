import React, { useEffect, useRef } from 'react';

const Camera = () => {
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

export default Camera;