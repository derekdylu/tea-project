import React from 'react'

import 碧螺春綠茶 from '../../Images/Wall/碧螺春綠茶.gif'
import 八川綠茶 from '../../Images/Wall/八川綠茶.gif'
import 包種茶 from '../../Images/Wall/包種茶.gif'
import 高山烏龍南部高海拔 from '../../Images/Wall/高山烏龍南部高海拔.gif'
import 高山烏龍北部高海拔 from '../../Images/Wall/高山烏龍北部高海拔.gif'
import 台灣烏龍茶 from '../../Images/Wall/台灣烏龍茶.gif'
import 凍頂烏龍 from '../../Images/Wall/凍頂烏龍.gif'
import 鐵觀音 from '../../Images/Wall/鐵觀音.gif'
import 紅烏龍 from '../../Images/Wall/紅烏龍.gif'
import 東方美人茶 from '../../Images/Wall/東方美人茶.gif'
import 小葉種紅茶 from '../../Images/Wall/小葉種紅茶.gif'
import 阿薩姆紅茶 from '../../Images/Wall/阿薩姆紅茶.gif'
import 紅玉紅茶 from '../../Images/Wall/紅玉紅茶.gif'
import 紅韻紅茶 from '../../Images/Wall/紅韻紅茶.gif'
import 蜜香紅茶 from '../../Images/Wall/蜜香紅茶.gif'
import 金萱茶 from '../../Images/Wall/金萱茶.gif'
import 四季春 from '../../Images/Wall/四季春.gif'

const teas = [
  碧螺春綠茶,
  八川綠茶,
  包種茶,
  高山烏龍南部高海拔,
  高山烏龍北部高海拔,
  台灣烏龍茶,
  凍頂烏龍,
  鐵觀音,
  紅烏龍,
  東方美人茶,
  小葉種紅茶,
  阿薩姆紅茶,
  紅玉紅茶,
  紅韻紅茶,
  蜜香紅茶,
  金萱茶,
  四季春,
]

const Loader = ({tea}) => {
  return (
    <div>
      <img src={teas[tea]} alt="tea" style={{ height: "260px", width: "260px", marginLeft: "18px", marginRight: "18px"}} />
    </div>
  )
}

export default Loader