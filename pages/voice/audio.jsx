import * as React from "react";
import useRecorder from "../../utils/useRecorder"

export default  function Audio() {
  let [audioURL, isRecording, startRecording, stopRecording] = useRecorder();
  console.log(audioURL);
  return (
    <div> 
      <audio src={audioURL} controls />
      <button onClick={startRecording} disabled={isRecording}>
        start recording
      </button>
      <button onClick={stopRecording} disabled={!isRecording}>
        stop recording
      </button> 
    </div>
  );
}