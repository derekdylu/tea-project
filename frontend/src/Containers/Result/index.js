import React, { useEffect, useState, useRef } from "react";
import { Product } from "../../Components/Product";
import { Share } from "../../Components/Share";
import { teaData, termData } from "./data";
import styles from "./styles.module.scss";

import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import theme from "../../Themes/Theme";
import Marquee from "react-fast-marquee";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { ReactComponent as Flower } from "../../Images/flower.svg";
import { ReactComponent as MapSvg } from "../../Images/map.svg"
import loading from "../../Images/loading.gif"
import gsap from "gsap";
import { getGameById } from "../../Utils/Axios";

export const Result = () => {
  const [data, setData] = useState(teaData[14]);
  const videoRef = useRef();
  const [showLoading, setShowLoading] = useState(true);
  const [prevPosition, setPrevPosition] = useState(0);
  const [startMap, setStartMap] = useState(false);
  const [timeSource, setTimeSource] = useState("t=0,7");
  const [fastFwd, setFastFwd] = useState({
    element: null,
    isSeeking: false,
    endTime: 0,
    nextSource: "",
    reverse: false,
    currSection: 0
  });
  const [showTermDialog, setShowTermDialog] = useState(false);
  const [explanation, setExplanation] = useState({
    "title": "",
    "context": "",
  })

  const [videoIsHidden, setVideoIsHidden] = useState(false);

  const [location, setLocation] = useState({
    "taipei": true,
    "newTaipei": false,
    "taoyuan": false,
    "hsinchu": false,
    "miaoli": false,
    "yilan": false,
    "nantou": false,
    "hualian": false,
    "taichung": false,
    "jiayi": false,
    "taidong": false,
  })

  const sections = [
    {
      id: "first",
      title: "與你最香配！",
      start: 0,
      end: 7
    },
    {
      id: "second",
      title: "製作",
      start: 7,
      end: 21,
    },
    {
      id: "third",
      title: "特性",
      start: 21,
      end: 33,
    },
    {
      id: "fourth",
      title: "產區",
      start: 33,
      end: 53
    },
    {
      id: "fifth",
      title: "",
      start: 53,
      end: 54
    }
  ]

  const [currTime, setCurrTime] = useState(0);
  const [currSection, setCurrSection] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      let video = document.getElementById("video");
      setCurrTime(video.currentTime);

      sections.map((section, i) => {
        if (section.end < video.currentTime && currSection == i) {
          video.pause()
        }
      })
    }, 1000);

    return(() => {
      clearInterval(interval);
    })
  }, [currTime, currSection]);

  useEffect(() => {
    const interval = setInterval(() => {
      let video = document.getElementById("video");
      if (fastFwd.isSeeking) {
        if (fastFwd.reverse === true) {
          if(video.currentTime <= fastFwd.endTime + 0.3){
            fastFwd.element.style.opacity = 1;
            video.playbackRate = 1;
            if (fastFwd.nextSource == `t=${sections[0].start},${sections[0].end}`) {
              setVideoIsHidden(false);
            }
            setTimeSource(fastFwd.nextSource);
            setFastFwd({...fastFwd, isSeeking: false});
            video.play()
          }
          else {
            video.currentTime += -0.2;
          }
        }

        else if (video.currentTime >= fastFwd.endTime) {
          fastFwd.element.style.opacity = 1;
          video.playbackRate = 1;
          setTimeSource(fastFwd.nextSource);
          setFastFwd({...fastFwd, isSeeking: false});
          video.play()
          if (fastFwd.nextSource == `t=${sections[4].start},${sections[4].end}`)
          setVideoIsHidden(true);
        }
      }
      
    }, 30);

    return () => clearInterval(interval);
  }, [fastFwd.isSeeking]);

  const handleScroll = async(e) => {
    let contentElements = sections.map((content, i) => document.getElementById(content.id).childNodes[0])
    let position = sections.map((content, i) => document.getElementById(content.id).getBoundingClientRect().top)
    let top = false;
    let video = document.getElementById("video");

    for (var i = position.length - 1; i >= 0; i--) {
      if (position[i] === 0) {
        if (i === 3) {
          setStartMap(true);
        }
        let reverse = i < prevPosition;
        let endTime = reverse ? sections[i].start : sections[i - 1].end;
        video.playbackRate = reverse ? 2 : 10;

        setFastFwd({
          element: contentElements[i],
          isSeeking: true,
          endTime: endTime,
          nextSource: `t=${sections[i].start},${sections[i].end}`,
          reverse: reverse,
          currSection: reverse ? i : (i - 1)
        });

        setCurrSection(i);
        console.log(i)

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
    let gameId = sessionStorage.getItem("id");
    // let gameId = "640d799ecbd84b560e405ebe"; // debug

    getGameById(gameId)
      .then((res) => {
        setData(teaData[res.decision]);

        let tmpLocation = location;
        teaData[res.decision].areaName.map((area, i) => {
          location[area] = true
        })
        setLocation(tmpLocation);
      })
      .catch((err) => {
        console.log(err);
      })

    let video = document.getElementById("video");
    video.pause()
    
    setTimeout(() => {
      setShowLoading(false);
      video.play()
    }, 2000);
  }, [])

  const handleOpenDialog = (keyword) => {
    let video = document.getElementById("video");
    video.pause();
    setExplanation({...explanation,
      "title": keyword,
      "context": termData[keyword]
    })
    setShowTermDialog(true);
  }

  const handleCloseDialog = () => {
    let video = document.getElementById("video");
    video.play();
    setShowTermDialog(false);
  }
  

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.loadingPage} hidden={!showLoading}>
        <img src={loading} />
        <Typography variant="labelLarge" className={styles.text}>
          Loading...
        </Typography>
      </div>
      <div className={styles.background}>
        <video id="video" ref={videoRef} className={styles.video} autoPlay muted playsInline hidden={videoIsHidden}>
          <source id="videoSrc" src={`videos/noBg.webm`} type="video/webm" />
          <source id="videoSrc" src={`videos/noBg_H.265.mp4`} type="video/mp4;codecs=hvc1" />
        </video>
        <div className={styles.container} onScroll={(e) => handleScroll(e)}>
          { sections.slice(0, 4).map((section, i) => (
            <div key={i} className={styles.section} id={section.id}>
              { i == 0 ?
                <div className={styles[section.id]}>
                  <Typography variant="titleMedium">
                    { section.title }
                  </Typography>
            
                  <div className={styles.name}>
                    { data.name.map((line, j) => (
                      typeof(line) == "string" ?
                      <Typography key={j} variant="displayLarge">
                        { line }
                      </Typography>
                      :
                      <div key={j} className={styles.row}>
                        <Typography variant="displayLarge">
                          { line[0] }
                        </Typography>
                        <div></div>
                        <Typography variant="displayLarge">
                          { line[1] }
                        </Typography>
                      </div>
                    ))}
                    { data.subName &&
                      <Typography variant="bodyLarge" className={styles.subName}>
                        ({ data.subName })
                      </Typography>
                    }
                  </div>
            
                  <div className={styles.body}>
                    { (data.contents[i]).map((text, j) => (
                      <Typography key={j} variant="bodyLargeHighlighted">
                        { text }
                      </Typography>
                    ))}
                  </div>
                </div>
              :
                <>
                  <div className={styles[section.id]}>
                    <Typography variant="displaySmall">
                      { section.title }
                    </Typography>

                    <svg>
                      <line x1="0%" y1="50%" x2="100%" y2="50%" />
                    </svg>

                    { (data.contents[i]).map((text, j) => (
                      <Typography key={j} variant="bodyLarge">
                        { text.split("**").map((keyword, k) => (
                          k % 2 ?
                          <u onClick={() => handleOpenDialog(keyword)} key={k}>{ keyword }</u>
                          :
                          <>{ keyword }</>
                        ))}
                      </Typography>
                    ))}
                  </div>
                  {/* MAP */}
                  { i == 3 &&
                    <div className={styles.mapContainer} id="map">
                      <MapSvg className={styles.map}/>
                      { location["taipei"] && <div className={`${styles.area} ${styles.taipei}`}>
                        <Typography id="text" variant="bodyMedium" className={styles.text}>
                          臺北
                        </Typography>
                        <div className={styles.point}>
                          <svg id="line" className={styles.line}>
                            <line x1="0%" y1="50%" x2="100%" y2="50%" />
                          </svg>
                          <svg id="circle" className={styles.circle}>
                            <circle r="4" cy="50%" cx="75.5" />
                          </svg>
                        </div>
                      </div> }
                      { location["newTaipei"] && <div className={`${styles.area} ${styles.newTaipei}`}>
                        <Typography id="text" variant="bodyMedium" className={styles.text}>
                          新北
                        </Typography>
                        <div className={styles.point}>
                          <svg id="line" className={styles.line}>
                            <line x1="0%" y1="50%" x2="100%" y2="50%" />
                          </svg>
                          <svg id="circle" className={styles.circle}>
                            <circle r="4" cy="50%" cx="75.5" />
                          </svg>
                        </div>
                      </div> }
                      { location["taoyuan"] && <div className={`${styles.area} ${styles.taoyuan}`}>
                        <Typography id="text" variant="bodyMedium" className={styles.text}>
                          桃園
                        </Typography>
                        <div className={styles.point}>
                          <svg id="line" className={styles.line}>
                            <line x1="0%" y1="50%" x2="100%" y2="50%" />
                          </svg>
                          <svg id="circle" className={styles.circle}>
                            <circle r="4" cy="50%" cx="75.5" />
                          </svg>
                        </div>
                      </div> }
                      { location["hsinchu"] && <div className={`${styles.area} ${styles.hsinchu}`}>
                        <Typography id="text" variant="bodyMedium" className={styles.text}>
                          新竹
                        </Typography>
                        <div className={styles.point}>
                          <svg id="line" className={styles.line}>
                            <line x1="0%" y1="50%" x2="100%" y2="50%" />
                          </svg>
                          <svg id="circle" className={styles.circle}>
                            <circle r="4" cy="50%" cx="75.5" />
                          </svg>
                        </div>
                      </div> }
                      { location["miaoli"] && <div className={`${styles.area} ${styles.miaoli}`}>
                        <Typography id="text" variant="bodyMedium" className={styles.text}>
                          苗栗
                        </Typography>
                        <div className={styles.point}>
                          <svg id="line" className={styles.line}>
                            <line x1="0%" y1="50%" x2="100%" y2="50%" />
                          </svg>
                          <svg id="circle" className={styles.circle}>
                            <circle r="4" cy="50%" cx="75.5" />
                          </svg>
                        </div>
                      </div> }
                      { location["yilan"] && <div className={`${styles.area} ${styles.yilan}`}>
                        <Typography id="text" variant="bodyMedium" className={styles.text}>
                          宜蘭
                        </Typography>
                        <div className={styles.point}>
                          <svg id="line" className={styles.line}>
                            <line x1="0%" y1="50%" x2="100%" y2="50%" />
                          </svg>
                          <svg id="circle" className={styles.circle}>
                            <circle r="4" cy="50%" cx="75.5" />
                          </svg>
                        </div>
                      </div> }
                      { location["nantou"] && <div className={`${styles.area} ${styles.nantou}`}>
                        <Typography id="text" variant="bodyMedium" className={styles.text}>
                          南投
                        </Typography>
                        <div className={styles.point}>
                          <svg id="line" className={styles.line}>
                            <line x1="0%" y1="50%" x2="100%" y2="50%" />
                          </svg>
                          <svg id="circle" className={styles.circle}>
                            <circle r="4" cy="50%" cx="75.5" />
                          </svg>
                        </div>
                      </div> }
                      { location["hualian"] && <div className={`${styles.area} ${styles.hualian}`}>
                        <Typography id="text" variant="bodyMedium" className={styles.text}>
                          花蓮
                        </Typography>
                        <div className={styles.point}>
                          <svg id="line" className={styles.line}>
                            <line x1="0%" y1="50%" x2="100%" y2="50%" />
                          </svg>
                          <svg id="circle" className={styles.circle}>
                            <circle r="4" cy="50%" cx="75.5" />
                          </svg>
                        </div>
                      </div> }
                      { location["taichung"] && <div className={`${styles.area} ${styles.taichung}`}>
                        <Typography id="text" variant="bodyMedium" className={styles.text}>
                          台中
                        </Typography>
                        <div className={styles.point}>
                          <svg id="line" className={styles.line}>
                            <line x1="0%" y1="50%" x2="100%" y2="50%" />
                          </svg>
                          <svg id="circle" className={styles.circle}>
                            <circle r="4" cy="50%" cx="75.5" />
                          </svg>
                        </div>
                      </div> }
                      { location["jiayi"] && <div className={`${styles.area} ${styles.jiayi}`}>
                        <Typography id="text" variant="bodyMedium" className={styles.text}>
                          嘉義
                        </Typography>
                        <div className={styles.point}>
                          <svg id="line" className={styles.line}>
                            <line x1="0%" y1="50%" x2="100%" y2="50%" />
                          </svg>
                          <svg id="circle" className={styles.circle}>
                            <circle r="4" cy="50%" cx="75.5" />
                          </svg>
                        </div>
                      </div> }
                      { location["taidong"] && <div className={`${styles.area} ${styles.taidong}`}>
                        <Typography id="text" variant="bodyMedium" className={styles.text}>
                          台東
                        </Typography>
                        <div className={styles.point}>
                          <svg id="line" className={styles.line}>
                            <line x1="0%" y1="50%" x2="100%" y2="50%" />
                          </svg>
                          <svg id="circle" className={styles.circle}>
                            <circle r="4" cy="50%" cx="75.5" />
                          </svg>
                        </div>
                      </div> }
                    </div>
                  }
                </>
              }
            </div>
          ))}
          <div id="fifth">
            <div className={styles.nonVideoSection}>
              <div>
                <Marquee gradient={false} speed={10} className={styles.scrollingText}>
                  <Typography variant="displayMedium">
                    不是只有喝的。不是只有喝的。
                  </Typography>
                </Marquee>
              </div>
              <Product data={data.foodProduct} />
              <Share teaName={data.name} teaSubName={data.subName} hashtags={data.hashtags} />
            </div>
          </div>
        </div>
      </div>
      <Dialog
        open={showTermDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          style: { backgroundColor: theme.palette.surface.main, borderRadius: 28 }
        }}
      >
        <DialogContent>
          <div className={styles.dialog}>
            <Typography variant="bodyMedium">
              用詞解釋
            </Typography>
            <Typography variant="titleLarge">
              { explanation.title }
            </Typography>
            <Typography variant="bodyLarge">
              { explanation.context }
            </Typography>
            <button className={styles.button} onClick={handleCloseDialog}>
              <Typography variant="labelLarge" color={theme.palette.primary.main}>
                關閉
              </Typography>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
}