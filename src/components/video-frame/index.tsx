import { PhotoFrame } from "../photo-frame";
import { useShowVideo } from "./useShowVideo";
export const VideoFrame = () => {
  const constraints = { video: true, audio: false };
  const [
    videoRef,
    canvasRef,
    stopCamera,
    startCamera,
    takePhoto,
    clearPicture,
    photo,
  ] = useShowVideo(constraints);
  return (
    <div className='videoFrame'>
      <video
        style={{ border: "1px solid #000" }}
        width={200}
        height={200}
        ref={videoRef}
      >
        VideoFrame
      </video>
      <button onClick={startCamera}>Record video</button>
      <button onClick={stopCamera}>Stop video</button>
      <button onClick={takePhoto}>Take a picture</button>
      {photo && <button onClick={clearPicture}>Clear picture</button>}

      <canvas className='canvas' ref={canvasRef} width={videoRef.current?.videoWidth || 500} height={videoRef.current?.videoHeight || 400} ></canvas>
      <PhotoFrame photo={photo} />
    </div>
  );
};
