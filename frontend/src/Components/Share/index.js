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
import domtoimage from 'dom-to-image';

import 蔬菜香 from '../../Images/Share/蔬菜香.svg'
import 豆子 from '../../Images/Share/豆子香.svg'
import 茶色淺 from '../../Images/Share/茶色淺.svg'
import 茶色深 from '../../Images/Share/茶色深.svg'
import 焙香 from '../../Images/Share/焙香.svg'
import 清香 from '../../Images/Share/清香.svg'
import 龍眼乾 from '../../Images/Share/龍眼乾味.svg'
import 無花果乾 from '../../Images/Share/無花果乾味.svg'
import 熱帶水果味 from '../../Images/Share/熱帶水果味.svg'
import 果香 from '../../Images/Share/果香.svg'
import 口感較厚 from '../../Images/Share/口感較厚.svg'
import 野薑花香 from '../../Images/Share/野薑花香.svg'
import 柑橘味 from '../../Images/Share/柑橘味.svg'
import 薄荷 from '../../Images/Share/薄荷味.svg'
import 肉桂味 from '../../Images/Share/肉桂味.svg'
import 口感濃稠 from '../../Images/Share/口感濃稠.svg'
import 甜香 from '../../Images/Share/甜香.svg'
import 蜜香 from '../../Images/Share/蜜香.svg'
import 中藥味 from '../../Images/Share/中藥味.svg'
import 濃郁果香 from '../../Images/Share/濃郁果香.svg'
import 果酸 from '../../Images/Share/果酸味.svg'
import 淡雅花香 from '../../Images/Share/淡雅花香.svg'
import 草麥味 from '../../Images/Share/草麥味.svg'
import 玄米 from '../../Images/Share/玄米味.svg'
import 茉莉花 from '../../Images/Share/茉莉花香.svg'
import 奶香 from '../../Images/Share/奶香.svg'
import 花香 from '../../Images/Share/花香.svg'
import 青香 from '../../Images/Share/青香.svg'
import 收斂感 from '../../Images/Share/收斂感.svg'

// import test from '../../Images/Share/龍眼乾味.svg'

const images = {
  "蔬菜香": 蔬菜香,
  "豆子": 豆子,
  "茶色淺": 茶色淺,
  "茶色深": 茶色深,
  "焙香": 焙香,
  "清香": 清香,
  "龍眼乾": 龍眼乾,
  "果乾味": 無花果乾,
  "熱帶水果味": 熱帶水果味,
  "果香": 果香,
  "口感較厚": 口感較厚,
  "野薑花香": 野薑花香,
  "柑橘味": 柑橘味,
  "薄荷": 薄荷,
  "肉桂味": 肉桂味,
  "微澀": 收斂感,
  "甜香": 甜香,
  "蜜香": 蜜香,
  "中藥味": 中藥味,
  "濃郁果香": 濃郁果香,
  "果酸味": 果酸,
  "口感濃稠": 口感濃稠,
  "淡雅花香": 淡雅花香,
  "草麥味": 草麥味,
  "玄米": 玄米,
  "茉莉香": 茉莉花,
  "奶香": 奶香,
  "花香": 花香,
  "濃花香": 花香,
  "青香": 青香,
  "價低": 茶色淺
}

export const Share = ({
  teaName=[""],
  teaSubName="",
  hashtags=["",""],
}) => {
  const [showShareDialog, setShowShareDialog] = useState(false);
  const [showButton, setShowButton] = useState(true);
  let img1 = images[hashtags[0]];
  let img2 = images[hashtags[1]];

  const onShare = () => {
    setShowShareDialog(true);
    setShowButton(false);

    var node = document.getElementById('capture');
    setTimeout(() => {
      htmlToImage(node)
        .then(function (cacbe) {
          htmlToImage(node)
            .then(function(dataUrl) {
              let render = document.getElementById('renderer')
              render.innerHTML = "<img src='" + dataUrl + "' alt='render' width='100%' />"
            })
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
              <div className={styles.marquee} id="marquee">
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