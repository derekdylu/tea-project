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

  const [max, setMax] = useState(0);
  const [sortedKeys, setSortedKeys] = useState([]);

  useEffect(() => {
    setMax(Math.max.apply(null, Object.values(rank)));
    setSortedKeys(Object.keys(rank).sort(function(a, b) {return rank[b] - rank[a]}));
  }, [rank]);

  function handleOnClick(key) {
    const updatedRank = rank;
    updatedRank[key] += 5;
    setRank({...updatedRank});
  }

  return (
    <div className={styles.container}>
      {/* <div className={styles.graph}> */}
        { sortedKeys.map((key) => (
          <div className={styles.row}>
            <div onClick={ (e) => handleOnClick(key) }>{key} {rank[key]}</div>
            <div className={styles.bar} style={{width: `${rank[key] / max * 100}%`}} />
          </div>
        ))}
      {/* </div> */}
    </div>
  )
}
