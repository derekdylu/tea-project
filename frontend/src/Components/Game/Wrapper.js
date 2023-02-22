import React, { useState } from 'react'
import { ThemeProvider } from "@emotion/react";
import theme from '../../Themes/Theme'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Marquee from "react-fast-marquee";
import Game from "./Game";
import { NavBar } from "../NavBar"
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import './wrapper.css';

import background from '../../Images/flower.svg';

import { db } from './Characteristics';

const Wrapper = () => {
  const { width, height, ratio } = useWindowDimensions()
  const [index, setIndex] = useState(db.length - 1)
  const [phaseTitle1, setPhaseTitle1] = useState(true)

  const onChangeIndex = (index) => {
    setIndex(index)
  }

  const onChangePhaseTitle1 = (p) => {
    setPhaseTitle1(p)
  }

  return (
    <ThemeProvider theme={theme}>
      {/* <Grid
        container
        direction="column"
        width={width}
        height={height}
      > */}
      <div className="container">
        <NavBar />
        <Game onChangeIndex={onChangeIndex} onChangePhaseTitle1={onChangePhaseTitle1}/>
        {
          ( index > 1 && !phaseTitle1 ) &&
            <Marquee
            gradient={false}
            speed={10}
            style={{
              position: 'absolute',
              top: '580px',
              zIndex: -1,
            }}
            >
              <Typography className="marquee-1" variant="displayLargeEnglish" sx={{ color: theme.palette.surface.main, mx: 1 }}>
                {db[index].engName}
              </Typography>
              <Typography className="marquee-2" variant="displayLargeEnglish" sx={{ color: theme.palette.surface.main, mx: 0 }}>
                ∗
              </Typography>
              <Typography className="marquee-3" variant="displayLargeEnglish" sx={{ color: theme.palette.surface.main, mx: 1 }}>
                {db[index].engName}
              </Typography>
            </Marquee>
        }
        {
          index <= 1 && <img src={background} alt="bg" width={width} height={height} />
        }
      </div>
      {/* </Grid> */}
    </ThemeProvider>
  )
}

export default Wrapper