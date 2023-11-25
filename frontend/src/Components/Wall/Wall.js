import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from "styled-components";
import { ThemeProvider } from "@emotion/react";
import Marquee from "react-fast-marquee";
import theme from '../../Themes/Theme'
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import { getGames, updateGame } from '../../Utils/Axios';
import Typography from '@mui/material/Typography';
import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

import TeaCup from './TeaCup';
import './wall.css'

import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CachedIcon from '@mui/icons-material/Cached';
import backgroundBL from '../../Images/Wall/background-bl.png'
import backgroundUR from '../../Images/Wall/background-ur.png'
import backgroundUL from '../../Images/Wall/background-ul.png'
import object from '../../Images/Wall/object.png'
import 茶杯 from '../../Images/Wall/茶杯.gif'

const Wall = () => {
  const [maxShowTeasLength, setMaxShowTeasLength] = useState(8)
  const [updateInterval, setUpdateInterval] = useState(10)
  const [marqueeSpeed, setMarqueeSpeed] = useState(20)
  const { width, height, ratio } = useWindowDimensions()
  const [open, setOpen] = useState(false)
  const [openPanel, setOpenPanel] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [startTime, setStartTime] = useState(Date.now())
  const [epochTimeBegin, setEpochTimeBegin] = useState()
  const [epochTimeEnd, setEpochTimeEnd] = useState()
  const [showOnlyCurrentCup, setShowOnlyCurrentCup] = useState(true)
  const [confirmClear, setConfirmClear] = useState(false)
  const showTeas = useRef([])

  useEffect(() => {
    fetchAndDrop(showOnlyCurrentCup)
  }, [])

  useEffect(() =>{
    let interval = setInterval(() => {
      fetchAndDrop(showOnlyCurrentCup)
    }, (updateInterval * 1000))
    return () => clearInterval(interval)
  })

  useEffect(() => {
    if (width < 830 || height < 830) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [ratio])

  function switchMode (mode) {
    if (mode !== null) {
      showTeas.current = []
      setEpochTimeBegin()
      setEpochTimeEnd()
      setShowOnlyCurrentCup(mode)
      fetchAndDrop(mode)
    }
  }

  function switchUpdateInterval (value) {
    if (value !== null) setUpdateInterval(value)
  }

  function switchMaxShowTeasLength (value) {
    if (value !== null) setMaxShowTeasLength(value)
  }

  function switchMarqueeSpeed (value) {
    if (value !== null) setMarqueeSpeed(value)
  }

  function switchEpochTimeRange () {
    let begin = document.getElementById("timestampInputBegin");
    let end = document.getElementById("timestampInputEnd");
    let beginDate = new Date(begin.value);
    let endDate = new Date(end.value);
    let beginTime = beginDate.getTime();
    let endTime = endDate.getTime();
    if (beginTime > endTime) {
      alert("開始時間不得大於結束時間")
      return
    }
    setEpochTimeBegin(beginTime)
    setEpochTimeEnd(endTime)
  }

  function setDefault () {
    if (!showOnlyCurrentCup) switchMode(true)
    setMaxShowTeasLength(8)
    setUpdateInterval(10)
    setMarqueeSpeed(20)
    setEpochTimeBegin()
    setEpochTimeEnd()
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
                                // from oldest to latest
    } else {
      console.log("show dedicated results")
      _fetchedData = fetchedData.filter(x => x.decision !== -1 && x.timestamp >= epochTimeBegin && x.timestamp <= epochTimeEnd)
                                .sort((a, b) => a.timestamp - b.timestamp)
    }

    console.log("tidied data", _fetchedData)

    let updateLimit
    if (maxShowTeasLength - showTeas.current.length > 0) {
      updateLimit = maxShowTeasLength - showTeas.current.length
    } else {
      updateLimit = 1
    }

    console.log("update limit", updateLimit)

    if ( _fetchedData !== undefined && _fetchedData.length !== 0 ) {
    
      let _showTeas = showTeas.current
      for ( let i = 0; i < updateLimit; i++ ) {
        if ( _fetchedData[i] !== undefined ) {
          _showTeas.push( _fetchedData[i].decision )
          updateGame(_fetchedData[i]._id, null, null, null, null, true).then((res) => {
            console.log("set db shown", res)
          }).catch((err) => {
            console.log("err", err)
          })
        } else {
          break
        }
      }

      let __showTeas = []
      if (_showTeas.length > maxShowTeasLength) { 
        __showTeas = _showTeas.slice(_showTeas.length - maxShowTeasLength, _showTeas.length)
      } else {
        __showTeas = _showTeas
      }

      showTeas.current = __showTeas
      console.log("show array", showTeas.current)

    }
    setIsLoading(false)
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog aria-labelledby="window-size" open={open} fullScreen>
        <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ my: 1 }} height="100%">
          <Typography variant="titleMedium" color="#2D3748" fontWeight="500" sx={{mt: 2.5}} align="center">
            螢幕尺寸不足 (寬度需大於 830 px，高度需大於 830 px)
          </Typography>
          <Button onClick={() => setOpen(false)} sx={{mt: 1}} color="error" >
            仍要使用
          </Button>
        </Grid>
      </Dialog>
      <Dialog 
        open={openPanel}
        PaperProps={{
          style: { backgroundColor: theme.palette.surface.main, borderRadius: 28, }
        }}
      >
        <Grid container direction="column" alignItems="flex-start" justifyContent="flex-start" sx={{ px: 4, py: 2}}>
          <Typography variant='titleLarge' sx={{mt: 2}}>
            設定
          </Typography>
          <Typography variant='titleMedium' sx={{mt: 2}}>
            茶杯顯示模式
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={showOnlyCurrentCup}
            exclusive
            onChange={(e, value) => switchMode(value)}
            sx={{mt:1, mb:1.5}}
          >
            <ToggleButton value={true}>僅顯示目前結果</ToggleButton>
            <ToggleButton value={false}>顯示特定期間結果</ToggleButton>
          </ToggleButtonGroup>
          {
            !showOnlyCurrentCup &&
            <>
              <div>
                <input type="datetime-local" id="timestampInputBegin" style={{marginRight: "5px"}} />
                -
                <input type="datetime-local" id="timestampInputEnd" style={{marginLeft: "5px"}}/>
              </div>
              <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ mt: 1 }}>
                <Typography variant='labelSmall' sx={{ml: 1}}>
                  顯示期間 {epochTimeBegin ? new Date(epochTimeBegin).toLocaleString() : "未套用"} - {epochTimeEnd ? new Date(epochTimeEnd).toLocaleString() : "未套用"}
                </Typography>
                <Button onClick={() => switchEpochTimeRange()}>套用</Button>
              </Grid>
            </>
          }
          <Typography variant='titleMedium' sx={{mt: 2}}>
            茶杯更新速度 {updateInterval} 秒
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={updateInterval}
            exclusive
            onChange={(e, value) => {switchUpdateInterval(value)}}
            sx={{mt:1}}
          >
            <ToggleButton value={5}>5</ToggleButton>
            <ToggleButton value={10}>10</ToggleButton>
            <ToggleButton value={20}>20</ToggleButton>
            <ToggleButton value={30}>30</ToggleButton>
            <ToggleButton value={60}>60</ToggleButton>
            <ToggleButton value={300}>300</ToggleButton>
          </ToggleButtonGroup>
          <Typography variant='titleMedium' sx={{mt: 2}}>
            最大茶杯數量 {maxShowTeasLength} 杯
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={maxShowTeasLength}
            exclusive
            onChange={(e, value) => {switchMaxShowTeasLength(value)}}
            sx={{mt:1}}
          >
            <ToggleButton value={5}>5</ToggleButton>
            <ToggleButton value={8}>8</ToggleButton>
            <ToggleButton value={10}>10</ToggleButton>
            <ToggleButton value={15}>15</ToggleButton>
            <ToggleButton value={20}>20</ToggleButton>
            <ToggleButton value={25}>25</ToggleButton>
            <ToggleButton value={50}>50</ToggleButton>
          </ToggleButtonGroup>
          <Typography variant='titleMedium' sx={{mt: 2}}>
            跑馬燈速度 {marqueeSpeed / 20}
          </Typography>
          <ToggleButtonGroup
            color="primary"
            value={marqueeSpeed}
            exclusive
            onChange={(e, value) => {switchMarqueeSpeed(value)}}
            sx={{mt:1}}
          >
            <ToggleButton value={10}>0.5</ToggleButton>
            <ToggleButton value={15}>0.75</ToggleButton>
            <ToggleButton value={20}>1</ToggleButton>
            <ToggleButton value={30}>1.5</ToggleButton>
            <ToggleButton value={40}>2</ToggleButton>
            <ToggleButton value={60}>3</ToggleButton>
          </ToggleButtonGroup>
          <Typography variant="labelSmall" sx={{mt: 2}}>
            部分設定於下次更新時套用
          </Typography>
          <Grid direction="row" width="auto" justifyContent="center" alignItems="flex-start" sx={{mt: 2}}>
            <Button onClick={() => {setOpenPanel(false); setConfirmClear(false)}} sx={{ }} color="primary" >
              關閉
            </Button>
            <Button onClick={() => setDefault()} sx={{ ml: 2 }} color="button" >
              恢復預設
            </Button>
            <>
            {
              confirmClear ? 
              <Button onClick={() => {showTeas.current = []; setConfirmClear(false);}} sx={{ ml: 2 }} color="error">
                確定清空？
              </Button>
              :
              <Button onClick={() => {setConfirmClear(true)}} sx={{ ml: 2 }} color="error" >
                清空畫面
              </Button>
            }
            </>
          </Grid>
        </Grid>
      </Dialog>
      <Grid container direction="row" alignItems="flex-end" justifyContent="flex-end" style={{ position: 'fixed', bottom: '50px', right: '50px', zIndex: 10}}>
        <Button onClick={() => setOpenPanel(!openPanel)}>
          <SettingsOutlinedIcon sx={{ color: theme.palette.button }} />
        </Button>
        {
          isLoading ?
          (
            <Box sx={{ mx: 2.42, mb: 1.2, pr: 0.9, display: 'flex' }}>
              <CircularProgress size={18} style={{ color: theme.palette.button }} />
            </Box>
          ) : (
            <Button onClick={() => fetchAndDrop(showOnlyCurrentCup)}>
              <CachedIcon sx={{ color: theme.palette.button }} />
            </Button>
          )
        }
      </Grid>
      <Marquee
        pauseOnClick={true}
        gradient={false}
        speed={marqueeSpeed}
        style={{
          position: 'relative',
          top: `${height/2 - 200}px`,
          zIndex: '0',
        }}
      >
        {
          showTeas.current.map((tea, index) => {
            return (
              <TeaCup tea={tea} key={index} />
            )
          })
        }
        <Typography sx={{ ml: 10 }}></Typography>
      </Marquee>
      <img alt="background-bl" src={backgroundBL} style={{ scale: '0.6', position: 'fixed', bottom: '-1250px', left: '-800px' }}/>
      <img alt="background-ur" src={backgroundUR} style={{ scale: '0.6', position: 'fixed', top: '-1000px', right: '-1650px' }}/>
      <img alt="background-ul" src={backgroundUL} style={{ scale: '0.6', position: 'fixed', top: '-1550px', left: '-1300px', animationName: 'upleftAnim', animationDuration: '3s', animationIterationCount: 'infinite', animationDirection: 'alternate'}}/>
      <img alt="object" src={object} height={ 520 } style={{ position: 'fixed', bottom: '-100px', right: '140px' }}/>
      <img alt="cup_pure" src={茶杯} height={ 260 } style={{ position: 'fixed', bottom: '25px', right: '590px' }}/>
    </ThemeProvider>
  )
}

export default Wall
