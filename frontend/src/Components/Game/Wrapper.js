import React, { useState, useEffect } from 'react'
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
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';

import { db } from './Characteristics';

import dislike from '../../Images/Dialog/dislike.gif';
import like from '../../Images/Dialog/like.gif';
import undo from '../../Images/Dialog/undo.gif';

const dialogGif = [
  like,
  dislike,
  undo,
]

const dialog = [
  [
    "向右滑動卡片",
    "表示「喜歡」",
    "除了右滑，也可以點擊「愛心」按鈕來表示喜歡。",
    "下一步",
  ],[
    "向左滑動卡片",
    "表示「不喜歡」",
    "除了左滑，也可以點擊「叉叉」按鈕來表示不喜歡。",
    "下一步",
  ],
  [
    "回心轉意",
    "",
    "點擊「返回」按鍵，即可重返到上一張卡片重作決定。",
    "開始！"
  ]
]

const Wrapper = () => {
  const { width, height, ratio } = useWindowDimensions()
  const [index, setIndex] = useState(db.length - 1)
  const [phaseTitle1, setPhaseTitle1] = useState(true)
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogIndex, setDialogIndex] = useState(0)
  const [game, setGame] = useState(false)

  useEffect(() => {
    handleDialogOpen()
  }, [])

  const onChangeIndex = (index) => {
    setIndex(index)
  }

  const onChangePhaseTitle1 = (p) => {
    setPhaseTitle1(p)
  }

  const handleDialogOpen = () => {
    setOpenDialog(true)
  }

  const handleDialog = () => {
    if (dialogIndex + 1 === 3) {
      handleDialogClose()
      return
    }
    setDialogIndex(dialogIndex + 1)
  }

  const handleDialogClose = () => {
    setOpenDialog(false)
    setGame(true)
  }

  return (
    <ThemeProvider theme={theme}>
      <Dialog
        open={openDialog}
        PaperProps={{
          style: { backgroundColor: theme.palette.surface.main, borderRadius: 28 }
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ px: 3, pt: 3 }}
          style={{ borderRadius: '28px' }}
        >
          <img src={dialogGif[dialogIndex]} alt="placeholder" width="278px" style={{ marginBottom: '8px' }}/>
          <Typography variant="headlineMedium" style={{ color: theme.palette.neutralVariant[30], mt: 3 }}>
            {dialog[dialogIndex][0]}
          </Typography>
          <Typography variant="headlineMedium" sx={{ color: theme.palette.neutralVariant[30], mt: 1/2 }}>
            {dialog[dialogIndex][1]}
          </Typography>
          <Typography variant="bodyMedium" sx={{ color: theme.palette.neutralVariant[30], mt: 1 }}>
            {dialog[dialogIndex][2]}
          </Typography>
        </Grid>
        <DialogActions sx={{ m: 2 }}>
          <Button color="primary" onClick={() => handleDialog()} autoFocus>
            {dialog[dialogIndex][3]}
          </Button>
        </DialogActions>
      </Dialog>
      { game &&
        <Grid
          style={{
            backgroundColor: "#FEFCF4"
          }}
          sx={{
            pb: 4
          }}
        >
          <Box width={width} height={64} style={{ background: "#fefcf4", position: "fixed"}}>
            <NavBar forGame={true}/>
          </Box>
          <Game onChangeIndex={onChangeIndex} onChangePhaseTitle1={onChangePhaseTitle1} handleDialogOpen={handleDialogOpen}/>
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
      }
    </ThemeProvider>
  )
}

export default Wrapper