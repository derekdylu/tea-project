import React, { useEffect, useState } from "react";
import { ReactComponent as MapSvg } from "../../Images/map.svg"
import styles from "./styles.module.scss"

import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import theme from "../../Themes/Theme";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

export const Map = ({}) => {
  const areaName = "新北市";
  const textColor = theme.palette.background.contrastText;
  const [start, setStart] = useState(false)

  useEffect(() => {
    const mapTl = gsap.timeline();

    if(start) {
      mapTl.to("#map", {top: "12%", duration: 2.5, ease: "sine.easeIn"})
          .to("#map", {opacity: 1, duration: 0.5, ease: "sine.easeIn"}, 1.5)
          .to("#circle", {opacity: 1, duration: 0.3, ease: "sine.easeIn"})
          .to("#line", {width: "100%", duration: 0.4, ease: "sine.easeIn"})
          .to("#text", {opacity: 1, duration: 0.3, ease: "sine.easeIn"})
          // .to("#map", {left: "15%", top: "10%", y: "0", duration: 2, ease: "sine.inOut" })
    }
    else {
      mapTl.to("#text", {opacity: 0, duration: 0})
          .to("#line", {width: "0%", duration: 0})
          .to("#circle", {opacity: 0, duration: 0})
          .to("#map", {top: "100%", duration: 0})
    }
  }, [start]);

  const handleOnClick = () => {
    setStart((prevState) => !prevState);
  }

  const Left = () => (
    <div className={styles.point}>
      <svg id="line" className={styles.line}>
        <line x1="0%" y1="50%" x2="100%" y2="50%" />
      </svg>
      <svg id="circle" className={styles.circle}>
        <circle r="4" cy="50%" cx="75.5" />
      </svg>
    </div>
  )

  const Right = () => (
    <div className={styles.point}>
      <svg id="line" className={styles.line}>
        <line x1="0%" y1="50%" x2="100%" y2="50%" />
      </svg>
      <svg id="circle" className={styles.circle}>
        <circle r="4" cy="50%" cx="4.5" />
      </svg>
    </div>
  )

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.background} id="trigger" onClick={handleOnClick}>
        <div className={styles.mapContainer} id="map">
          <MapSvg className={styles.map}/>
          <div className={`${styles.area} ${styles.taipei}`}>
            <Typography id="text" variant="bodyMedium" className={styles.text}>
              臺北
            </Typography>
            <Left />
          </div>
          <div className={`${styles.area} ${styles.newTaipei}`}>
            <Typography id="text" variant="bodyMedium" className={styles.text}>
              新北
            </Typography>
            <Left />
          </div>
          <div className={`${styles.area} ${styles.taoyuan}`}>
            <Typography id="text" variant="bodyMedium" className={styles.text}>
              桃園
            </Typography>
            <Left />
          </div>
          <div className={`${styles.area} ${styles.hsinchu}`}>
            <Typography id="text" variant="bodyMedium" className={styles.text}>
              新竹
            </Typography>
            <Left />
          </div>
          <div className={`${styles.area} ${styles.miaoli}`}>
            <Typography id="text" variant="bodyMedium" className={styles.text}>
              苗栗
            </Typography>
            <Left />
          </div>
          <div className={`${styles.area} ${styles.yilan}`}>
            <Typography id="text" variant="bodyMedium" className={styles.text}>
              宜蘭
            </Typography>
            <Left />
          </div>
          <div className={`${styles.area} ${styles.nantou}`}>
            <Typography id="text" variant="bodyMedium" className={styles.text}>
              南投
            </Typography>
            <Left />
          </div>
          <div className={`${styles.area} ${styles.hualian}`}>
            <Typography id="text" variant="bodyMedium" className={styles.text}>
              花蓮
            </Typography>
            <Left />
          </div>
          <div className={`${styles.area} ${styles.taichung}`}>
            <Typography id="text" variant="bodyMedium" className={styles.text}>
              台中
            </Typography>
            <Left />
          </div>
          <div className={`${styles.area} ${styles.jiayi}`}>
            <Typography id="text" variant="bodyMedium" className={styles.text}>
              嘉義
            </Typography>
            <Left />
          </div>
          <div className={`${styles.area} ${styles.taidong}`}>
            <Typography id="text" variant="bodyMedium" className={styles.text}>
              台東
            </Typography>
            <Left />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
} 