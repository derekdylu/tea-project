import React from "react";
import { ReactComponent as ShareIcon } from "../../Images/Icon/arrow_outward.svg"
import { ReactComponent as AddIcon } from "../../Images/Icon/add.svg";
import testImgSrc from "../../Images/testImg.png";
import styles from "./styles.module.scss";

import Product1 from "../../Images/Product/product1.png";
import Product3 from "../../Images/Product/product3.png";
import Product4 from "../../Images/Product/product4.png";
import Product7 from "../../Images/Product/product7.png";
import Product8 from "../../Images/Product/product8.png";
import Product9 from "../../Images/Product/product9.png";
import Product10 from "../../Images/Product/product10.png";
import Product11 from "../../Images/Product/product11.png";
import Product12 from "../../Images/Product/product12.png";
import Product13 from "../../Images/Product/product13.png";
import Product14 from "../../Images/Product/product14.png";
import Product15 from "../../Images/Product/product15.png";
import Product16 from "../../Images/Product/product16.png";
import Product17 from "../../Images/Product/product17.png";

import { ThemeProvider } from "@emotion/react";
import { Typography } from "@mui/material";
import theme from "../../Themes/Theme";

const images = {
  "碧螺春千層蛋糕": Product1,
  "台灣玉露綠茶-四兩茶葉": "",
  "包種茶酥": Product3,
  "台灣高山烏龍茶千層": Product4,
  "凍頂烏龍茶蕨餅生乳捲": Product7,
  "鐵觀音奶霜蛋糕": Product8,
  "鹿野紅烏龍生乳捲": Product9,
  "台灣茶詩蛋糕-東方美人茶": Product10,
  "小葉紅茶": Product11,
  "阿薩姆紅茶瑞士捲": Product12,
  "日月潭紅玉紅茶燒布丁": Product13,
  "紅韻厚奶茶生巧克力": Product14,
  "蜜香紅茶生乳慕斯": Product15,
  "檸檬金萱千層蛋糕": Product16,
  "台灣四季春重乳酪蛋糕": Product17
}


export const Product = (
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
          <img src={ images[data.data.name] } />
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