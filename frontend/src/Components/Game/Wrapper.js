import React, { useState } from 'react'
import { ThemeProvider } from "@emotion/react";
import theme from '../../Themes/Theme'
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Marquee from "react-fast-marquee";
import Game from "./Game";
import { NavBar } from "../NavBar"
import './wrapper.css';

import { db } from './Characteristics';

const Wrapper = () => {
  const [index, setIndex] = useState(db.length - 1)
  const [page, setPage] = useState(0)

  const onChangeIndex = (index) => {
    setIndex(index)
  }

  const onChangePage = (page) => {
    setPage(page)
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="container">
        <NavBar />
        <Game onChangeIndex={onChangeIndex} onChangePage={onChangePage}/>
        {
          (index > 1 && page === 1)&&
            <Marquee
            gradient={false}
            speed={10}
            style={{
              position: 'absolute',
              top: '515px',
              zIndex: -1
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
      </div>
    </ThemeProvider>
  )
}

export default Wrapper