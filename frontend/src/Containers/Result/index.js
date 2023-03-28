import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import Grid from '@mui/material/Grid';
import { Product } from "../../Components/Product";
import { Share } from "../../Components/Share";
import { teaData, termData, videoData } from "./data";
import { NavBar } from "../../Components/NavBar"
import { Replay } from "../../Components/Replay";
import styles from "./styles.module.scss";

import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import theme from "../../Themes/Theme";
import Marquee from "react-fast-marquee";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { ReactComponent as MapSvg } from "../../Images/map.svg"
import { ReactComponent as HandScrollGesture } from "../../Images/swipe_up.svg";
import loading from "../../Images/loading.gif"
import gsap from "gsap";
import { getGameById } from "../../Utils/Axios";

export const Result = () => {
  const navigate = useNavigate();
  const { width, height, ratio } = useWindowDimensions();
  const [open, setOpen] = useState(false);
  const [narrow, setNarrow] = useState(false);

  const defaultBgColor = "#F1F0E0";
  const [teaColor, setTeaColor] = useState(theme.palette.primary.main);
  const [bgColor, setBgColor] = useState();
  const [showLoading, setShowLoading] = useState(true);

  const [data, setData] = useState(teaData[0]);
  // video
  const videoRef = useRef();
  const [videoLoadedProgress, setVideoLoadedProgress] = useState(0);
  const [webmVideoSrc, setWebmVideoSrc] = useState();
  const [mp4VideoSrc, setMp4VideoSrc] = useState();
  const [videoIsHidden, setVideoIsHidden] = useState(false);
  const [enableNextPage, setEnableNextPage] = useState(false);

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
      end: 43
    },
    {
      id: "fifth",
      title: "",
      start: 43,
      end: 50
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
    "play": false,
  })
  const [showTermDialog, setShowTermDialog] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);
  const [showBatteryHint, setShowBatteryHint] = useState(false);

  useEffect(() => {
    if (width < 320) {
      setNarrow(true)
      setOpen(true)
      return
    } else {
      if (ratio > 1) {
        setNarrow(false)
        setOpen(true)
        return
      } else {
        setNarrow(false)
        setOpen(false)
        return
      }
    }
  }, [ratio])

  useEffect(() => {
    const interval = setInterval(() => {
      let video = document.getElementById("video");
      setCurrTime(video.currentTime);

      if (fastFwd.currSection < 4) {
        let videoProgress = document.getElementById("videoProgress");
        let sectionStartTime = sections[fastFwd.currSection].start;
        let sectionEndTime = sections[fastFwd.currSection].end;
  
        videoProgress.style.width = `${(100 * (video.currentTime - sectionStartTime)) / (sectionEndTime - sectionStartTime)}%`
      }


      sections.map((section, i) => {
        if (section.end < video.currentTime && fastFwd.currSection == i) {
          setEnableNextPage(true);

          if (i < 4) {
            video.pause()
          }
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
            setFastFwd({...fastFwd, isSeeking: false});
            video.play()
            // setShowScrollHint(false);
          }
          else {
            video.currentTime += -0.2;
          }
        }

        else if (video.currentTime >= fastFwd.endTime) {
          fastFwd.element.style.opacity = 1;
          video.playbackRate = 1;
          setFastFwd({...fastFwd, isSeeking: false});
          video.play();
          // setShowScrollHint(false);
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
      if (position[i] === 0 && i !== fastFwd.currSection) {
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

        if (i === 3) {
          setStartMap(true);
        }

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
      mapTl.to("#map", {top: "12%", duration: 2.5, ease: "sine.easeIn"})
          .to("#map", {opacity: 1, duration: 0.5, ease: "sine.easeIn"}, 1.5)
          .to("#circle", {opacity: 1, duration: 0.3, ease: "sine.easeIn"})
          .to("#line", {width: "100%", duration: 0.4, ease: "sine.easeIn"})
          .to("#text", {opacity: 1, duration: 0.3, ease: "sine.easeIn"})
    }
    else {
      mapTl.to("#text", {opacity: 0, duration: 0})
          .to("#line", {width: "0%", duration: 0})
          .to("#circle", {opacity: 0, duration: 0})
          .to("#map", {top: "100%", duration: 0})
    }
  }, [startMap]);

  useEffect(() => {
    let gameId = sessionStorage.getItem("id");

    if (gameId) {
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
    }

    else {
      navigate("/");
    }

    // FOR LOCAL DEBUG
    // let debugId = 6;
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

    // video.style.backgroundColor = parsedVideoData[debugId].bgColor;
    
    // // set term color
    // document.documentElement.style.setProperty("--term-color", parsedVideoData[debugId].linkColor);
    
    let video = videoRef.current;

    const videoListener = () => {
      setTimeout(() => {
        setShowLoading(false);
        setShowBatteryHint(true);
        video.play();
      }, 5000)
    }

    video.addEventListener("canplaythrough", videoListener);

    return(() => {
      video.removeEventListener("canplaythrough", videoListener);
    })

  }, [videoRef])

  useEffect(() => {
    videoRef.current?.load();
  }, [webmVideoSrc, mp4VideoSrc])

  const handleOpenDialog = (keyword) => {
    let video = document.getElementById("video");
    let toBePlayed = true;
    if (!video.paused){
      video.pause();
    } else {
      toBePlayed = false;
    }
    setExplanation({...explanation,
      "title": keyword,
      "context": termData[keyword],
      "play": toBePlayed
    })
    setShowTermDialog(true);
  }

  const handleCloseDialog = () => {
    let video = document.getElementById("video");
    if (explanation.play) {
      video.play();
    }
    setShowTermDialog(false);
  }


  const handleNextPage = () => {
    if (enableNextPage) {
      let element = document.getElementById("scrollContainer");
      element.scrollBy(0, 20);
      setEnableNextPage(false);
    }
  }

  const handleReplay = () => {
    const firstSection = document.getElementById("first").childNodes[0];
    firstSection.scrollIntoView({ behavior: "smooth", block: "start" });

    const video = document.getElementById("video");
    video.currentTime = 0;

    setEnableNextPage(false);
    setShowScrollHint(true);
  }
  

  return (
    <ThemeProvider theme={theme}>
      <Dialog aria-labelledby="window-size" open={open} fullScreen>
        <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ my: 1 }} height="100%">
          {
            narrow ?
            (
              <Typography variant="body2" color="#2D3748" fontWeight="500" sx={{mt: 2.5}} align="center">
                最小螢幕寬度 320 px
              </Typography>
            ):(
              <>
                <Typography variant="h6" color="#2D3748" fontWeight="700" sx={{mt: 2.5}} align="center">
                  豎直手機螢幕或瀏覽器視窗以享受最佳遊戲體驗
                </Typography>
              </>
            )
          }
        </Grid>
      </Dialog>
      { !showLoading &&
        <NavBar backgroundColor={fastFwd.currSection == 4 ? defaultBgColor : ""}/>
      }
      <div className={styles.loadingPage} hidden={!showLoading}>
        <img src={loading} />
      </div>
      <div className={styles.background} id="background">
        <video id="video" ref={videoRef} className={styles.video} muted playsInline hidden={videoIsHidden}>
          {/* <source id="videoSrc" src={`videos/test.webm`} type="video/webm" /> */}
          <source id="videoSrc" src={webmVideoSrc} type="video/webm" />
          <source id="videoSrc" src={mp4VideoSrc} type='video/mp4' />
        </video>
        <div className={styles.container} id="scrollContainer" onScroll={(e) => handleScroll(e)}>
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
                          <div className={styles.notKeyword}  key={k}>{ keyword }</div>
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
              <Replay
                id={data.id}
                teaName={data.name}
                teaSubName={data.subName}
                handleOnClick={handleReplay}
              />
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
          <div id="scroll" className={`${styles.scroll} ${enableNextPage ? styles.enabled : ""}`} onClick={() => handleNextPage()}>
            <div className={`${styles.left} ${styles.runAnimation}`} id="videoProgress"/>
            <HandScrollGesture className={`${styles.content} ${enableNextPage ? styles.full : ""}`}/>
            <Typography variant="bodyLargeHighlighted" className={`${styles.content} ${enableNextPage ? styles.full : ""}`}>
              點擊繼續
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