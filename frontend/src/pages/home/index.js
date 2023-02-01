import React, { useEffect, useState } from "react";
import { ReactComponent as Logo } from "../../images/logo.svg";
import TestBg from "../../images/test-bg.png";
import styles from "./styles.module.scss";

export const Home = ({}) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);
  const [second, setSecond] = useState(false);

  const content = [
    "生活中隨處可以看見台灣茶的蹤影，可是我們總是與他們擦身而過，錯失了認識他們的好機會。",
    "現在讓我們一起看看你適合哪些台灣茶，把握與他的認識機會吧！"
  ]

  const getIsPhone = () => {
    return (windowWidth <= 414);
  }

  useEffect(() => {
    const onResize = () => {
      setWindowWidth(window.innerWidth);
    }

    window.addEventListener("resize", onResize);

    return(() => {
      window.removeEventListener("resize", onResize);
    });
  }, []);

  const handleOnClick = () => {
    console.log("clicked !")
    setSecond((prevState) => !prevState);
  }

  return (
    <React.Fragment>
      { getIsPhone() ?
        <div className={styles.container} onClick={handleOnClick}>
          {/* <Logo className={`${styles.logo} ${second ? styles.second : ""}`} /> */}
          <img src={TestBg} className={`${styles.testBg} ${second ? styles.target : ""}`} />
          <div className={styles.cutOutContainer}>
            <div className={`${styles.circleCutOut} ${second ? styles.target : ""}`}>
              <div className={`${styles.circleLeft} ${second ? styles.target : ""}`} />
              <div className={`${styles.circleCenter} ${second ? styles.target : ""}`} />
              <div className={`${styles.circleRight} ${second ? styles.target : ""}`} />
            </div>
            <div className={`${styles.squareCutOut} ${second ? styles.target : ""}`} />
            {/* <div className={styles.squareCutOut} /> */}
          </div>
          <div className={`${styles.intro} ${second ? styles.target : ""}`}>
            <div className={styles.title}>
              你喝茶嗎？
            </div>
            { content.map((text, i) =>
              <div key={i} className={styles.text}>
                { text }
              </div>
            )}
          </div>
        </div> 
        :
        <div className={`${styles.container} ${styles.notPhone}`}>
          Please use phone
        </div>
      }
    </React.Fragment>
  )
}