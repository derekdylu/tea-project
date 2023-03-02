import React, { useEffect, useState, useRef } from "react";
import { Food } from "../../Components/Food";
import { Share } from "../../Components/Share";
import teaData from "./data";
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

export const Result = () => {
  const [data, setData] = useState(teaData[0]);
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
  const [showDialog, setShowDialog] = useState(false);
  const [explanation, setExplanation] = useState({
    "title": "",
    "context": "",
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
      end: 23,
    },
    {
      id: "third",
      title: "特性",
      start: 23,
      end: 34,
    },
    {
      id: "fourth",
      title: "產區",
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
    let contentElements = sections.map((content, i) => document.getElementById(content.id).childNodes[0])
    let position = sections.map((content, i) => document.getElementById(content.id).getBoundingClientRect().top)
    let top = false;
    let video = document.getElementById("video");

    for (var i = position.length - 1; i >= 0; i--) {
      if (position[i] === 0) {
        if (i === 3) {
          setStartMap(true);
        }
        console.log(i < prevPosition);
        let reverse = i < prevPosition;
        let endTime = reverse ? sections[i].start : sections[i - 1].end;
        console.log(endTime)
        video.playbackRate = reverse ? 2 : 10;

        setFastFwd({
          element: contentElements[i],
          isSeeking: true,
          endTime: endTime,
          nextSource: `videos/noBg.webm#t=${sections[i].start},${sections[i].end}`,
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
    let gameId = sessionStorage.getItem("id");


    // TODO: call API get result

    setData(teaData[0]);
    let video = document.getElementById("video");
    video.pause()
    
    setTimeout(() => {
      setShowLoading(false);
      console.log('Hello, World!');
      video.play()
    }, 2000);
  }, [])

  const handleOpenDialog = (keyword) => {
    let video = document.getElementById("video");
    video.pause();
    setExplanation({...explanation,
      "title": keyword,
      "context": keyword
      // "context": "萎凋可分為日光（熱風）萎凋及室內萎凋，日光（熱風）萎凋室藉由熱能使茶葉水分消散，日光萎凋後移入室內進行室內萎凋繼續使茶葉水分消散。萎凋過程可使茶葉重量、體積、硬度降低，促進化學反應產生特殊香氣及滋味。",
    })
    setShowDialog(true);
  }

  const handleCloseDialog = () => {
    let video = document.getElementById("video");
    video.play();
    setShowDialog(false);
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
        <video id="video" ref={videoRef} className={styles.video} autoPlay playsInline muted>
          <source id="videoSrc" src={source} type="video/webm" />
        </video>
        <div className={styles.container} onScroll={(e) => handleScroll(e)}>
          { sections.map((section, i) => (
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
                        { text.map((keyword, j) => (
                          j % 2 ?
                            <u onClick={() => handleOpenDialog(keyword)}>{ keyword }</u>
                          :
                            <>{ keyword }</>
                        ))}
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
            <div>
              <Marquee gradient={false} speed={10} className={styles.scrollingText}>
                <Typography variant="displayMedium">
                  不是只有喝的。不是只有喝的。
                </Typography>
              </Marquee>
            </div>
            <Food data={data.foodProduct} />
            <Share teaName={data.name} teaSubName={data.subName} hashtags={data.hashtags} />
          </div>
        </div>
      </div>
      <Dialog
        open={showDialog}
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