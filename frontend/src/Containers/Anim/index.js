import React, { useEffect, useState, useRef } from "react";
import styles from "./styles.module.scss";

import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import theme from "../../Themes/Theme";
import { elementTypeAcceptingRef } from "@mui/utils";

export const Anim = ({

}) => {
  const selfScroll = true;
  const videoRef = useRef();
  const [prevPosition, setPrevPosition] = useState(0);
  const [source, setSource] = useState("videos/test_v1.mp4");
  const [fastFwd, setFastFwd] = useState({
    element: null,
    isSeeking: false,
    endTime: 0,
    nextSource: "",
    reverse: false,
  });
  const [time, setTime] = useState(0);

  const contents = [
    {
      id: "first",
      title: "與你最香配",
      body: [
        "碧螺春綠茶為不發酵茶，在臺茶風味輪中隸屬於臺灣綠茶。傳統綠茶製造過程不經過萎凋及攪拌的程序，雖為炒菁綠茶，但農友在生產時常會攤放靜置茶菁數小時，以改善茶葉的風味。",
      ],
      start: 0,
      end: 8
    },
    {
      id: "second",
      title: "製作",
      body: [
        "傳統綠茶製造過程不經過萎凋及攪拌的程序，雖為炒菁綠茶，但農友在生產時常會攤放靜置茶菁數小時，以改善茶葉的風味。",
      ],
      start: 8,
      end: 24,
    },
    {
      id: "third",
      title: "特性",
      body: [
        "碧螺春茶樹品種主要為青心柑仔及青心烏龍。在 3~5 月及 10~12 月生產的品質較佳。",
        "碧螺春茶葉外觀新鮮碧綠，芽尖白毫多，形狀細緊捲曲似螺旋，乾茶清香鮮雅，茶湯碧綠清澈。",
      ],
      start: 24,
      end: 36,
    },
    {
      id: "fourth",
      title: "產區",
      body: [
        "新北市三峽茶區毗鄰新店、土城、樹林、鶯歌、大溪，連接文山茶區，是臺灣唯一僅剩的專業炒菁綠茶產區。"
      ],
      start: 36,
      end: 50
    }
  ]

  useEffect(() => {    
    videoRef.current?.load();
  }, [source]);

  useEffect(() => {
    const interval = setInterval(() => {
      let video = document.getElementById("video");
      if (fastFwd.isSeeking) {
        if (fastFwd.reverse === true) {
          if(video.currentTime <= fastFwd.endTime + 0.3){
            fastFwd.element.style.opacity = 1;
            video.playbackRate = 1;
            setSource(fastFwd.nextSource);
            setFastFwd({...fastFwd, isSeeking: false});
          }
          else {
            video.currentTime += -0.2;
          }
        }

        else if (video.currentTime >= fastFwd.endTime) {
          fastFwd.element.style.opacity = 1;
          video.playbackRate = 1;
          setSource(fastFwd.nextSource);
          setFastFwd({...fastFwd, isSeeking: false});
        }
      }
      
    }, 30);

    return () => clearInterval(interval);
  }, [fastFwd.isSeeking]);

  useEffect(() => {
    if (!selfScroll) {
      const interval = setInterval(() => {
        let currTime = time + 1;
        console.log("hello")
        contents.map((content, i) => {
          console.log(content.end, currTime)
          if (content.end === currTime) {
            document.getElementById(contents[i + 1].id).scrollIntoView();
            document.getElementById(contents[i + 1].id).childNodes[0].style.opacity = 1;
          }
        });
        setTime(currTime);
      }, 1000);
  
      return () => clearInterval(interval)
    }
  }, [time])

  const handleScroll = async(e) => {
    if (selfScroll) {
      let contentElements = contents.map((content, i) => document.getElementById(content.id).childNodes[0])
      let position = contents.map((content, i) => document.getElementById(content.id).getBoundingClientRect().top)
      let top = false;
      let video = document.getElementById("video");
  
      for (var i = position.length - 1; i >= 0; i--) {
        if (position[i] === 0) {
          console.log(i < prevPosition);
          let reverse = i < prevPosition;
          let endTime = reverse ? contents[i].start : contents[i - 1].end;
          console.log(endTime)
          video.playbackRate = reverse ? 2 : 10;
  
          setFastFwd({
            element: contentElements[i],
            isSeeking: true,
            endTime: endTime,
            nextSource: `videos/test_v1.mp4#t=${contents[i].start},${contents[i].end}`,
            reverse: reverse
          });
  
          setPrevPosition(i);
          top = true;
          break;
        }
      }
  
      if (!top) {
        contentElements.map((element, i) => {
          element.style.opacity = 0;
        })
      }
    }
  }


  useEffect(() => {
    let video = document.getElementById("video");
    // video.play();
    // video.playbackRate = 0.5;
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.background}>
        <video id="video" ref={videoRef} className={styles.video} autoPlay loop playsInline muted>
          <source id="videoSrc" src={source} type="video/mp4" />
        </video>
        <div className={styles.container} onScroll={(e) => handleScroll(e)}>
          { contents.map((content, i) => (
            <div key={i} className={styles.section} id={content.id}>
              <div className={styles[content.id]}>
                <Typography variant="displaySmall">
                  { content.title }
                </Typography>

                <svg>
                  <line x1="0%" y1="50%" x2="100%" y2="50%" />
                </svg>

                { (content.body).map((text, j) => (
                  <Typography key={j} variant="bodyLarge">
                    {text}
                  </Typography>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </ThemeProvider>
  )
}