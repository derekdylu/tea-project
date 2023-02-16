import React from "react";
import { ReactComponent as ShareIcon } from "../../Images/arrow_outward.svg"
import testImgSrc from "../../Images/testImg.png";
import styles from "./styles.module.scss";

import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import theme from "../../Themes/Theme";

export const Food = ({data}) => {
  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <div className={styles.group}>
          <div className={styles.title}>
            <div className={styles.shop}>
              <svg>
                  <circle r="2" cx="50%" cy="50%" />
              </svg>
              <Typography variant="bodySmall">
                { data.shop }
              </Typography>
            </div>
            <Typography variant="headlineMedium">
              { data.name }
            </Typography>
          </div>
          <Typography variant="bodyLarge">
            { data.desc }
          </Typography>
          <img src={testImgSrc} />
          <a className={styles.link} href={data.link} target="_blank">
            <ShareIcon />
          </a>
        </div>
      </div>
    </ThemeProvider>
  )
}