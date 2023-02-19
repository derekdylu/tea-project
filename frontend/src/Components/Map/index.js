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
  const areaName = "新北市，三峽";
  const textColor = theme.palette.background.contrastText;
  const [start, setStart] = useState(false)

  useEffect(() => {
    const mapTl = gsap.timeline();

    if(start) {
      mapTl.to("#map", {left: "0%", top: "50%", y: "-50%", duration: 3, ease: "sine.inOut"})
          .to("#circle", {opacity: 1, duration: 0.3, ease: "sine.inOut"})
          .to("#line", {width: "100%", duration: 0.4, ease: "sine.inOut"})
          .to("#text", {opacity: 1, duration: 0.3, ease: "sine.inOut"})
          .to("#map", {left: "15%", top: "10%", y: "0", duration: 2, ease: "sine.inOut" })
    }
    else {
      mapTl.to("#text", {opacity: 0, duration: 0.2, ease: "sine.inOut"})
          .to("#line", {width: "0%", duration: 0.2, ease: "sine.inOut"})
          .to("#circle", {opacity: 0, duration: 0.2, ease: "sine.inOut"})
          .to("#map", {left: "-100%", top: "70%", duration: 0.5, ease: "sine.inOut" })
    }
  }, [start]);

  const handleOnClick = () => {
    setStart((prevState) => !prevState);
  }

  return (
    // <ThemeProvider theme={theme}>
      <div className={styles.background} id="trigger" onClick={handleOnClick}>
        <div className={styles.mapContainer} id="map">
          <MapSvg className={styles.map}/>
          <div className={styles.area}>
            <Typography id="text" variant="bodyMedium" className={styles.text}>
              { areaName }
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
      </div>
    // </ThemeProvider>
  )
} 