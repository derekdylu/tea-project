import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import liveBackground from "../../Images/liveBackground.png"
import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import theme from "../../Themes/Theme";
import tea from "../../Images/Live/tea.png"
import qrCode from "../../Images/Live/qr-code.svg"

const data = [
  {
    name: "碧螺春綠茶",
    color: "#FFD306",
  },
  {
    name: "",
    color: "",
  },
  {
    name: "包種茶",
    color: "#FBCC0A",
  },
  {
    name: "高山烏龍茶（南部高海拔）",
    color: "#F0B717",
  },
  {
    name: "高山烏龍茶（北部高海拔）",
    color: "#ECB01B",
  },
  {
    name: "台灣烏龍茶（低海拔）",
    color: "#E8A91F",
  },
  {
    name: "凍頂烏龍",
    color: "#E4A223",
  },
  {
    name: "鐵觀音茶",
    color: "#E09C27",
  },
  {
    name: "紅烏龍茶",
    color: "#D88E2F",
  },
  {
    name: "東方美人茶",
    color: "#DC952B",
  },
  {
    name: "小葉種紅茶",
    color: "#D48733",
  },
  {
    name: "阿薩姆紅茶（南投）",
    color: "#D18038",
  },
  {
    name: "紅玉紅茶",
    color: "#C97240",
  },
  {
    name: "紅韻紅茶",
    color: "#C56B44",
  },
  {
    name: "蜜香紅茶",
    color: "#CD793C",
  },
  {
    name: "金萱茶（品種）",
    color: "#F3BE12",
  },
  {
    name: "四季春（品種）",
    color: "#F7C50E",
  }
]

export const Live = () => { // 1570 x 1200
  const [rank, setRank] = useState({
    "0": 60,
    "3": 80,
    "5": 70,
    "8": 85,
    "10": 50,
    "14": 90,
  });

  const headline = "符合喜好之"
  const title = "前六名茶品項\n即時排名"

  const description = "上方圖表顯示符合現場使用者喜好的茶品項統計結果。\n圖表僅顯示前六名品項，並會隨著排名的即時異動而改變。"
  const qrDescription = [
    "馬上加入配對，",
    "找到屬於自己的一杯好茶。"
  ]

  const position = ["80%", "64%", "48%", "32%", "16%", "0%"];

  const [max, setMax] = useState(0);
  const [sortedKeys, setSortedKeys] = useState([]);

  useEffect(() => {
    setMax(Math.max.apply(null, Object.values(rank)));
    let sorted = Object.keys(rank).sort(function(a, b) {return rank[b] - rank[a]});
    setSortedKeys(Object.keys(rank).sort(function(a, b) {return rank[b] - rank[a]}));
    sorted.map((key, i) => {
      let element = document.getElementById(key)
      console.log(element.style)
      element.style.bottom = position[i]
    })
  }, [rank]);

  function handleOnClick(key) {
    const updatedRank = rank;
    updatedRank[key] += 5;
    setRank({...updatedRank});
  }

  return (
    <ThemeProvider theme={theme}>
      <div className={styles.container} style={{backgroundImage:`url(${liveBackground})`}}>
        <div className={`${styles.rowContainer} ${styles.top}`}>
          <div className={styles.title}>
            <Typography variant="headlineLarge">
              { headline }
            </Typography>
            <Typography variant="displayLarge">
              { title }
            </Typography>
          </div>
          <div className={styles.graph}>
            { Object.keys(rank).map((key) => (
              <div className={styles.row} id={key}>
                <img src={tea} />

                <div className={styles.column} >
                  <Typography variant="titleLarge" onClick={ (e) => handleOnClick(key) }>
                    { data[parseInt(key)].name }
                  </Typography>
                  <div className={styles.bar} style={{ width: `calc(${rank[key] / max * 100}% - 1rem)` }}>
                    <div className={styles.filled} style={{ backgroundColor: data[parseInt(key)].color }}/>
                    <Typography variant="titleMedium" onClick={ (e) => handleOnClick(key) }>
                      {rank[key]}
                    </Typography>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <svg>
          <line x1="0%" y1="50%" x2="100%" y2="50%" />
        </svg>
        <div className={`${styles.rowContainer} ${styles.bottom}`}>
          <Typography variant="headlineSmall">
            { description }
          </Typography>
          <div className={styles.qrContainer}>
            <div style={{display: "flex", flexDirection: "column"}}>
              { qrDescription.map((text, i) => (
                <Typography variant="headlineSmall" className={styles.description}>
                  { text }
                </Typography>
              ))}
            </div>
            <img src={qrCode} />
          </div>
        </div>
      </div>
    </ThemeProvider>
  )
}
