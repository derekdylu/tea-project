import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from "styled-components";
import { ThemeProvider } from "@emotion/react";
import theme from '../../Themes/Theme'
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import { getGames, updateGame } from '../../Utils/Axios';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import './wall.css'

import CachedIcon from '@mui/icons-material/Cached';

import backgroundBL from '../../Images/Wall/background-bl.png'
import backgroundUR from '../../Images/Wall/background-ur.png'
import backgroundUL from '../../Images/Wall/background-ul.png'
import object from '../../Images/Wall/object.png'

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
import 茶杯 from '../../Images/Wall/茶杯.gif'

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
  const [preload, setPreload] = useState(false)
  const [path, setPath] = useState("")
  const [path2, setPath2] = useState("")
  const [path3, setPath3] = useState("")
  const [path4, setPath4] = useState("")
  const [path5, setPath5] = useState("")
  const [startTime, setStartTime] = useState(Date.now())
  const [showOnlyCurrentCup, setShowOnlyCurrentCup] = useState(true)

  useEffect(() => {
    setPreload(true)
    fetchAndDrop()
    setPreload(false)
  }, [])

  function switchMode () {
    setShowOnlyCurrentCup(!showOnlyCurrentCup)
    fetchAndDrop(!showOnlyCurrentCup)
  }

  async function fetchAndDrop (onlyCurrent) {
    console.log("update time", startTime)
    setIsLoading(true)

    const fetchedData = await getGames()
    console.log("fetched data", fetchedData)

    let _fetchedData = []

    if (onlyCurrent) {
      console.log("show only current results")
      _fetchedData = fetchedData.filter(x => x.decision !== -1 && x.shown === false && x.timestamp >= startTime)
                                .sort((a, b) => a.timestamp - b.timestamp)
    } else {
      console.log("show all results")
      _fetchedData = fetchedData.filter(x => x.decision !== -1 && x.shown === false)
                                .sort((a, b) => a.timestamp - b.timestamp)
    }

    console.log("tidied data", _fetchedData)
    
    if ( _fetchedData === undefined || _fetchedData.length === 0 ) {
      setPath("")
      setPath2("")
      setPath3("")
      setPath4("")
      setPath5("")
    } else {
      setPath(teas[_fetchedData[0].decision])
      updateGame(_fetchedData[0]._id, null, null, null, null, true).then((res) => {
        console.log("set shown", res)
      }).catch((err) => {
        console.log("err", err)
      })
      setPath2(teas[_fetchedData[1].decision])
      updateGame(_fetchedData[1]._id, null, null, null, null, true).then((res) => {
        console.log("set shown", res)
      }).catch((err) => {
        console.log("err", err)
      })
      setPath3(teas[_fetchedData[2].decision])
      updateGame(_fetchedData[2]._id, null, null, null, null, true).then((res) => {
        console.log("set shown", res)
      }).catch((err) => {
        console.log("err", err)
      })
      setPath4(teas[_fetchedData[3].decision])
      updateGame(_fetchedData[3]._id, null, null, null, null, true).then((res) => {
        console.log("set shown", res)
      }).catch((err) => {
        console.log("err", err)
      })
      setPath5(teas[_fetchedData[4].decision])
      updateGame(_fetchedData[4]._id, null, null, null, null, true).then((res) => {
        console.log("set shown", res)
      }).catch((err) => {
        console.log("err", err)
      })
    }
    setIsLoading(false)
  }

  useEffect(() =>{
    let interval = setInterval(() => {
      fetchAndDrop()
    }, (40 * 1000))
    return () => clearInterval(interval)
  })

  var Cup01 = styled.div`
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

  var Cup02 = styled.div`
    animation-name: ${xAxis};
    animation-delay: 5s;
    animation-duration: 40s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.12, 0, 0.39, 0);
    &::after {
      content: "";
      display: block;
      width: 200px;
      height: 200px;
      background-image: url(${path2});
      background-size: 200px;
      animation-name: ${yAxis};
      animation-delay: 5s;
      animation-duration: 40s;
      animation-iteration-count: infinite;
      animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
    }
  `;

  var Cup03 = styled.div`
    animation-name: ${xAxis};
    animation-delay: 10s;
    animation-duration: 40s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.12, 0, 0.39, 0);
    &::after {
      content: "";
      display: block;
      width: 200px;
      height: 200px;
      background-image: url(${path3});
      background-size: 200px;
      animation-name: ${yAxis};
      animation-delay: 10s;
      animation-duration: 40s;
      animation-iteration-count: infinite;
      animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
    }
  `;
  var Cup04 = styled.div`
    animation-name: ${xAxis};
    animation-delay: 15s;
    animation-duration: 40s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.12, 0, 0.39, 0);
    &::after {
      content: "";
      display: block;
      width: 200px;
      height: 200px;
      background-image: url(${path4});
      background-size: 200px;
      animation-name: ${yAxis};
      animation-delay: 15s;
      animation-duration: 40s;
      animation-iteration-count: infinite;
      animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
    }
  `;

  var Cup05 = styled.div`
    animation-name: ${xAxis};
    animation-delay: 20s;
    animation-duration: 40s;
    animation-iteration-count: infinite;
    animation-timing-function: cubic-bezier(0.12, 0, 0.39, 0);
    &::after {
      content: "";
      display: block;
      width: 200px;
      height: 200px;
      background-image: url(${path5});
      background-size: 200px;
      animation-name: ${yAxis};
      animation-delay: 20s;
      animation-duration: 40s;
      animation-iteration-count: infinite;
      animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1);
    }
  `;

  return (
    <ThemeProvider theme={theme}>
      <Dialog aria-labelledby="window-size" open={width < 650} fullScreen>
        <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ my: 1 }} height="100%">
          <Typography variant="body2" color="#2D3748" fontWeight="500" sx={{mt: 2.5}} align="center">
            最小螢幕寬度 650 px
          </Typography>
        </Grid>
      </Dialog>
      <Grid container direction="column" alignItems="flex-end" justifyContent="flex-end" style={{ position: 'fixed', bottom: '50px', right: '50px', zIndex: 10}}>
        {
          isLoading ?
          (
            <Box sx={{ m: 2, pr: 0.9, display: 'flex' }}>
              <CircularProgress size={18} style={{ color: theme.palette.button }} />
            </Box>
          ) : (
            <Button sx={{ mb: 0.6 }} onClick={() => fetchAndDrop(showOnlyCurrentCup)}>
              <CachedIcon sx={{ color: theme.palette.button }} />
            </Button>
          )
        }
        {/* <Typography variant='bodyMedium'>
          顯示所有結果？
        </Typography> */}
        <Button onClick={() => switchMode()} disabled={isLoading}>
          {
            showOnlyCurrentCup ? '切換為顯示所有結果' : '切換為僅顯示目前結果'
          }
        </Button>
      </Grid>
      {
        preload &&
        teas.map((tea) => (
          <img src={tea} alt="preload" />
        ))
      }
      <div style={{ position: 'absolute', left: '400px', top: '-200px' }}>
        <Cup01 />
      </div>
      <div style={{ position: 'absolute', left: '400px', top: '-200px' }}>
        <Cup02 />
      </div>
      <div style={{ position: 'absolute', left: '400px', top: '-200px' }}>
        <Cup03 />
      </div>
      <div style={{ position: 'absolute', left: '400px', top: '-200px' }}>
        <Cup04 />
      </div>
      <div style={{ position: 'absolute', left: '400px', top: '-200px' }}>
        <Cup05 />
      </div>
      <img alt="background-bl" src={backgroundBL} style={{ scale: '0.6', position: 'fixed', bottom: '-1250px', left: '-800px' }}/>
      <img alt="background-ur" src={backgroundUR} style={{ scale: '0.6', position: 'fixed', top: '-1000px', right: '-1650px' }}/>
      <img alt="background-ul" src={backgroundUL} style={{ scale: '0.6', position: 'fixed', top: '-1550px', left: '-1300px', animationName: 'upleftAnim', animationDuration: '3s', animationIterationCount: 'infinite', animationDirection: 'alternate'}}/>
      <img alt="object" src={object} height={ 619 } style={{ position: 'fixed', bottom: '0px', right: '-50px' }}/>
      <img alt="cup_pure" src={茶杯} height={ 200 } style={{ position: 'fixed', bottom: '96px', right: '410px' }}/>
    </ThemeProvider>
  )
}

export default Wall