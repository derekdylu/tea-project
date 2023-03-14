import React, { useState, useEffect } from "react";
import { ReactComponent as Flower } from "../../Images/flower.svg";
import styles from "./styles.module.scss";
import taste1 from "../../Images/Share/taste1.png"
import taste2 from "../../Images/Share/taste2.png"
import { ReactComponent as DownloadIcon } from "../../Images/Icon/download.svg"

import { ThemeProvider } from "@emotion/react";
import theme from "../../Themes/Theme";
import { Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { toPng as htmlToImage } from 'html-to-image';
import Marquee from "react-fast-marquee";

export const Share = ({
  teaName=[""],
  teaSubName="",
  hashtags=["",""],
}) => {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [type, setType] = useState(true);

  const onShare = () => {
    setShowShareDialog(true);
    setShowButton(false);

    var node = document.getElementById('capture');
    setTimeout(() => {
      htmlToImage(node)
        .then(function (dataUrl) {
          let render = document.getElementById('renderer')
          render.innerHTML = "<img src='" + dataUrl + "' alt='render' width='100%' />"
        })
        .catch(function (error) {
          console.error('oops, something went wrong!', error);
        });
    }, 500)
  }

  const handleCloseDialog = () => {
    setShowButton(true);
    setShowShareDialog(false);
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container}>
        <div className={styles.shareContainer} id="capture">
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
          <Typography variant="displayMedium">
            不是只有喝的。不是只有喝的。
          </Typography>
          
          <div className={styles.wrapper}>
            <div className={styles.marquee}>
              <div>
                <img src={taste1}/>
                <img src={taste2} />
                <img src={taste1} />
                <img src={taste2} />
              </div>
              <div>
                <img src={taste1}/>
                <img src={taste2} />
                <img src={taste1} />
                <img src={taste2} />
              </div>
            </div>
          </div>
        </div>
        {/* Download Button */}
        { showButton &&
          <button className={styles.createButton} onClick={() => onShare()}>
            <DownloadIcon />
            <Typography variant="labelLarge">
              下載結果
            </Typography>
          </button>
        }

        {/* Circle */}
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

        {/* Dialog */}
        <Dialog
          open={showShareDialog}
          onClose={() => handleCloseDialog()}
          PaperProps={{
            style: { backgroundColor: theme.palette.surface.main, borderRadius: 28 }
          }}
        >
          <DialogContent>
            <div className={styles.dialog}>
              <Typography variant="bodyMedium">
                生成圖片後請長按下載圖片
              </Typography>
              <div id="renderer" />
              
              <button className={styles.button} onClick={handleCloseDialog}>
                <Typography variant="labelLarge" color={theme.palette.primary.main}>
                  關閉
                </Typography>
              </button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </ThemeProvider>
  )
}