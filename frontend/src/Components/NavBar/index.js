import React, {useState} from "react";
import { ReactComponent as Logo } from "../../Images/logo.svg";
import { ReactComponent as SoundOn } from "../../Images/NavBar/sound_on.svg";
import { ReactComponent as SoundOff } from "../../Images/NavBar/sound_off.svg";
import { ReactComponent as Menu } from "../../Images/NavBar/menu.svg";
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