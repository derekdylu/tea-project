import React, { useRef, useState, useEffect } from "react";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { ReactComponent as Hand } from "../../images/hand.svg";
import { ReactComponent as FrontGrass } from "../../images/frontGrass.svg";
import { ReactComponent as BehindGrass } from "../../images/behindGrass.svg";
import { ReactComponent as Cloud } from "../../images/cloud.svg";
import { ReactComponent as Mountain } from "../../images/mountain.svg";
import styles from "./styles.module.scss";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);
// import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

export const Gsap = ({}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const handRef = useRef(null);

  useEffect(() => {
    console.log("done rendering");
    const handTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hand",
        markers: true,
        start: "top 70%",
        end: "top 25%",
        scrub: 1
      }
    });

    handTl.to("#hand", {yPercent: -60, duration: 5});

    const grassTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hand",
        markers: true,
        start: "top 70%",
        end: "top 25%",
        scrub: 1
      }
    });

    grassTl.to(["#frontGrass", "#backGrass"], {yPercent: 60, xPercent: -3, width: "110%", duration: 5});

    const logoTl = gsap.timeline({
      scrollTrigger: {
        trigger: "#logo",
        markers: true,
        start: "bottom 15%",
        end: "bottom 0%",
        scrub: 1
      }
    });

    logoTl.to("#logo", {yPercent: -80, xPercent: -3, width: "80vw", duration: 1});

    // const onResize = () => {
    //   var hand = document.querySelector('#hand');
    //   hand.style.left = "50%";
    //   hand.style.transform = "translateX(-50%)";
      
    //   var logo = document.querySelector('#logo');
    //   logo.style.left = "50%";
    //   logo.style.transform = "translateX(-50%)";
    // }

    // window.addEventListener("resize", onResize);

    // return(() => {
    //   window.removeEventListener("resize", onResize);
    // });

  }, []);

  return (
    <div className={styles.container}>
      {/* <div style={{ height: "80vh", backgroundColor: "pink" }} /> */}
      {/* <div className={styles.panel} /> */}
      <Cloud id="cloud" className={styles.cloud} />
      <Mountain id="mountain" className={styles.mountain} />
      <Logo id="logo" className={styles.logo} />
      <FrontGrass id="frontGrass" className={styles.frontGrass} />
      <Hand id="hand" className={styles.hand} />
      <BehindGrass id="backGrass" className={styles.backGrass} />
    </div>
  )
}