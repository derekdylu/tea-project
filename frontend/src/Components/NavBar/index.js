import React, { useState, useEffect } from "react";
import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';

import { ReactComponent as Logo } from "../../Images/logo.svg";
import { ReactComponent as SoundOn } from "../../Images/NavBar/sound_on.svg";
import { ReactComponent as SoundOff } from "../../Images/NavBar/sound_off.svg";
import { ReactComponent as ArrowForward } from "../../Images/NavBar/arrow_forward.svg";
import { ReactComponent as FrontCenter } from "../../Images/Home/frontCenter.svg";

import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import theme from "../../Themes/Theme";

import styles from "./styles.module.scss";
import gsap from "gsap";
import { Link } from "react-router-dom";

export const NavBar = ({
  defaultHideLogo = false,
}) => {
  const [windowHeight, setWindowHeight] = useState(`${document.documentElement.clientHeight}px`);
  const [soundIsOn, setSoundIsOn] = useState(true);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const [hideLogo, setHideLogo] = useState(true);
  const menus = [
    "開始探索",
    "關於"
  ]

  const handleSoundOnClick = () => {
    setSoundIsOn((prevState) => !prevState);
  }

  const handleBurgerOnClick = () => {
    menuIsOpen ? enableBodyScroll(document) : disableBodyScroll(document)
    setMenuIsOpen((prevState) => !prevState);
    setHideLogo((prevState) => !prevState);
  }

  useEffect(() => {
    const onResize = () => {
      setWindowHeight(`${document.documentElement.clientHeight}px`);
    }

    window.addEventListener("resize", onResize);
    return(() => {
      window.removeEventListener("resize", onResize);
    })
  })

  useEffect(() => {
    const menuTl = gsap.timeline();

    if (menuIsOpen) {
      menuTl.to("#menu", {width: "100vw", height: "100vw", duration: 0.6})
            .to("#menu", {height: windowHeight, borderRadius: "0", duration: 0.4}, "-=0.2")
            .to("#row", {left: "0", duration: 0.5, ease: "sine.inOut"})
            .to("#grass", {top: "78%", opacity: 1, duration: 0.5, ease: "sine.inOut"}, "-=0.2");
    } else {
      menuTl.to("#grass", {top: "100%", opacity: 0, duration: 0.5, ease: "sine.inOut"})
            .to("#row", {left: "100%", duration: 0.5, ease: "sine.inOut"}, "-=0.2")
            .to("#menu", {height: "100vw", borderRadius: "0 0 0 99%", duration: 0.2}, "-=0.2")
            .to("#menu", {width: "0", height: "0", duration: 0.8});
    }
  }, [menuIsOpen]);

  return (
    <ThemeProvider theme={theme}>
      <div className={`${styles.container} ${defaultHideLogo && hideLogo ? styles.alignLeft : ""}`}>
        { !(defaultHideLogo && hideLogo) &&
          <a className={styles.logo} href="/">
            <Logo />
          </a>
        }
        <div className={styles.left}>
          { soundIsOn ?
            <SoundOn onClick={handleSoundOnClick} /> :
            <SoundOff onClick={handleSoundOnClick} />
          }
          {/* <Menu /> */}
          <svg className={styles.burger} onClick={handleBurgerOnClick}>
            <line x1="12%" y1="50%" x2="88%" y2="50%"
              className={`${styles.top} ${menuIsOpen ? styles.opened : ""}`} />
            <line x1="12%" y1="50%" x2="88%" y2="50%"
              className={`${styles.middle} ${menuIsOpen ? styles.opened : ""}`} />
            <line x1="12%" y1="50%" x2="88%" y2="50%"
              className={`${styles.bottom} ${menuIsOpen ? styles.opened : ""}`} />
          </svg>
        </div>
        <div id="menu" className={styles.menu}>
          <div id="row" className={styles.rowContainer}>
            { menus.map((menu, i) => (
              <div key={i} className={styles.row}>
                <Typography variant="titleLarge" color={theme.palette.surface.contrastText}>
                  { menu }
                </Typography>
                <ArrowForward />
              </div>
            ))}
          </div>
          <FrontCenter id="grass" className={styles.grass} />
        </div>
      </div>    
    </ThemeProvider>
  )
}