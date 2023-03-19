import React, { useEffect, useState, useRef } from "react";
import { Product } from "../../Components/Product";
import { Share } from "../../Components/Share";
import { teaData, termData, videoData } from "./data";
import { NavBar } from "../../Components/NavBar"
import styles from "./styles.module.scss";

import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import theme from "../../Themes/Theme";
import Marquee from "react-fast-marquee";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { ReactComponent as Flower } from "../../Images/flower.svg";
import { ReactComponent as MapSvg } from "../../Images/map.svg"
import { ReactComponent as HandScrollGesture } from "../../Images/Result/swipe_up.svg";
import loading from "../../Images/loading.gif"
import gsap from "gsap";
import { getGameById } from "../../Utils/Axios";

export const Result = () => {
  const defaultBgColor = "#F1F0E0";
  const [teaColor, setTeaColor] = useState(theme.palette.primary.main);
  const [bgColor, setBgColor] = useState();
  const [showLoading, setShowLoading] = useState(true);

  const [data, setData] = useState(teaData[0]);
  // video
  const videoRef = useRef();
  const [webmVideoSrc, setWebmVideoSrc] = useState();
  const [mp4VideoSrc, setMp4VideoSrc] = useState();
  const [videoIsHidden, setVideoIsHidden] = useState(false);

  const [prevPosition, setPrevPosition] = useState(0);
  const [fastFwd, setFastFwd] = useState({
    element: null,
    isSeeking: false,
    endTime: 0,
    reverse: false,
    currSection: 0,
  });
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
      end: 53
    }
  ]
  const [currTime, setCurrTime] = useState(0);

  // map
  const [startMap, setStartMap] = useState(false);
  const [location, setLocation] = useState({
    "taipei": false,
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
  
  // hint & dialog
  const [explanation, setExplanation] = useState({
    "title": "",
    "context": "",
  })
  const [showTermDialog, setShowTermDialog] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const [showBatteryHint, setShowBatteryHint] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      let video = document.getElementById("video");
      setCurrTime(video.currentTime);

      sections.map((section, i) => {
        if (i < 4 && section.end < video.currentTime && fastFwd.currSection == i) {
          video.pause()
          setShowScrollHint(true);
        }
      })
    }, 500);

    return(() => {
      clearInterval(interval);
    })
  }, [currTime, fastFwd]);

  useEffect(() => {
    const interval = setInterval(() => {
      let video = document.getElementById("video");

      if (fastFwd.isSeeking) {
        if (fastFwd.currSection == 4) {
          let background = document.getElementById("background");
          background.style.backgroundColor = defaultBgColor;

          fastFwd.element.style.opacity = 1;
          video.playbackRate = 1;
          setVideoIsHidden(true);
          setFastFwd({...fastFwd, isSeeking: false});
          setShowScrollHint(false);
        }

        else if (fastFwd.reverse === true) {
          if(video.currentTime <= fastFwd.endTime + 0.3){
            fastFwd.element.style.opacity = 1;
            video.playbackRate = 1;
            if (fastFwd.currSection < 4) {
              setVideoIsHidden(false);
              let background = document.getElementById("background");
              background.style.backgroundColor = bgColor;
            }
            // setTimeSource(fastFwd.nextSource);
            setFastFwd({...fastFwd, isSeeking: false});
            video.play()
            setShowScrollHint(false);
          }
          else {
            video.currentTime += -0.2;
          }
        }

        else if (video.currentTime >= fastFwd.endTime) {
          fastFwd.element.style.opacity = 1;
          video.playbackRate = 1;
          // setTimeSource(fastFwd.nextSource);
          setFastFwd({...fastFwd, isSeeking: false});
          video.play();
          setShowScrollHint(false);
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

        setPrevPosition(i);

        setFastFwd({
          element: contentElements[i],
          isSeeking: true,
          endTime: endTime,
          // nextSource: `t=${sections[i].start},${sections[i].end}`,
          reverse: reverse,
          currSection: i,
        });

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
      mapTl.to("#map", {left: "15%", top: "12%", y: "0%", duration: 5, ease: "sine.inOut"})
          // .to("#map", {left: "15%", top: "12%", y: "0", duration: 2, ease: "sine.inOut" })
          .to("#circle", {opacity: 1, duration: 0.3, ease: "sine.inOut"})
          .to("#line", {width: "100%", duration: 0.4, ease: "sine.inOut"})
          .to("#text", {opacity: 1, duration: 0.3, ease: "sine.inOut"})
    }
    else {
      mapTl.to("#text", {opacity: 0, duration: 0.1, ease: "sine.inOut"})
          .to("#line", {width: "0%", duration: 0.1, ease: "sine.inOut"})
          .to("#circle", {opacity: 0, duration: 0.1, ease: "sine.inOut"})
          .to("#map", {left: "-100%", top: "70%", duration: 0.1, ease: "sine.inOut" })
    }
  }, [startMap]);

  useEffect(() => {
    let gameId = sessionStorage.getItem("id");

    // FOR LOCAL DEBUG
    // let debugId = 3;
    // setData(teaData[debugId]);

    // teaData[debugId].areaName.map((area, i) => {
    //   location[area] = true
    // });

    // let parsedVideoData = {};

    // Object.keys(videoData).map((keys, i) => {
    //   let keyList = keys.split(",")
    //   keyList.map((key, j) => {
    //     parsedVideoData[parseInt(key)] = videoData[keys];
    //   })
    // })

    // setWebmVideoSrc(parsedVideoData[debugId].webmVideo);
    // setMp4VideoSrc(parsedVideoData[debugId].mp4Video);

    // // set background color and text color
    // let background = document.getElementById("background");
    // setBgColor(parsedVideoData[debugId].bgColor);
    // background.style.backgroundColor = parsedVideoData[debugId].bgColor;
    // background.style.color = parsedVideoData[debugId].textColor;
    // setTeaColor(parsedVideoData[debugId].teaColor);

    // // set term color
    // document.documentElement.style.setProperty("--term-color", parsedVideoData[debugId].linkColor);

    getGameById(gameId)
      .then((res) => {
        let resId = res.decision
        setData(teaData[resId]);

        // set location for map
        let tmpLocation = location;
        teaData[resId].areaName.map((area, i) => {
          location[area] = true
        })
        setLocation(tmpLocation);

        // set video source
        let parsedVideoData = {};

        Object.keys(videoData).map((keys, i) => {
          let keyList = keys.split(",")
          keyList.map((key, j) => {
            parsedVideoData[parseInt(key)] = videoData[keys];
          })
        })

        setWebmVideoSrc(parsedVideoData[resId].webmVideo);
        setMp4VideoSrc(parsedVideoData[resId].mp4Video);

        // set background color and text color
        let background = document.getElementById("background");
        setBgColor(parsedVideoData[resId].bgColor);
        background.style.backgroundColor = parsedVideoData[resId].bgColor;
        background.style.color = parsedVideoData[resId].textColor;
        setTeaColor(parsedVideoData[resId].teaColor);

        // set term color
        document.documentElement.style.setProperty("--term-color", parsedVideoData[resId].linkColor);
      })
      .catch((err) => {
        console.log(err);
      })

    let video = document.getElementById("video");
    
    setTimeout(() => {
      setShowLoading(false);
      setShowBatteryHint(true);
      // video.load()
      video.play()
    }, 24000);
  }, [])

  useEffect(() => {
    videoRef.current?.load();
  }, [webmVideoSrc, mp4VideoSrc])

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
      <NavBar hidden={showLoading} backgroundColor={fastFwd.currSection == 4 ? defaultBgColor : ""}/>
      <div className={styles.loadingPage} hidden={!showLoading}>
        <img src={loading} />
      </div>
      <div className={styles.background} id="background">
        <video id="video" ref={videoRef} className={styles.video} muted playsInline hidden={videoIsHidden}>
          {/* <source id="videoSrc" src={`videos/noBg.webm`} type="video/webm" /> */}
          <source id="videoSrc" src={webmVideoSrc} type="video/webm" />
          <source id="videoSrc" src={mp4VideoSrc} type='video/mp4;codes=hvc1' />
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
                          <div className={styles.keyword} onClick={() => handleOpenDialog(keyword)} key={k}>{ keyword }</div>
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
      <div className={styles.hint}>
        { showScrollHint &&
          <div id="scroll" className={styles.scroll}>
            <HandScrollGesture />
            <Typography variant="bodyLargeHighlighted">
              下滑以繼續
            </Typography>
          </div>
        }
        { showBatteryHint &&
          <div id="battery" className={styles.battery}>
            <Typography variant="bodyLarge" color="#F2F1E9">
              請關閉裝置省電模式，以求最佳瀏覽體驗。
            </Typography>
            <button onClick={() => setShowBatteryHint(false)}>
              <Typography variant="labelLarge" color={teaColor}>
                知道了
              </Typography>
            </button>
          </div>
        }
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
              <Typography variant="labelLarge" color={teaColor}>
                關閉
              </Typography>
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </ThemeProvider>
  )
}