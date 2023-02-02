import React, { useRef, useState, useEffect } from "react";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { ReactComponent as Hand } from "../../images/hand.svg";
import { ReactComponent as FrontCenter } from "../../images/frontCenter.svg";
import { ReactComponent as FrontLeft } from "../../images/frontLeft.svg";
import { ReactComponent as FrontRight } from "../../images/frontRight.svg";
import { ReactComponent as BackCenter } from "../../images/backCenter.svg";
import { ReactComponent as BackRight } from "../../images/backRight.svg";
import { ReactComponent as CloudLeft } from "../../images/cloudLeft.svg";
import { ReactComponent as CloudRight } from "../../images/cloudRight.svg";
import { ReactComponent as MountainLeft } from "../../images/mountainLeft.svg";
import { ReactComponent as MountainRight } from "../../images/mountainRight.svg";
import styles from "./styles.module.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);
ScrollTrigger.config({ ignoreMobileResize: true });
// ScrollTrigger.normalizeScroll(true);

export const Gsap = ({}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const handRef = useRef(null);
  const [second, setSecond] = useState(false);

  useEffect(() => {
    console.log("done rendering");

    let handScrollTrigger = {scrollTrigger: {
      trigger: "#trigger",
      // markers: true,
      start: "bottom 150%",
      end: "bottom 0%",
      scrub: 0
    }}

    const handTl = gsap.timeline(handScrollTrigger);
    handTl.to("#hand", {y: "-65%", duration: 10, ease: "sine.inOut"});
    handTl.to("#hand", {y: "-85%", duration: 5, ease: "sine.inOut"});

    const grassFrontCenterTl = gsap.timeline(handScrollTrigger);
    grassFrontCenterTl.to("#frontCenter", {y: "40%", x: "-50%", width: "120%", duration: 10, ease: "sine.inOut"});
    grassFrontCenterTl.to("#frontCenter", {y: "-20%", duration: 5, ease: "sine.inOut"});

    const grassBackCenterTl = gsap.timeline(handScrollTrigger);
    grassBackCenterTl.to("#backCenter", {y: "30%", x: "-50%", width: "120%", duration: 10, ease: "sine.inOut"});
    grassBackCenterTl.to("#backCenter", {y: "-5%", duration: 5, ease: "sine.inOut"});

    const grassFrontLeftTl = gsap.timeline(handScrollTrigger);
    grassFrontLeftTl.to("#frontLeft", {y: "35%", x: "-20%", duration: 10, ease: "sine.inOut"});
    grassFrontLeftTl.to("#frontLeft", {y: "-20%", x: "-30%", duration: 5, ease: "sine.inOut"});

    const grassFrontRightTl = gsap.timeline(handScrollTrigger);
    grassFrontRightTl.to("#frontRight", {y: "35%", x: "30%", duration: 10, ease: "sine.inOut"});
    grassFrontRightTl.to("#frontRight", {y: "-20%", x: "40%", duration: 5, ease: "sine.inOut"});

    const grassBackRightTl = gsap.timeline(handScrollTrigger);
    grassBackRightTl.to("#backRight", {y: "35%", x: "10%", duration: 10, ease: "sine.inOut"});
    grassBackRightTl.to("#backRight", {y: "-20%", x: "20%", duration: 5, ease: "sine.inOut"});

    const mountainLeftTl = gsap.timeline(handScrollTrigger);
    mountainLeftTl.to("#mountainLeft", {y: "20%", x: "-10%", duration: 10, ease: "sine.inOut"});
    mountainLeftTl.to("#mountainLeft", {y: "-5%", duration: 5, ease: "sine.inOut"});

    const mountainRightTl = gsap.timeline(handScrollTrigger);
    mountainRightTl.to("#mountainRight", {y: "20%", x: "10%", duration: 10, ease: "sine.inOut"});
    mountainRightTl.to("#mountainRight", {y: "-5%", duration: 5, ease: "sine.inOut"});

    const cloudLeftTl = gsap.timeline(handScrollTrigger);
    cloudLeftTl.to("#cloudLeft", {y: "10%", x: "-5%", duration: 10, ease: "sine.inOut"});
    cloudLeftTl.to("#cloudLeft", {y: "0%", duration: 5, ease: "sine.inOut"});

    const cloudRightTl = gsap.timeline(handScrollTrigger);
    cloudRightTl.to("#cloudRight", {y: "10%", x: "5%", duration: 10, ease: "sine.inOut"});
    cloudRightTl.to("#cloudRight", {y: "0%", duration: 5, ease: "sine.inOut"});

    const logoTl = gsap.timeline(handScrollTrigger);
    logoTl.to("#logo", {y: "-70%", x: "-50%", width: "80%", duration: 10, ease: "sine.inOut"});
    logoTl.to("#logo", {opacity: 0, duration: 5});

    window.addEventListener("scroll", handleOnScroll);

    return(() => {
      window.removeEventListener("scroll", handleOnScroll);
    })
  }, []);

  const handleOnScroll = () => {
    // let percentage = window.pageYOffset / window.innerHeight;
    // console.log(percentage);
    // if (percentage >= 1.5) {
    //   setSecond(true);
    // } else {
    //   setSecond(false);
    // }

    if ((window.innerHeight + window.pageYOffset) >= document.body.offsetHeight - 2) {
      setSecond(true);
    } else {
      setSecond(false);
    }
  }

  return (
    <div id="container" className={styles.container}>
      <div id="trigger" className={styles.trigger} />

      <div className={`${styles.background} ${second ? styles.target : ""}`}>
        <CloudLeft id="cloudLeft" className={styles.cloud} />
        <CloudRight id="cloudRight" className={styles.cloud} />
        <MountainLeft id="mountainLeft" className={`${styles.mountain} ${styles.left}`} />
        <MountainRight id="mountainRight" className={`${styles.mountain} ${styles.right}`} />
        <Logo id="logo" className={styles.logo} />
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
    </div>
  )
}