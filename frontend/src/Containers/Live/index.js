import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import liveBackground from "../../Images/liveBackground.png"
import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import theme from "../../Themes/Theme";
import tea from "../../Images/Live/tea.png"
import qrCode from "../../Images/Live/qr-code.svg"
import { getGames } from "../../Utils/Axios";

import cup0 from "../../Images/Live/cup0.png";
import cup2 from "../../Images/Live/cup2.png";
import cup3 from "../../Images/Live/cup3.png";
import cup6 from "../../Images/Live/cup6.png";
import cup7 from "../../Images/Live/cup7.png";
import cup8 from "../../Images/Live/cup8.png";
import cup9 from "../../Images/Live/cup9.png";
import cup10 from "../../Images/Live/cup10.png";
import cup11 from "../../Images/Live/cup11.png";
import cup12 from "../../Images/Live/cup12.png";
import cup13 from "../../Images/Live/cup13.png";
import cup14 from "../../Images/Live/cup14.png";

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

const data = [
  {
    id: 0,
    name: "碧螺春綠茶",
    color: "#FFD306",
  },
  {
    id: 1,
    name: "",
    color: "",
  },
  {
    id: 2,
    name: "包種茶",
    color: "#FBCC0A",
  },
  {
    id: 3,
    name: "高山烏龍茶（南部高海拔）",
    color: "#F0B717",
  },
  {
    id: 4,
    name: "高山烏龍茶（北部高海拔）",
    color: "#ECB01B",
  },
  {
    id: 5,
    name: "台灣烏龍茶（低海拔）",
    color: "#E8A91F",
  },
  {
    id: 6,
    name: "凍頂烏龍",
    color: "#E4A223",
  },
  {
    id: 7,
    name: "鐵觀音茶",
    color: "#E09C27",
  },
  {
    id: 8,
    name: "紅烏龍茶",
    color: "#D88E2F",
  },
  {
    id: 9,
    name: "東方美人茶",
    color: "#DC952B",
  },
  {
    id: 10,
    name: "小葉種紅茶",
    color: "#D48733",
  },
  {
    id: 11,
    name: "阿薩姆紅茶（南投）",
    color: "#D18038",
  },
  {
    id: 12,
    name: "紅玉紅茶",
    color: "#C97240",
  },
  {
    id: 13,
    name: "紅韻紅茶",
    color: "#C56B44",
  },
  {
    id: 14,
    name: "蜜香紅茶",
    color: "#CD793C",
  },
  {
    id: 15,
    name: "金萱茶（品種）",
    color: "#F3BE12",
  },
  {
    id: 16,
    name: "四季春（品種）",
    color: "#F7C50E",
  }
]

export const Live = () => { // 1570 x 1200
  const [timestamp, setTimestamp] = useState(0);
  const [rank, setRank] = useState({});

  const fetchGames = () => {
    getGames()
      .then((res) => {
        var filtered = res.filter(obj => obj.timestamp >= timestamp);
        let totalResult = {};
        
        for (let i = 0; i < 17; i++) {
          var filteredPerTea = filtered.filter(obj => obj.decision == i);
          totalResult[i] = filteredPerTea.length;
        }

        let sortedTotalResultKey = Object.keys(totalResult).sort(function(a, b) {return totalResult[b] - totalResult[a]});
        
        let sortedTotalResult = {};
        for (let i = 0; i < 6; i++) {
          let id = sortedTotalResultKey[i]
          sortedTotalResult[id] = totalResult[id];
        }
        
        setRank(sortedTotalResult);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  useEffect(() => {
    fetchGames();
    let interval = setInterval(() => {
      fetchGames();
    }, (30000))

    return () => clearInterval(interval)
  }, [timestamp])

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
      element.style.bottom = position[i]
    })
  }, [rank]);

  const [showTimestamp, setShowTimestamp] = useState(false);

  const toggleTimestamp = () => {
    setShowTimestamp((prevState) => !prevState);
  }

  const handleChangeTimestamp = () => {
    setShowTimestamp(false);
    let timestampInput = document.getElementById("timestampInput");
    let date = new Date(timestampInput.value);
    let epochTime = date.getTime();
    setTimestamp(epochTime);
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
            { Object.keys(rank).map((key, i) => (
              <div className={styles.row} id={key} key={i}>
                {/* <img src={tea} /> */}
                <div className={styles.img}>
                  <img src={cupImg[key]} />
                </div>

                <div className={styles.column} >
                  <Typography variant="titleLarge">
                    { data[key].name }
                  </Typography>
                  <div className={styles.bar} style={{ width: `calc(${rank[key] / max * 100}% - 1rem)` }}>
                    <div className={styles.filled} style={{ backgroundColor: data[key].color }}/>
                    <Typography variant="titleMedium">
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
                <Typography variant="headlineSmall" className={styles.description} key={i}>
                  { text }
                </Typography>
              ))}
            </div>
            <img src={qrCode} onClick={toggleTimestamp} />
          </div>
        </div>
        { showTimestamp &&
          <div className={styles.timestampContainer}>
            <input type="datetime-local" id="timestampInput"/>
            <button onClick={handleChangeTimestamp}>套用</button>
          </div>
        }
      </div>
    </ThemeProvider>
  )
}
