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

import TeaCup from './TeaCup';
import './wall.css'

import CachedIcon from '@mui/icons-material/Cached';
import backgroundBL from '../../Images/Wall/background-bl.png'
import backgroundUR from '../../Images/Wall/background-ur.png'
import backgroundUL from '../../Images/Wall/background-ul.png'
import object from '../../Images/Wall/object.png'
import 茶杯 from '../../Images/Wall/茶杯.gif'

const maxShowTeasLength = 8

const Wall = () => {
  const { width, height, ratio } = useWindowDimensions()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [startTime, setStartTime] = useState(Date.now())
  const [showOnlyCurrentCup, setShowOnlyCurrentCup] = useState(true)
  const showTeas = useRef([])

  useEffect(() => {
    fetchAndDrop(showOnlyCurrentCup)
  }, [])

  useEffect(() =>{
    let interval = setInterval(() => {
      fetchAndDrop(showOnlyCurrentCup)
    }, (10 * 1000))
    return () => clearInterval(interval)
  })

  useEffect(() => {
    if (width < 650 || height < 830) {
      setOpen(true)
    } else {
      setOpen(false)
    }
  }, [ratio])

  function switchMode () {
    showTeas.current = []
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
                                // from oldest to latest
    } else {
      console.log("show all results")
      _fetchedData = fetchedData.filter(x => x.decision !== -1 && x.shown === false)
                                .sort((a, b) => a.timestamp - b.timestamp)
    }

    console.log("tidied data", _fetchedData)

    let updateLimit
    if (maxShowTeasLength - showTeas.current.length > 0) {
      updateLimit = maxShowTeasLength - showTeas.current.length
    } else {
      updateLimit = 1
    }

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
            螢幕尺寸不足 (寬度需大於 650 px，高度需大於 830 px)
          </Typography>
          <Button onClick={() => setOpen(false)} sx={{mt: 1}} color="error" >
            仍要使用
          </Button>
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
        <Button onClick={() => switchMode()} disabled={isLoading}>
          {
            showOnlyCurrentCup ? '切換為顯示所有結果' : '切換為僅顯示目前結果'
          }
        </Button>
      </Grid>
      <Marquee
        pauseOnClick={true}
        gradient={false}
        speed={20}
        style={{
          position: 'relative',
          top: `${height/5}px`,
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
      <img alt="object" src={object} height={ 619 } style={{ position: 'fixed', bottom: '-20px', right: '-50px' }}/>
      <img alt="cup_pure" src={茶杯} height={ 200 } style={{ position: 'fixed', bottom: '76px', right: '410px' }}/>
    </ThemeProvider>
  )
}

export default Wall