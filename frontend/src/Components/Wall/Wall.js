import React, { useState, useEffect } from 'react'
import styled, { keyframes } from "styled-components";
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import './wall.css'

import background from '../../Images/Wall/background.png'

import 凍頂烏龍茶 from '../../Images/Wall/凍頂烏龍茶.gif'
import 小葉種紅茶 from '../../Images/Wall/小葉種紅茶.gif'
import 文山包種茶 from '../../Images/Wall/文山包種茶.gif'
import 東方美人茶 from '../../Images/Wall/東方美人茶.gif'
import 碧螺春綠茶 from '../../Images/Wall/碧螺春綠茶.gif'
import 紅烏龍茶 from '../../Images/Wall/紅烏龍茶.gif'
import 紅韻紅茶 from '../../Images/Wall/紅韻紅茶.gif'
import 蜜香紅茶 from '../../Images/Wall/蜜香紅茶.gif'
import 鐵觀音茶 from '../../Images/Wall/鐵觀音茶.gif'

function timeout(delay: number) {
  return new Promise( res => setTimeout(res, delay) );
}

const teas = [
  凍頂烏龍茶,
  小葉種紅茶,
  文山包種茶,
  東方美人茶,
  碧螺春綠茶,
  紅烏龍茶,
  紅韻紅茶,
  蜜香紅茶,
  鐵觀音茶,
]

const xAxis = keyframes `
  50% {
    animation-timing-function: cubic-bezier(0.12, 0, 0.39, 0);
    transform: translateX(-600px);
  }
`

const yAxis = keyframes`
  0% {
    display: block;
    opacity: 1;
  }
  50% {
    animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
    transform: translateY(600px);
  }
  51% {
    display: block;
    opacity: 1;
  }
  52% {
    display: none;
    opacity: 0;
  }
  99% {
    display: none;
    opacity: 0;
  }
`

const Wall = () => {
  const { width, height, ratio } = useWindowDimensions()
  const [teaIndex, setTeaIndex] = useState(0)

  var Cup = styled.div`
    animation-name: ${xAxis};
    animation-duration: 26s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.12, 0, 0.39, 0);
    &::after {
      content: "";
      display: block;
      width: 200px;
      height: 200px;
      background-image: url(${teas[teaIndex]});
      background-size: 200px;
      animation-name: ${yAxis};
      animation-duration: 26s;
      animation-iteration-count: infinite;
      animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
    }
  `;

  return (
    <>
      <div style={{ position: 'absolute', left: '400px', top: '-200px' }}>
        <Cup />
      </div>
      <img alt="bg" src={background} height={ 3 * height / 4} style={{ position: 'fixed', bottom: '0px', right: '-50px' }}/>
    </>
  )
}

export default Wall