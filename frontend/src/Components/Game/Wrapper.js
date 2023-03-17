import React, { useState } from 'react'
import { ThemeProvider } from "@emotion/react";
import theme from '../../Themes/Theme'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Marquee from "react-fast-marquee";
import Game from "./Game";
import { NavBar } from "../NavBar"
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import './wrapper.css';

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
      <Grid
        style={{
          backgroundColor: "#FEFCF4"
        }}
        sx={{
          pb: 1
        }}
      >
        <Box width={width} height={64} style={{ background: "#fefcf4", position: "fixed"}}>
          <NavBar forGame={true}/>
        </Box>
        <Game onChangeIndex={onChangeIndex} onChangePhaseTitle1={onChangePhaseTitle1}/>
        {
          ( index > 1 && !phaseTitle1 ) &&
            <Marquee
              gradient={false}
              speed={10}
              style={{
                position: 'relative',
                bottom: '16px',
              }}
            >
              <Typography className="marquee-1" variant="displayLargeEnglish" sx={{ color: "#E8E7D8", mx: 1 }}>
                {db[index].engName}
              </Typography>
              <Typography className="marquee-2" variant="displayLargeEnglish" sx={{ color: "#E8E7D8", mx: 0 }}>
                ∗
              </Typography>
              <Typography className="marquee-3" variant="displayLargeEnglish" sx={{ color: "#E8E7D8", mx: 1 }}>
                {db[index].engName}
              </Typography>
            </Marquee>
        }

      </Grid>
    </ThemeProvider>
  )
}

export default Wrapper