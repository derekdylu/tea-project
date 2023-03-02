import React from "react";
import { ReactComponent as ShareIcon } from "../../Images/Icon/arrow_outward.svg"
import { ReactComponent as AddIcon } from "../../Images/Icon/add.svg";
import testImgSrc from "../../Images/testImg.png";
import styles from "./styles.module.scss";

import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import theme from "../../Themes/Theme";

export const Food = (
  data
) => {
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
                { data.data.shop }
              </Typography>
            </div>
            <Typography variant="headlineMedium">
              { data.data.name }
            </Typography>
          </div>
          <Typography variant="bodyLarge">
            { data.data.content }
          </Typography>
          <img src={ testImgSrc } />
          <a href={data.data.link} target="_blank">
            <button className={styles.button}>
              <AddIcon />
              <Typography variant="labelLarge">
                深入瞭解
              </Typography>
            </button>
          </a>
        </div>
      </div>
    </ThemeProvider>
  )
}