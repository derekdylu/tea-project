import React, {useState} from "react";
import { ReactComponent as Logo } from "../../images/logo.svg";
import { ReactComponent as SoundOn } from "../../images/navBar/sound_on.svg";
import { ReactComponent as SoundOff } from "../../images/navBar/sound_off.svg";
import { ReactComponent as Menu } from "../../images/navBar/menu.svg";
import styles from "./styles.module.scss";

export const NavBar = ({
  hideLogo = false,
}) => {
  const [soundIsOn, setSoundIsOn] = useState(true);

  const handleSoundOnClick = () => {
    setSoundIsOn((prevState) => !prevState);
  }

  return (
    <div className={styles.container}>
      <div className={`${styles.logo} ${hideLogo ? styles.hidden : ""}`}>
        <Logo />
      </div>
      <div className={styles.left}>
        { soundIsOn ?
          <SoundOn onClick={handleSoundOnClick} /> :
          <SoundOff onClick={handleSoundOnClick} />
        }
        <Menu />
      </div>
    </div>
  )
}