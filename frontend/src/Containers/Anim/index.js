import React, { useEffect, useState, useRef } from "react";
import { Food } from "../../Components/Food";
import { Share } from "../../Components/Share";
import styles from "./styles.module.scss";

import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import theme from "../../Themes/Theme";
import Marquee from "react-fast-marquee";
import { ReactComponent as Flower } from "../../Images/flower.svg";
import { ReactComponent as MapSvg } from "../../Images/map.svg"
import loading from "../../Images/loading.gif"
import gsap from "gsap";

export const Anim = ({

}) => {
  const selfScroll = true;
  const videoRef = useRef();
  const [showLoading, setShowLoading] = useState(true);
  const [prevPosition, setPrevPosition] = useState(0);
  const [startMap, setStartMap] = useState(false);
  const [source, setSource] = useState("videos/noBg.webm#t=0,7");
  const [fastFwd, setFastFwd] = useState({
    element: null,
    isSeeking: false,
    endTime: 0,
    nextSource: "",
    reverse: false,
  });
  const [time, setTime] = useState(0);

  const teaName = [["碧", "螺春"], "綠茶"];
  const teaSubName = ""
  const hashtags = ["清香", "淡雅",	"臺灣綠茶", "不發酵茶"]

  const contents = [
    {
      id: "first",
      title: "與你最香配！",
      body: [
        "碧螺春綠茶為不發酵茶，在臺茶風味輪中隸屬於臺灣綠茶。",
      ],
      start: 0,
      end: 7
    },
    {
      id: "second",
      title: "製作",
      body: [
        "傳統綠茶製造過程不經過萎凋及攪拌的程序，雖為炒菁綠茶，但農友在生產時常會攤放靜置茶菁數小時，以改善茶葉的風味。",
      ],
      start: 7,
      end: 23,
    },
    {
      id: "third",
      title: "特性",
      body: [
        "碧螺春茶樹品種主要為青心柑仔及青心烏龍，其外觀新鮮碧綠，芽尖白毫多，形狀細緊捲曲似螺旋，乾茶清香鮮雅，茶湯碧綠清澈。",
        "碧螺春在 3~5 月及 10~12 月生產的品質較佳。",
      ],
      start: 23,
      end: 34,
    },
    {
      id: "fourth",
      title: "產區",
      body: [
        "新北市三峽茶區毗鄰新店、土城、樹林、鶯歌、大溪，連接文山茶區，是臺灣唯一僅剩的專業炒菁綠茶產區。"
      ],
      start: 34,
      end: 50
    }
  ]

  const foodData = [
    {
      shop: "甘樂文創",
      name: "碧螺春綠茶磅蛋糕",
      desc: "嚴選在地碧螺春茶葉製成，口感紮實，茶香濃郁，全新配方還加入滿滿的碧螺春內餡，一口咬下紮實的蛋糕體中，品嚐的到濕潤香厚且綿密的餡雙重口感~",
      link: "https://www.fresh-farm.com.tw/page/product/show.aspx?num=644&kind=104&page=1&lang=TW",
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

  const handleScroll = async(e) => {
    let contentElements = contents.map((content, i) => document.getElementById(content.id).childNodes[0])
    let position = contents.map((content, i) => document.getElementById(content.id).getBoundingClientRect().top)
    let top = false;
    let video = document.getElementById("video");

    for (var i = position.length - 1; i >= 0; i--) {
      if (position[i] === 0) {
        if (i === 3) {
          setStartMap(true);
        }
        console.log(i < prevPosition);
        let reverse = i < prevPosition;
        let endTime = reverse ? contents[i].start : contents[i - 1].end;
        console.log(endTime)
        video.playbackRate = reverse ? 2 : 10;

        setFastFwd({
          element: contentElements[i],
          isSeeking: true,
          endTime: endTime,
          nextSource: `videos/noBg.webm#t=${contents[i].start},${contents[i].end}`,
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
      setStartMap(false);
    }
  }

  useEffect(() => {
    const mapTl = gsap.timeline();

    if (startMap) {
      mapTl.to("#map", {left: "0%", top: "50%", y: "-50%", duration: 3, ease: "sine.inOut"})
          .to("#circle", {opacity: 1, duration: 0.3, ease: "sine.inOut"})
          .to("#line", {width: "100%", duration: 0.4, ease: "sine.inOut"})
          .to("#text", {opacity: 1, duration: 0.3, ease: "sine.inOut"})
          .to("#map", {left: "15%", top: "12%", y: "0", duration: 2, ease: "sine.inOut" })
    }
    else {
      mapTl.to("#text", {opacity: 0, duration: 0.2, ease: "sine.inOut"})
          .to("#line", {width: "0%", duration: 0.2, ease: "sine.inOut"})
          .to("#circle", {opacity: 0, duration: 0.2, ease: "sine.inOut"})
          .to("#map", {left: "-100%", top: "70%", duration: 0.5, ease: "sine.inOut" })
    }
  }, [startMap]);

  useEffect(() => {
    // let video = document.getElementById("video");
    // video.play();
    // video.playbackRate = 0.5;
  }, [])

  useEffect(() => {
    let video = document.getElementById("video");
    video.pause()
    
    setTimeout(() => {
      setShowLoading(false);
      console.log('Hello, World!');
      video.play()
    }, 2000);
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.loadingPage} hidden={!showLoading}>
        <img src={loading} />
        <Typography variant="labelLarge" className={styles.text}>
          Loading...
        </Typography>
      </div>
      <div className={styles.background}>
        <video id="video" ref={videoRef} className={styles.video} autoPlay playsInline muted>
          <source id="videoSrc" src={source} type="video/webm" />
        </video>
        <div className={styles.container} onScroll={(e) => handleScroll(e)}>
          { contents.map((content, i) => (
            <div key={i} className={styles.section} id={content.id}>
              { i == 0 ?
                <div className={styles[content.id]}>
                  <Typography variant="titleMedium">
                    { content.title }
                  </Typography>

                  <div className={styles.name}>
                    { teaName.map((line, j) => (
                      typeof(line) == "string" ?
                      <Typography key={j} variant="displayLarge">
                        { line }
                      </Typography>
                      :
                      <div key={j} className={styles.row}>
                        <Typography variant="displayLarge">
                          {line[0]}
                        </Typography>
                        <div></div>
                        <Typography variant="displayLarge">
                          {line[1]}
                        </Typography>
                      </div>
                    ))}
                    { teaSubName &&
                      <Typography variant="bodyLarge" className={styles.subName}>
                        ({teaSubName})
                      </Typography>
                    }
                  </div>

                  <div className={styles.body}>
                    { (content.body).map((text, j) => (
                      <Typography key={j} variant="bodyLargeHighlighted">
                        {text}
                      </Typography>
                    ))}
                  </div>
                </div>
              :
                <>
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
                  { i == 3 &&
                    <div className={styles.mapContainer} id="map">
                      <MapSvg className={styles.map}/>
                      <div className={styles.area}>
                        <Typography id="text" variant="bodyMedium" className={styles.text}>
                          {/* { areaName } */}
                          新北市，三峽
                        </Typography>
                        <div className={styles.point}>
                          <svg id="line" className={styles.line}>
                            <line x1="0%" y1="50%" x2="100%" y2="50%" />
                          </svg>
                          <svg id="circle" className={styles.circle}>
                            <circle r="4" cy="50%" cx="75.5" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  }
                </>
              }
            </div>
          ))}
          <div className={styles.nonVideoSection}>
            <Marquee gradient={false} speed={10} className={styles.scrollingText}>
              <Typography variant="displayMedium">
                不是只有喝的。不是只有喝的。
              </Typography>
            </Marquee>
            { foodData.map((data, i) => (
              <Food key={i} data={data} />
            ))}
            <Share teaName={teaName} teaSubName={teaSubName} hashtags={hashtags} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}