import React, { useState, useEffect } from "react";
import { ReactComponent as Flower } from "../../Images/flower.svg";
import styles from "./styles.module.scss";
import { ReactComponent as DownloadIcon } from "../../Images/Icon/download.svg"

import { ThemeProvider } from "@emotion/react";
import theme from "../../Themes/Theme";
import { Typography } from "@mui/material";
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import { toPng as htmlToImage } from 'html-to-image';

import 蔬菜香 from '../../Images/Card/蔬菜香.png'
import 豆子 from '../../Images/Card/豆子.png'
import 茶色淺 from '../../Images/Card/茶色淺.png'
import 茶色深 from '../../Images/Card/茶色深.png'
import 焙香 from '../../Images/Card/焙香.png'
import 清香 from '../../Images/Card/清香.png'
import 龍眼乾 from '../../Images/Card/龍眼乾.png'
import 無花果乾 from '../../Images/Card/無花果乾.png'
import 熱帶果香 from '../../Images/Card/熱帶果香.png'
import 果香 from '../../Images/Card/果香.png'
import 口感較厚 from '../../Images/Card/口感較厚.png'
import 野薑花 from '../../Images/Card/野薑花.png'
import 柑橘味 from '../../Images/Card/柑橘味.png'
import 薄荷 from '../../Images/Card/薄荷.png'
import 肉桂味 from '../../Images/Card/肉桂味.png'
import 口感濃稠 from '../../Images/Card/口感濃稠.png'
import 甜香 from '../../Images/Card/甜香.png'
import 蜜香 from '../../Images/Card/蜜香.png'
import 中藥味 from '../../Images/Card/中藥味.png'
import 濃郁果香 from '../../Images/Card/濃郁果香.png'
import 果酸 from '../../Images/Card/果酸.png'
import 淡雅花香 from '../../Images/Card/淡雅花香.png'
import 草麥味 from '../../Images/Card/草麥味.png'
import 玄米 from '../../Images/Card/玄米.png'
import 茉莉花 from '../../Images/Card/茉莉花.png'
import 奶香 from '../../Images/Card/奶香.png'
import 花香 from '../../Images/Card/花香.png'
import 青香 from '../../Images/Card/青香.png'
import 收斂感 from '../../Images/Card/收斂感.png'

const images = {
  "蔬菜香": 蔬菜香,
  "豆子": 豆子,
  "茶色淺": 茶色淺,
  "茶色深": 茶色深,
  "焙香": 焙香,
  "清香": 清香,
  "龍眼乾": 龍眼乾,
  "無花果乾": 無花果乾,
  "熱帶果香": 熱帶果香,
  "果香": 果香,
  "口感較厚": 口感較厚,
  "野薑花": 野薑花,
  "柑橘味": 柑橘味,
  "薄荷": 薄荷,
  "肉桂味": 肉桂味,
  "收斂感": 收斂感,
  "甜香": 甜香,
  "蜜香": 蜜香,
  "中藥味": 中藥味,
  "濃郁果香": 濃郁果香,
  "果酸": 果酸,
  "口感濃稠": 口感濃稠,
  "淡雅花香": 淡雅花香,
  "草麥味": 草麥味,
  "玄米": 玄米,
  "茉莉花": 茉莉花,
  "奶香": 奶香,
  "花香": 花香,
  "青香": 青香,
}

export const Share = ({
  teaName=[""],
  teaSubName="",
  hashtags=["",""],
}) => {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showButton, setShowButton] = useState(true);
  let img1 = images["蔬菜香"];
  let img2 = images["豆子"];

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
        <div id="capture">
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
            <Typography variant="displayMedium">
              不是只有喝的。不是只有喝的。
            </Typography>

            <div className={styles.wrapper}>
              <div className={styles.marquee}>
                <div>
                  <img src={img1}/>
                  <img src={img2} />
                  <img src={img1} />
                  <img src={img2} />
                </div>
                <div>
                  <img src={img1}/>
                  <img src={img2} />
                  <img src={img1} />
                  <img src={img2} />
                </div>
              </div>
            </div>
          </div>
          
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