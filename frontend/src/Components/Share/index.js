import React from "react";
import { ReactComponent as Flower } from "../../Images/flower.svg";
import styles from "./styles.module.scss";
import { Typography } from "@mui/material";
import taste1 from "../../Images/Share/taste1.png"
import taste2 from "../../Images/Share/taste2.png"
import { ReactComponent as DownloadIcon } from "../../Images/Icon/download.svg"

export const Share = ({ teaName, teaSubName, hashtags }) => {
  // const teaName = ["四季春"];
  // const teaSubName = "茶樹品種"
  // const hashtags = ["清香", "淡雅",	"臺灣綠茶", "不發酵茶"]

  return (
    // <div style={{width: "100vw", height: "100vh"}}>
      <div className={styles.container}>
        <div className={styles.shareContainer}>
          <Flower className={styles.flower} />
          <div className={styles.text}>
            <div className={styles.row}>
              <div className={`${styles.title} ${teaName.length === 2 ? styles.alignEnd : ""}`}>
                { teaSubName && teaName.length === 2 &&
                  <Typography variant="bodySmall">
                    ({ teaSubName })
                  </Typography>
                }
                <div className={styles.name}>
                  { teaName.map((line, i) => (
                    <Typography key={i} variant="displaySmall">
                      { line }
                    </Typography>
                  ))}
                </div>
                { teaSubName && teaName.length === 1 &&
                  <Typography variant="bodySmall">
                    ({ teaSubName })
                  </Typography>
                }
              </div>
              <svg className={styles.line}>
                <line x1="0%" y1="50%" x2="100%" y2="50%" />
              </svg>
              <div className={styles.hashtag}>
                { hashtags.map((hashtag, i) => (
                  <Typography key={i} variant="bodySmall">
                    # {hashtag}
                  </Typography>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.imageContainer}>
            <img src={taste1} />
            <img src={taste2} />
            <img src={taste1} />
            <img src={taste2} />
          </div>
        </div>
        <button className={styles.button}>
            <DownloadIcon />
            <Typography variant="labelLarge">
              下載結果
            </Typography>
          </button>
        <svg className={styles.circleText}>
          <path
            id="curve"
            d="
              M 20, 50
              a 30,30 0 1,1 60,0
              a 30,30 0 1,1 -60,0
            "
            fill="none"
          />
          <text style={{fontSize: "12px", fontWeight: 500, lineHeight: "16px", letterSpacing: "0.14px", color: "#48473C"}}>
            <textPath href="#curve" textLength="188">
              與我最香配・與我最香配・
            </textPath>
          </text>
        </svg>
      </div>
    // </div>
  )
}