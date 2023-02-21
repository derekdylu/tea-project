import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export const Live = ({

}) => {
  const [rank, setRank] = useState({
    "tea1": 60,
    "tea2": 80,
    "tea3": 70,
    "tea4": 85,
    "tea5": 50,
    "tea6": 90,
    "tea7": 65,
    "tea8": 75,
    "tea9": 60,
    "tea10": 90,
  });

  const position = ["2%", "12%", "22%", "32%", "42%", "52%", "62%", "72%", "82%", "92%"];

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
    <div className={styles.container}>
      {/* <div className={styles.graph}> */}
        { Object.keys(rank).map((key) => (
          <div className={styles.row} id={key}>
            <div onClick={ (e) => handleOnClick(key) }>{key} {rank[key]}</div>
            <div className={styles.bar} style={{width: `${rank[key] / max * 100}%`}} />
          </div>
        ))}
      {/* </div> */}
    </div>
  )
}
