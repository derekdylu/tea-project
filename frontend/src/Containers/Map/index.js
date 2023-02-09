import React, { useEffect, useState } from "react";
import { ReactComponent as MapSvg } from "../../Images/map.svg"
import styles from "./styles.module.scss"

import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import theme from "../../Themes/Theme";

import gsap from "gsap";

export const Map = ({}) => {
  const areaName = "新北市，三峽";
  const textColor = theme.palette.background.contrastText;

  useEffect(() => {
    const mapTl = gsap.timeline();

    mapTl.to("#map", {left: "0%", top: "50%", y: "-50%", duration: 3, ease: "sine.inOut"})
         .to("#circle", {opacity: 1, duration: 0.3, ease: "sine.inOut"})
         .to("#line", {width: "100%", duration: 0.4, ease: "sine.inOut"})
         .to("#text", {opacity: 1, duration: 0.3, ease: "sine.inOut"})
         .to("#map", {left: "15%", top: "15%", y: "0", duration: 2, ease: "sine.inOut" })
        //  .to("#line", {})
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.background}>
        <div className={styles.container} id="map">
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
    </ThemeProvider>
  )
} 