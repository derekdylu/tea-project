import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.css";

export const Anim = ({

}) => {
  const videoRef = useRef();
  const [lastYPos, setLastYPos] = useState(0);
  const [source, setSource] = useState("videos/anim.mp4#t=0,5");
  const [fastFwd, setFastFwd] = useState({
    isSeeking: false,
    endTime: 0,
    nextSource: "",
    reverse: false,
  });


  useEffect(() => {    
    videoRef.current?.load();
  }, [source]);

  useEffect(() => {
    const interval = setInterval(() => {
      let video = document.getElementById("video");
      if (fastFwd.isSeeking) {
        if (fastFwd.reverse === true) {
          if(video.currentTime <= fastFwd.endTime + 0.1){
            video.playbackRate = 0.5;
            setSource(fastFwd.nextSource);
            setFastFwd({...fastFwd, isSeeking: false});
          }
          else {
            video.currentTime += -0.1;
          }
        }

        else if (video.currentTime >= fastFwd.endTime) {
          video.playbackRate = 0.5;
          setSource(fastFwd.nextSource);
          setFastFwd({...fastFwd, isSeeking: false});
        }
      }
      
    }, 30);

    return () => clearInterval(interval);
  }, [fastFwd.isSeeking]);

  const handleScroll = async(e) => {
    let firstPos = document.getElementById("first").getBoundingClientRect().top;
    let secondPos = document.getElementById("second").getBoundingClientRect().top;
    let video = document.getElementById("video");

    if (secondPos === 0) {
      video.playbackRate = 2;

      setFastFwd({
        isSeeking: true,
        endTime: 5,
        nextSource: "videos/anim.mp4#t=5,10",
        reverse: false
      });

    }
    else if (firstPos === 0) {
      video.playbackRate = 2;
      setFastFwd({
        isSeeking: true,
        endTime: 0,
        nextSource: "videos/anim.mp4#t=0,5",
        reverse: true,
      });
    }
  }

  useEffect(() => {
    let currentYPos = window.pageYOffset;

    // if (currentYPos < lastYPos){ // up
    // }
    // else if (currentYPos > lastYPos) { // down
    // }

    setLastYPos(currentYPos);
    

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    }
  }, [lastYPos])

  useEffect(() => {
    let video = document.getElementById("video");
    video.playbackRate = 0.5;
  }, [])

  return (
    <div className={styles.background}>
      <video id="video" ref={videoRef} className={styles.video} autoPlay loop muted>
        <source id="videoSrc" src={source} type="video/mp4" />
      </video>
      <div className={styles.container} onScroll={(e) => handleScroll(e)}>
        <div className={styles.section} id="first">
          my first section
        </div>
        <div className={styles.section} id="second">
          my second section
        </div>
      </div>
    </div>
  )
}