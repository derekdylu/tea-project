import React from "react";
import styles from "./styles.module.scss";

import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import theme from "../../Themes/Theme";

import { ReactComponent as Play } from "../../Images/Replay/play.svg";
import leaf from "../../Images/Replay/leaf.png";
import cup0 from "../../Images/Replay/cup0.png";
import cup2 from "../../Images/Replay/cup2.png";
import cup3 from "../../Images/Replay/cup3.png";
import cup6 from "../../Images/Replay/cup6.png";
import cup7 from "../../Images/Replay/cup7.png";
import cup8 from "../../Images/Replay/cup8.png";
import cup9 from "../../Images/Replay/cup9.png";
import cup10 from "../../Images/Replay/cup10.png";
import cup11 from "../../Images/Replay/cup11.png";
import cup12 from "../../Images/Replay/cup12.png";
import cup13 from "../../Images/Replay/cup13.png";
import cup14 from "../../Images/Replay/cup14.png";

const cupImg = {
  0: cup0,
  2: cup2,
  3: cup3,
  4: cup3,
  5: cup3,
  6: cup6,
  7: cup7,
  8: cup8,
  9: cup9,
  10: cup10,
  11: cup11,
  12: cup12,
  13: cup13,
  14: cup14,
  15: cup3,
  16: cup3,
}

export const Replay = ({
  id = 0,
  teaName = "",
  teaSubName = "",
  handleOnClick = () => null,
}) => {
  const title = "與你最相配！";
  const buttonLabel = "再次觀看"
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <div className={styles.group}>
          <img src={leaf} className={styles.leaf} />
          <img src={cupImg[id]} className={styles.cup} />
          <div className={styles.title}>
            <Typography variant="bodyMedium">
              { title }
            </Typography>
            <Typography variant="headlineSmall">
              { teaName }
            </Typography>
            { teaSubName &&
              <Typography variant="bodySmall">
                {`（${teaSubName}）`}
              </Typography>
            }
          </div>
          <button className={styles.replayButton} onClick={handleOnClick}>
            <Play />
            <Typography variant="labelLarge">
              { buttonLabel }
            </Typography>
          </button>
        </div>
      </div>
    </ThemeProvider>
  )
}