import React, { useRef, useState, useEffect } from "react";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { ReactComponent as Hand } from "../../images/home/hand.svg";
import { ReactComponent as FrontCenter } from "../../images/home/frontCenter.svg";
import { ReactComponent as FrontLeft } from "../../images/home/frontLeft.svg";
import { ReactComponent as FrontRight } from "../../images/home/frontRight.svg";
import { ReactComponent as BackCenter } from "../../images/home/backCenter.svg";
import { ReactComponent as BackRight } from "../../images/home/backRight.svg";
import { ReactComponent as CloudLeft } from "../../images/home/cloudLeft.svg";
import { ReactComponent as CloudRight } from "../../images/home/cloudRight.svg";
import { ReactComponent as MountainLeft } from "../../images/home/mountainLeft.svg";
import { ReactComponent as MountainRight } from "../../images/home/mountainRight.svg";
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
    cloudLeftTl.to("#cloudLeft", {y: "-30%", duration: 5, ease: "sine.inOut"});

    const cloudRightTl = gsap.timeline(handScrollTrigger);
    cloudRightTl.to("#cloudRight", {y: "12%", x: "5%", duration: 10, ease: "sine.inOut"});
    cloudRightTl.to("#cloudRight", {y: "-30%", duration: 5, ease: "sine.inOut"});

    const logoTl = gsap.timeline(handScrollTrigger);
    logoTl.to("#logo", {y: "-70%", x: "-50%", width: "80%", duration: 10, ease: "sine.inOut"});
    logoTl.to("#logo", {y: "-80%", opacity: 0, duration: 5});

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