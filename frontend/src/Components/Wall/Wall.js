import React, { useState, useEffect, useRef } from 'react'
import styled, { keyframes } from "styled-components";
import { ThemeProvider } from "@emotion/react";
import theme from '../../Themes/Theme'
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import { getGames } from '../../Utils/Axios';
import useSWR from 'swr'
import './wall.css'
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import background from '../../Images/Wall/background.png'

// CHECK update the file path after materials are finished
import 凍頂烏龍茶 from '../../Images/Wall/凍頂烏龍.gif'
import 小葉種紅茶 from '../../Images/Wall/小葉種紅茶.gif'
import 文山包種茶 from '../../Images/Wall/文山包種茶.gif'
import 東方美人茶 from '../../Images/Wall/東方美人茶.gif'
import 碧螺春綠茶 from '../../Images/Wall/小葉種紅茶.gif'
import 紅烏龍茶 from '../../Images/Wall/小葉種紅茶.gif'
import 紅韻紅茶 from '../../Images/Wall/小葉種紅茶.gif'
import 蜜香紅茶 from '../../Images/Wall/小葉種紅茶.gif'
import 鐵觀音茶 from '../../Images/Wall/小葉種紅茶.gif'

// const fetcher = (...args) => fetch(...args).then(res => res.json())
// const fetcher = url => axios.get(url).then(res => res.data)

const testData = [
  {
    "selection": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    "selected": [0,1,2,3],
    "decision": 1,
    "timestamp": '1677142881955',
  },
  {
    "selection": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    "selected": [0,1,2,3],
    "decision": 1,
    "timestamp": '1677142881955',
  },
  {
    "selection": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    "selected": [0,1,2,3],
    "decision": 2,
    "timestamp": '1677142881955',
  },
  {
    "selection": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    "selected": [0,1,2,3],
    "decision": 3,
    "timestamp": '1677142881955',
  },
  {
    "selection": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    "selected": [0,1,2,3],
    "decision": 0,
    "timestamp": '1677142881955',
  },
]

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
  // TODO add motion tea background, background color, and import all cup motions
  // TODO align all tea motion materials
  // TODO create a valid loop function for multiple teas displaying
  // TODO subscription (GraphQL) or automatic refetch in a certain time without messing up the currently displaying order

  const { width, height, ratio } = useWindowDimensions()
  const [isLoading, setIsLoading] = useState(false)
  const [data, setData] = useState()
  const [path, setPath] = useState("")
  const lastUpdateTime = Date.now()

  useEffect(() => {
    fetchAndDrop()
  }, [])

  console.log("last update time: " + lastUpdateTime)

  async function fetchAndDrop () {
    setIsLoading(true)

    // const fetchedData = await getGames()
    const fetchedData = testData

    const _fetchedData = fetchedData.filter(x => x.decision !== -1).filter(y => y.timestamp >= lastUpdateTime)
    if ( data ) {
      const currentData = data
      const _currentData = currentData.slice(1)
      const __currentData = _currentData.concat(_fetchedData)
      setData(__currentData)
    } else {
      setData(_fetchedData)
    }
    if ( data === undefined || data.length <= 0 ) {
      setPath("")
    } else {
      setPath(teas[data[0].decision])
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