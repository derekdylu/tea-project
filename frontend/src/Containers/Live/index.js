import { useEffect, useState } from "react";
import styles from "./styles.module.css";
import liveBackground from "../../Images/liveBackground.png"
import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import theme from "../../Themes/Theme";

export const Live = ({

}) => {
  const [rank, setRank] = useState({
    "碧螺春綠茶": 60,
    "紅烏龍": 80,
    "包種茶": 70,
    "鐵觀音": 85,
    "東方美人茶": 50,
    "四季春": 90,
    // "tea7": 65,
    // "tea8": 75,
    // "tea9": 60,
    // "tea10": 90,
  });

  // const position = ["2%", "12%", "22%", "32%", "42%", "52%", "62%", "72%", "82%", "92%"];
  const position = ["13%", "26%", "39%", "52%", "65%", "78%"];

  const [max, setMax] = useState(0);
  const [sortedKeys, setSortedKeys] = useState([]);

  useEffect(() => {
    setMax(Math.max.apply(null, Object.values(rank)));
    let sorted = Object.keys(rank).sort(function(a, b) {return rank[b] - rank[a]});
    setSortedKeys(Object.keys(rank).sort(function(a, b) {return rank[b] - rank[a]}));
    sorted.map((key, i) => {
      let element = document.getElementById(key)
      console.log(element.style)
      element.style.top = position[i]
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
        {/* <div className={styles.graph}> */}
          { Object.keys(rank).map((key) => (
            <div className={styles.row} id={key}>
              <Typography variant="titleLarge" onClick={ (e) => handleOnClick(key) }> {key} {/*rank[key]*/} </Typography>
              {/* <div onClick={ (e) => handleOnClick(key) }>{key}</div> */}
              <div className={styles.tmp}>
                <div className={styles.bar} style={{width: `${rank[key] / max * 100}%`}} />
                <Typography variant="titleLarge" onClick={ (e) => handleOnClick(key) }>
                  {rank[key]}
                </Typography>
              </div>
            </div>
          ))}
        {/* </div> */}
      </div>
    </ThemeProvider>
  )
}
