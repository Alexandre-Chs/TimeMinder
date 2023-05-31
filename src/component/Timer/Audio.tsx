import React, { useEffect, useRef } from "react";
import dingSound from "../../assets/sound/ding.mp3";

const AudioPlayer = () => {
  const audioRef = useRef(null);

  useEffect(() => {
    const condition = true;
    if (condition) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, []);

  return <audio ref={audioRef} src={dingSound} />;
};

export default AudioPlayer;
