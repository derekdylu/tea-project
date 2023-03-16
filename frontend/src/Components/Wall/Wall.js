import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from "styled-components";
import { ThemeProvider } from "@emotion/react";
import theme from '../../Themes/Theme'
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import { getGames, updateGame } from '../../Utils/Axios';
import useSWR from 'swr'
import './wall.css'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import background from '../../Images/Wall/background.png'

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

// const fetcher = (...args) => fetch(...args).then(res => res.json())
// const fetcher = url => axios.get(url).then(res => res.data)

function timeout(delay: number) {
  return new Promise( res => setTimeout(res, delay) );
}

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
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState()
  const [path, setPath] = useState("")
  const [startTime, setStartTime] = useState(0)
  // const lastUpdateTime = Date.now()
  // const lastUpdateTime = "1678947398956"

  useEffect(() => {
    fetchAndDrop()
  }, [])

  // console.log("last update time: " + lastUpdateTime)

  async function fetchAndDrop () {
    setIsLoading(true)

    const fetchedData = await getGames()
    console.log("fetched data", fetchedData)
    // const fetchedData = testData

    // let demoData = []
    const fetchedDataTop = fetchedData.filter(x => x.decision !== -1)
                                      .filter(y => y.shown === false && y.timestamp >= startTime)
                                      .sort((a, b) => a.timestamp - b.timestamp)[0]
    
    // if ( data && data.length > 0 ) {
    //   const currentData = data

    //   updateGame(currentData[0].id, null, null, null, null, true).then((res) => {
    //     console.log("res", res)
    //   }).catch((err) => {
    //     console.log("err", err)
    //   })

    //   const _currentData = currentData.slice(1)
    //   const __currentData = _currentData.concat(_fetchedData)
    //   demoData = __currentData
    // } else {
    //   demoData = _fetchedData
    // }
    // setData(demoData)
    // console.log("demo data", demoData)
    
    if ( fetchedDataTop === undefined ) {
      setPath("")
    } else {
      setPath(teas[fetchedDataTop.decision])
      updateGame(fetchedDataTop._id, null, null, null, null, true).then((res) => {
        console.log("res", res)
      }).catch((err) => {
        console.log("err", err)
      })
    }
    setIsLoading(false)
  }

  useEffect(() =>{
    let interval = setInterval(() => {
      fetchAndDrop()
    }, (21 * 1000))
    return () => clearInterval(interval)
  })

  var Cup = styled.div`
    animation-name: ${xAxis};
    animation-duration: 40s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.12, 0, 0.39, 0);
    &::after {
      content: "";
      display: block;
      width: 200px;
      height: 200px;
      background-image: url(${path});
      background-size: 200px;
      animation-name: ${yAxis};
      animation-duration: 40s;
      animation-iteration-count: infinite;
      animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
    }
  `;

  return (
    <ThemeProvider theme={theme}>
      <div>
        {
          isLoading && (
            <Box sx={{ m: 2, display: 'flex' }}>
              <CircularProgress size={18} style={{ color: theme.palette.neutral[80] }} />
            </Box>
          )
        }
      </div>
      <div style={{ position: 'absolute', left: '400px', top: '-200px' }}>
        <Cup />
      </div>
      <img alt="bg" src={background} height={ 3 * height / 4} style={{ position: 'fixed', bottom: '0px', right: '-50px' }}/>
    </ThemeProvider>
  )
}

export default Wall