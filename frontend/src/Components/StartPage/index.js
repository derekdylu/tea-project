import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { NavBar } from "../NavBar";
import { createGame } from "../../Utils/Axios";

import { ReactComponent as Logo } from "../../Images/logo.svg";
import { ReactComponent as Hand } from "../../Images/Home/hand.svg";
import { ReactComponent as FrontCenter } from "../../Images/Home/frontCenter.svg";
import { ReactComponent as FrontLeft } from "../../Images/Home/frontLeft.svg";
import { ReactComponent as FrontRight } from "../../Images/Home/frontRight.svg";
import { ReactComponent as BackCenter } from "../../Images/Home/backCenter.svg";
import { ReactComponent as BackLeft } from "../../Images/Home/backLeft.svg";
import { ReactComponent as BackRight } from "../../Images/Home/backRight.svg";
import { ReactComponent as CloudLeft } from "../../Images/Home/cloudLeft.svg";
import { ReactComponent as CloudRight } from "../../Images/Home/cloudRight.svg";
import { ReactComponent as MountainLeft } from "../../Images/Home/mountainLeft.svg";
import { ReactComponent as MountainRight } from "../../Images/Home/mountainRight.svg";
import { ReactComponent as HandScrollGesture } from "../../Images/swipe_up.svg";
import styles from "./styles.module.scss";

import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import theme from "../../Themes/Theme";

import useWindowDimensions from '../../Hooks/useWindowDimensions';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });

var _ = require('lodash');

export const StartPage = ({}) => {
  const navigate = useNavigate()
  const { width, height, ratio } = useWindowDimensions()
  const [open, setOpen] = useState(false);
  const [narrow, setNarrow] = useState(false);
  const [second, setSecond] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(false);

  const content = [
    "生活中隨處可以看見台灣茶的蹤影，可是我們總是與他們擦身而過，錯失了認識他們的好機會。",
    "現在讓我們一起看看你適合哪些台灣茶，把握與他的認識機會吧！"
  ]

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
    setTimeout(() => {
      setShowScrollHint(true);
    }, 2000);

    let handScrollTrigger = {scrollTrigger: {
      trigger: "#trigger",
      // markers: true,
      start: "bottom 150%",
      end: "bottom 0%",
      scrub: 0
    }}

    const handTl = gsap.timeline(handScrollTrigger);
    handTl.to("#hand", {y: "-65%", duration: 10, ease: "sine.inOut"});
    handTl.to("#hand", {y: "-95%", duration: 5, ease: "sine.inOut"});

    const grassFrontCenterTl = gsap.timeline(handScrollTrigger);
    grassFrontCenterTl.to("#frontCenter", {y: "30%", x: "-50%", width: "120%", duration: 10, ease: "sine.inOut"});
    grassFrontCenterTl.to("#frontCenter", {y: "-12%", duration: 5, ease: "sine.inOut"});

    const grassBackCenterTl = gsap.timeline(handScrollTrigger);
    grassBackCenterTl.to("#backCenter", {y: "40%", x: "-50%", width: "120%", duration: 10, ease: "sine.inOut"});
    grassBackCenterTl.to("#backCenter", {y: "-30%", duration: 5, ease: "sine.inOut"});

    const grassFrontLeftTl = gsap.timeline(handScrollTrigger);
    grassFrontLeftTl.to("#frontLeft", {y: "50%", x: "-8%", duration: 10, ease: "sine.inOut"});
    grassFrontLeftTl.to("#frontLeft", {y: "-20%", x: "-25%", duration: 5, ease: "sine.inOut"});

    const grassFrontRightTl = gsap.timeline(handScrollTrigger);
    grassFrontRightTl.to("#frontRight", {y: "50%", x: "30%", duration: 10, ease: "sine.inOut"});
    grassFrontRightTl.to("#frontRight", {y: "-5%", x: "35%", duration: 5, ease: "sine.inOut"});

    const grassBackLeftTl = gsap.timeline(handScrollTrigger);
    grassBackLeftTl.to("#backLeft", {y: "30%", x: "-13%", duration: 10, ease: "sine.inOut"});
    grassBackLeftTl.to("#backLeft", {y: "-48%", x: "-18%", duration: 5, ease: "sine.inOut"});

    const grassBackRightTl = gsap.timeline(handScrollTrigger);
    grassBackRightTl.to("#backRight", {y: "12%", x: "10%", duration: 10, ease: "sine.inOut"});
    grassBackRightTl.to("#backRight", {y: "-50%", x: "15%", duration: 5, ease: "sine.inOut"});

    const mountainLeftTl = gsap.timeline(handScrollTrigger);
    mountainLeftTl.to("#mountainLeft", {y: "15%", x: "-25%", duration: 10, ease: "sine.inOut"});
    mountainLeftTl.to("#mountainLeft", {y: "-30%", duration: 5, ease: "sine.inOut"});

    const mountainRightTl = gsap.timeline(handScrollTrigger);
    mountainRightTl.to("#mountainRight", {y: "15%", x: "20%", duration: 10, ease: "sine.inOut"});
    mountainRightTl.to("#mountainRight", {y: "-30%", duration: 5, ease: "sine.inOut"});

    const cloudLeftTl = gsap.timeline(handScrollTrigger);
    cloudLeftTl.to("#cloudLeft", {y: "12%", x: "-5%", duration: 10, ease: "sine.inOut"});
    cloudLeftTl.to("#cloudLeft", {y: "-25%", duration: 5, ease: "sine.inOut"});

    const cloudRightTl = gsap.timeline(handScrollTrigger);
    cloudRightTl.to("#cloudRight", {y: "12%", x: "5%", duration: 10, ease: "sine.inOut"});
    cloudRightTl.to("#cloudRight", {y: "-25%", duration: 5, ease: "sine.inOut"});

    const logoTl = gsap.timeline(handScrollTrigger);
    logoTl.to("#logo", {y: "-70%", x: "-50%", width: "80%", duration: 10, ease: "sine.inOut"});
    logoTl.to("#logo", {y: "-100%", opacity: 0, duration: 5});

    window.addEventListener("scroll", handleOnScroll);

    return(() => {
      window.removeEventListener("scroll", handleOnScroll);
    })
  }, []);

  const handleEndScroll = useMemo(
    () =>
      _.debounce(() => {
        setShowScrollHint(true);
      }, 1500),
    []
  );

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) + 30 &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  const handleOnScroll = (e) => {
    setShowScrollHint(false);

    // frame
    let percentage = window.pageYOffset / window.innerHeight;

    if (percentage >= 1.5) {
      setSecond(true);
    } else {
      setSecond(false);
    }

    // button
    let button = document.getElementById("startButton");

    if (isInViewport(button)) {
      setShowScrollHint(false);
    } else if (percentage >= 1.5) {
      setShowScrollHint(false);
    } else {
      handleEndScroll();
    }
  }

  const handleStartButtonOnClick = async(e) => {
    setIsLoading(true)
    createGame([], [], -1, Date.now(), false)
    .then((res) => {
      sessionStorage.setItem('id', res.id);
      window.scrollTo({ top: 0 });
      navigate("/game");
    })
    .catch((err) => {
      setIsLoading(false)
      console.log(err);
    })
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog aria-labelledby="window-size" open={open} fullScreen>
        <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ my: 1 }} height="100%">
          {
            narrow ?
            (
              <Typography variant="titleMedium" color="#2D3748" fontWeight="500" sx={{mt: 2.5}} align="center">
                螢幕最小寬度 320 px
              </Typography>
            ):(
              <>
                <Typography variant="titleMedium" color="#2D3748" fontWeight="700" sx={{mt: 2.5}} align="center">
                  豎直手機螢幕或瀏覽器視窗以享受最佳遊戲體驗
                </Typography>
              </>
            )
          }
        </Grid>
      </Dialog>
      <NavBar defaultHideLogo={!second} />
      <div id="container" className={styles.container} onScroll={(e) => handleOnScroll(e)}>
        <div id="trigger" className={styles.trigger} />
        <div className={`${styles.background} ${second ? styles.target : ""}`}>
          <CloudLeft id="cloudLeft" className={styles.cloud} />
          <CloudRight id="cloudRight" className={styles.cloud} />
          <MountainLeft id="mountainLeft" className={`${styles.mountain} ${styles.left}`} />
          <MountainRight id="mountainRight" className={`${styles.mountain} ${styles.right}`} />
          <Logo id="logo" className={styles.logo} />
          <BackLeft id="backLeft" className={`${styles.back} ${styles.left}`} />
          <BackRight id="backRight" className={`${styles.back} ${styles.right}`} />
          <BackCenter id="backCenter" className={`${styles.back} ${styles.center}`} />
          <Hand id="hand" className={styles.hand} />
          <FrontLeft id="frontLeft" className={`${styles.front} ${styles.left}`} />
          <FrontRight id="frontRight" className={`${styles.front} ${styles.right}`} />
          <FrontCenter id="frontCenter" className={`${styles.front} ${styles.center}`} />
        </div>

        <div className={styles.cutOutContainer}>
          <div className={`${styles.circleCutOut} ${second ? styles.target : ""}`}>
            <div className={`${styles.circleLeft} ${second ? styles.target : ""}`} />
            <div className={`${styles.circleCenter} ${second ? styles.target : ""}`} />
            <div className={`${styles.circleRight} ${second ? styles.target : ""}`} />
          </div>
          <div className={`${styles.squareCutOut} ${second ? styles.target : ""}`} />
        </div>

        <div className={`${styles.intro} ${second ? styles.target : ""}`}>
          <div className={styles.text}>
            <Typography variant="displaySmall" color={theme.palette.background.contrastText}>
              你喝茶嗎？
            </Typography>
            <svg>
              <line x1="0%" y1="50%" x2="100%" y2="50%" />
            </svg>
            { content.map((text, i) =>
              <Typography key={i} variant="bodyLarge" color={theme.palette.background.contrastText}>
                { text }
              </Typography>
            )}
          </div>

          <button className={styles.button} onClick={handleStartButtonOnClick} id="startButton">
            <Typography variant="labelLarge" color={theme.palette.background.contrastText}>
              { isLoading ?
                <div>Loading...</div> :
                <div>開始探索</div>
              }
            </Typography>
          </button>
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
        </div>
      </div>
    </ThemeProvider>
  )
}