import { RefObject, useRef, useState } from "react";

type ReturnVoid = () => void;
type VideoReturnType = [
  RefObject<HTMLVideoElement>,
  RefObject<HTMLCanvasElement>,
  ReturnVoid,
  ReturnVoid,
  ReturnVoid,
  ReturnVoid,
  string
];
let cameraStream: MediaStream | null = null;
export const useShowVideo = (
  constraints: MediaStreamConstraints
): VideoReturnType => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [photo, setPhoto] = useState("");

  const stopCamera = () => {
    const video = videoRef.current;
    cameraStream?.getTracks().forEach((tr) => tr.stop());
    cameraStream = null;
    if (video) video.srcObject = null;
  };

  const clearPicture = () => {
    setPhoto("");
  };

  const takePicture = () => {
    if (cameraStream) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      if (canvas && video) {
        const context = canvas.getContext("2d");
        context?.drawImage(videoRef.current, 0, 0, 200, 200);
        const data = canvas.toDataURL("image/png");
        setPhoto(data);
        context && (context.fillStyle = "#fff");
        context?.fillRect(0, 0, canvas.width, canvas.height);
      }
    } else {
      alert("Nothing to picture!");
    }
  };

  const startCamera = () => {
    if (navigator?.mediaDevices && navigator?.mediaDevices?.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then((stream) => {
          cameraStream = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
            videoRef.current.onloadedmetadata = (e) => {
              videoRef.current?.play();
            };
          }
        })
        .catch((error) => {
          alert("Error: " + error.name);
          if (error.name === "OverconstrainedError") {
            alert(`The resolution is not supported by your device.`);
          } else if (error.name === "NotAllowedError") {
            alert(
              "You need to grant this page permission to access your camera and microphone."
            );
          } else {
            alert(`getUserMedia error: ${error.name} ` + error);
          }
        });
    } else {
      alert("navigator.mediaDevices: " + navigator?.mediaDevices);
    }
  };

  return [
    videoRef,
    canvasRef,
    stopCamera,
    startCamera,
    takePicture,
    clearPicture,
    photo,
  ];
};
