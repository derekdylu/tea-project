import React, { useState, useEffect, useRef, useMemo, createRef } from 'react'
import { useSpring, useSprings, animated, to as interpolate } from '@react-spring/web'
import { useNavigate } from "react-router-dom";
import { useDrag } from 'react-use-gesture'
import { ThemeProvider } from "@emotion/react";
import theme from '../../Themes/Theme'
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import { calculateGame } from '../../Utils/Axios';
import styles from './styles.module.css';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';

import background from '../../Images/Card/background.png';
import background2 from '../../Images/flower.svg';

import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import SmallVerticalDivider from '../../Images/Icon/small_vertical_divider.svg';

import { db } from './Characteristics';

import dislike from '../../Images/Dialog/dislike.gif';
import like from '../../Images/Dialog/like.gif';
import undo from '../../Images/Dialog/undo.gif';

import 蔬菜香 from '../../Images/Card/蔬菜香.png'
import 豆子香 from '../../Images/Card/豆子香.png'
import 茶色淺 from '../../Images/Card/茶色淺.png'
import 茶色深 from '../../Images/Card/茶色深.png'
import 焙香 from '../../Images/Card/焙香.png'
import 清香 from '../../Images/Card/清香.png'
import 龍眼乾味 from '../../Images/Card/龍眼乾味.png'
import 無花果乾味 from '../../Images/Card/無花果乾味.png'
import 熱帶水果味 from '../../Images/Card/熱帶水果味.png'
import 果香 from '../../Images/Card/果香.png'
import 口感較厚 from '../../Images/Card/口感較厚.png'
import 野薑花香 from '../../Images/Card/野薑花香.png'
import 柑橘味 from '../../Images/Card/柑橘味.png'
import 薄荷味 from '../../Images/Card/薄荷味.png'
import 肉桂味 from '../../Images/Card/肉桂味.png'
import 口感濃稠 from '../../Images/Card/口感濃稠.png'
import 甜香 from '../../Images/Card/甜香.png'
import 蜜香 from '../../Images/Card/蜜香.png'
import 中藥味 from '../../Images/Card/中藥味.png'
import 濃郁果香 from '../../Images/Card/濃郁果香.png'
import 果酸味 from '../../Images/Card/果酸味.png'
import 淡雅花香 from '../../Images/Card/淡雅花香.png'
import 草麥味 from '../../Images/Card/草麥味.png'
import 玄米味 from '../../Images/Card/玄米味.png'
import 茉莉花香 from '../../Images/Card/茉莉花香.png'
import 奶香 from '../../Images/Card/奶香.png'
import 花香 from '../../Images/Card/花香.png'
import 青香 from '../../Images/Card/青香.png'
import 收斂感 from '../../Images/Card/收斂感.png'

const INTERVAL = 556;
const MINCARDHEIGHT = 164;

const cards = [
  茶色淺,
  茶色深,
  口感較厚,
  口感濃稠,
  收斂感,
  無花果乾味,
  熱帶水果味,
  龍眼乾味,
  柑橘味,
  薄荷味,
  肉桂味,
  中藥味,
  果酸味,
  草麥味,
  玄米味,
  蔬菜香,
  豆子香,
  果香,
  焙香,
  清香,
  野薑花香,
  甜香,
  蜜香,
  濃郁果香,
  淡雅花香,
  茉莉花香,
  奶香,
  花香,
  青香,
]

const type = [
  [
    "香氣",
    "共 14 種",
    "選擇你偏好的香氣",
  ],
  [
    "口味",
    "共 10 種",
    "選擇你偏好的口味",
  ],
  [
    "口感",
    "共 3 種",
    "選擇你偏好的口感",
  ],
  [
    "茶色",
    "共 2 種",
    "選擇你偏好的茶色",
  ],
  [
    "完成",
    "即將呈現",
    "你的專屬茶品",
  ]
]

const phase = [
  [
    "你喜歡",
    "什麼樣的茶？",
    "Phase 1",
    "依據你的偏好探索茶的風味"
  ],[
    "描述一下",
    "喝茶的情境",
    "Phase 2",
    "依據喝茶的時機找到合適的茶"
  ]
]

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

const multipleChoice = [
  [
    "早上剛起床",
    "中午休息後",
    "傍晚休息時",
  ],[
    "鹹食",
    "甜食",
    "無",
  ],
]

function SlideLeftTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

function SlideRightTransition(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

function timeout(delay: number) {
  return new Promise( res => setTimeout(res, delay) );
}

// These two are just helpers, they curate spring data, values that are later being interpolated into css
const to = (i: number) => ({
  x: 0,
  y: i * -1.5,
  scale: 1,
  rot: -10 + Math.random() * 20,
  delay: i * 100,
})

const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })

// This is being used down there in the view, it interpolates rotation and scale into a css transform
const trans = (r: number, s: number) =>
  `perspective(1500px) rotateX(9deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

const Game = ({ onChangeIndex, onChangePhaseTitle1 }) => {
  const navigate = useNavigate()
  const id = sessionStorage.getItem('id') || 'game_id_not_found'
  const { width, height, ratio } = useWindowDimensions()
  const [cardHeight, setCardHeight] = useState(height - INTERVAL)
  const [phaseTitle1, setPhaseTitle1] = useState(false)
  const [phaseTitle2, setPhaseTitle2] = useState(false)

  const [openSnackYes, setOpenSnackYes] = useState(false)
  const [openSnackNo, setOpenSnackNo] = useState(false)
  const [openDialog, setOpenDialog] = useState(false)
  const [dialogIndex, setDialogIndex] = useState(0)
  const [openTypeDialog, setOpenTypeDialog] = useState(false)
  const [typeDialogIndex, setTypeDialogIndex] = useState(0)

  const [multipleChoiceIndex, setMultipleChoiceIndex] = useState(0)
  const [index, setIndex] = useState(db.length - 1)
  const [gone] = useState(() => new Set())
  const [selection, setSelection] = useState([])
  const [props, api] = useSprings(cards.length, i => ({
    ...to(i),
    from: from(i),
  }))

  useEffect(() => {
    if (height - INTERVAL < MINCARDHEIGHT) {
      setCardHeight(MINCARDHEIGHT)
    } else {
      setCardHeight(height - INTERVAL)
    }
  }, [ratio])

  const pushSelection = (select, swipedIndex) => {
    // swipedIndex = -1 means button swipe is implemented and no need for checking
    let _selection = selection
    _selection.push(select)
    setSelection(_selection)
    console.log("selection", selection)

    console.log("change index to", index - 1)
    if ( index - 1 === -1 ) {
      handleTypeDialogOpen(index - 1)
      handleSubmit()
      return
    }
    index - 1 === 1 && handlePhase2Change()
    onChangeIndex(index - 1)
    setIndex(index - 1)

    // check the swipe index to see if user swipe the card that's not on the top,
    if ( swipedIndex !== -1 ) {
      if (selection.length + swipedIndex !== db.length - 2) {
        console.log("invalid swipe: selection len", selection.length, "index to be swiped", swipedIndex, "supposed sum", db.length - 2)
        undoSwipe(swipedIndex)
      } else {
        handleTypeDialogOpen(index - 1)
      }
    } else {
      handleTypeDialogOpen(index - 1)
    }

    if ( index - 1 === 0 ) {
      setMultipleChoiceIndex(1)
    }
  }

  const popSelection = () => {
    let newIndex = selection.length === 0 ? db.length - 1 : db.length - selection.length
    onChangeIndex(newIndex)
    setIndex(newIndex)
    let _selection = selection
    _selection.pop()
    setSelection(_selection)
    console.log("selection", selection)
  }

  // Button swipe
  const buttonSwipe = (index, dir) => {
    gone.add(index)
    pushSelection(dir === -1 ? 0 : 1, -1)
    swipeAnimation(index, true, dir * width, dir, 1)
  }

  // Undo
  const undoSwipe = (index) => {
    console.log("undo index", index)
    gone.delete(index)
    popSelection()
    swipeAnimation(index, false, 0, 0, 0)
  }

  const handleClickSnackYes = () => {
    setOpenSnackYes(true);
  };

  const handleCloseSnackYes = () => {
    setOpenSnackYes(false);
  };

  const handleClickSnackNo = () => {
    setOpenSnackNo(true);
  };

  const handleCloseSnackNo = () => {
    setOpenSnackNo(false);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  }

  const handleDialogClose = () => {
    setOpenDialog(false);
    handleTypeDialogOpen("startPage")
  }

  const handleTypeDialogOpen = (val) => {
    if ( val === "startPage" ) {
      setTypeDialogIndex(0)
      setOpenTypeDialog(true)
      handleTypeDialogClose()
    }
    if ( val === 16 ) {
      setTypeDialogIndex(1)
      setOpenTypeDialog(true)
      handleTypeDialogClose()
    }
    if ( val === 6 ) {
      setTypeDialogIndex(2)
      setOpenTypeDialog(true)
      handleTypeDialogClose()
    }
    if ( val === 3 ) {
      setTypeDialogIndex(3)
      setOpenTypeDialog(true)
      handleTypeDialogClose()
    }
    if ( val === -1 ) {
      // final loading
      setTypeDialogIndex(4)
      setOpenTypeDialog(true)
    }
  }

  async function handleTypeDialogClose () {
    await timeout(2000)
    setOpenTypeDialog(false)
  }

  async function handlePhase1Change () {
    setPhaseTitle1(true)
    await timeout(2000)
    setPhaseTitle1(false)
    onChangePhaseTitle1(false)
    handleDialogOpen()
  }

  async function handlePhase2Change () {
    setPhaseTitle2(true)
    await timeout(2000)
    setPhaseTitle2(false)
  }

  async function handleSubmit () {
    console.log('calculate')
    localStorage.setItem("selection", selection);
    calculateGame(id, selection).then((res) => {
      console.log(res);
      navigate("/result");
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    if (id === 'game_id_not_found') {
      navigate("/")
    }
    window.scrollTo(0, 0)
    handlePhase1Change()
  }, [])

  const handleDialog = () => {
    if (dialogIndex + 1 === 3) {
      handleDialogClose()
      return
    }
    setDialogIndex(dialogIndex + 1)
  }
  
  const swipeAnimation = (index, down, mx, dir, velocity) => {
    if ( mx >= 72 ) {
      handleCloseSnackNo()
      handleClickSnackYes()
    }
    if ( mx <= -72 ) {
      handleCloseSnackYes()
      handleClickSnackNo()
    }
    api.start(i => {
      if (index !== i) return
      const isGone = gone.has(index)
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0
      const rot = mx / 100 + (isGone ? dir * 10 * velocity : 0)
      const scale = down ? 1.1 : 1
      return {
        x,
        rot,
        scale,
        delay: undefined,
        config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
      }
    })
  }

  // Create a gesture, we're interested in down-state, delta (current-pos - click-pos), direction and velocity
  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity >= 0.2
    const dir = xDir < 0 ? -1 : 1
    const select = dir === -1 ? 0 : 1
    if (!down && trigger) {
      gone.add(index)
      pushSelection(select, index)
    }
    // console.log("index", index, "down", down, "mx", mx, "dir", dir, "velocity", velocity)
    swipeAnimation(index, down, mx, dir, velocity)
    return
  })
  // console.log("props", index-2, "x animation from", props[index-2].x.animation)

  return (
    <ThemeProvider theme={theme}>
      {/* --- snackbar */}
      <Snackbar
        open={openSnackYes}
        onClose={handleCloseSnackYes}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        TransitionComponent={SlideLeftTransition}
      >
        <Box
          style={{
            position: 'absolute',
            top: '350px',
            left: width - 88,
            width: '88px',
            height: '144px',
            backgroundColor: theme.palette.surface.main,
            boxShadow: '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3), 0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '300px 0px 0px 300px',
          }}
        >
          <FavoriteIcon
            style={{ height: '56px', width: '56px', position: 'relative', top: '35%', left: '25%' }}
            sx={{ color: theme.palette.primary.main }}
          />
        </Box>
      </Snackbar>

      <Snackbar
        open={openSnackNo}
        onClose={handleCloseSnackNo}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        TransitionComponent={SlideRightTransition}
      >
        <Box
          style={{
            position: 'absolute',
            top: '350px',
            width: '88px',
            height: '144px',
            backgroundColor: theme.palette.surface.main,
            boxShadow: '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3), 0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '0px 300px 300px 0px',
          }}
          sx={{
            ml: -5/3
          }}
        >
          <CloseIcon
            style={{ height: '56px', width: '56px', position: 'relative', top: '35%', left: '10%' }}
            sx={{ color: theme.palette.error.main }}
          />
        </Box>
      </Snackbar>

      {/* --- dialog */}
      <Dialog
        open={openDialog}
        onClose={handleDialogClose}
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
      
      <Dialog
        open={openTypeDialog}
        onClose={handleTypeDialogClose}
        fullWidth
        PaperProps={{
          style: { backgroundColor: theme.palette.surface.main, borderRadius: 0 },
          sx: { width: width, m: 0 }
        }}
      >
        <Grid
          container
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={3}
          sx={{ py: 2 }}
        >
          <Grid item>
            <Typography variant="titleLarge" style={{ color: theme.palette.neutralVariant[30] }}>
              {type[typeDialogIndex][0]}
            </Typography>
          </Grid>
          <Grid item>
            <img src={SmallVerticalDivider} alt="divider" />
          </Grid>
          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="flex-start"
              sx={{  }}
              style={{ borderRadius: '28px' }}
            >
              <Typography variant="bodySmall" style={{ color: theme.palette.neutralVariant[30] }}>
                {type[typeDialogIndex][1]}
              </Typography>
              <Typography variant="bodySmall" style={{ color: theme.palette.neutralVariant[30] }}>
                {type[typeDialogIndex][2]}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </Dialog>
      
      {/* --- module wrapper */}
      <Grid
        container
        direction="column"
        sx={{ pt: 10, px: 3, mb: 1, }}
      >

        {/* NOTE title module */}
        {
          ( index >= 0 && !phaseTitle1 && !phaseTitle2 ) &&
          <>
            <Box width="100%" sx={{ py: 1, mb: 1, border: theme.palette.surface.contrastText, borderStyle: 'hidden hidden solid hidden' }}>
              <Grid
                container
                direction="row"
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="bodyMedium" sx={{ color: theme.palette.neutralVariant[30] }}>
                  你喜歡什麼樣的茶？
                </Typography>
                <Grid item>
                  <Typography variant="bodyLarge" sx={{ color: theme.palette.neutralVariant[30], mr: 1/2}}>
                    {selection.length + 1} /
                  </Typography>
                  <Typography variant="bodySmall" sx={{ color: theme.palette.neutralVariant[30] }}>
                    {db.length}
                  </Typography>
                </Grid>
              </Grid>
            </Box>
            <Grid
              container
              direction="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <Grid item>
                <Grid
                  container
                  direction="row"
                >
                  <Typography variant="displaySmall" sx={{ color: theme.palette.neutralVariant[30] }}>
                    {db[index].name}
                  </Typography>
                  <Typography variant="bodyLarge" sx={{ ml: 1, mt: 1/3, color: theme.palette.neutralVariant[30] }}>
                    {db[index].engName}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Typography variant="bodyLarge" sx={{ mt: 1, mb: 2, color: theme.palette.neutralVariant[30] }}>
              {db[index].description}
            </Typography>
          </>
        }

        {/* NOTE swipe cards module */}
        {
          ( index > 1 && !phaseTitle1 && !phaseTitle2 )&&
          <>
            <Grid
              container
              direction="column"
              width="100%"
              height={cardHeight + 90}
              justifyContent="center"
              alignItems="center"
            >
              {props.map(({ x, y, rot, scale }, i) => (
                <animated.div className={styles.deck} key={i} style={{ x, y, display: x.animation.to > width ? 'none' : 'flex', width: `${cardHeight}px`, height: `${cardHeight}px`, }}>
                  <animated.div
                    {...bind(i)}
                    style={{
                      transform: interpolate([rot, scale], trans),
                      backgroundImage: `url(${cards[i]})`,
                      width: `${cardHeight}px`,
                      height: `${cardHeight}px`,
                    }}
                  />
                </animated.div>
              ))}
            </Grid>
            <Grid
              container
              direction="row"
              justifyContent="flex-start"
              alignItems="center"
              sx={{
                mb: 1
              }}
            >
              <Button color="button" onClick={() => undoSwipe(cards.length - selection.length)}>
                <ReplayIcon sx={{ mr: 1, color: theme.palette.neutralVariant[30] }} />
                復原
              </Button>
            </Grid>
            <Grid
              container
              direction="row"
              width="100%"
            >
              <Box sx={{ height: '64px', width: 0.49, border: theme.palette.neutralVariant[50], borderStyle: 'solid solid solid hidden' }}>
                <Button onClick={() => buttonSwipe(cards.length - selection.length - 1, -1)} color="button" fullWidth sx={{ height: '64px' }}>
                  <CloseIcon sx={{ mr: 1, color: theme.palette.neutralVariant[30] }} />
                  不喜歡
                </Button>
              </Box>
              <Box sx={{ height: '64px', width: 0.49, border: theme.palette.neutralVariant[50], borderStyle: 'solid hidden solid hidden' }}>
                <Button onClick={() => buttonSwipe(cards.length - selection.length - 1, 1)} color="button" fullWidth sx={{ height: '64px' }}>
                  <FavoriteBorderIcon sx={{ mr: 1, color: theme.palette.neutralVariant[30] }} />
                  喜歡
                </Button>
              </Box>
            </Grid>
          </>
        }

        {/* NOTE phase 1 module */}
        {
          ( phaseTitle1 && !phaseTitle2 ) &&
          <Grid
            container
            direction="column"
            sx={{ mt: 12 }}
          >
            <Typography variant="displaySmall" sx={{ color: theme.palette.neutralVariant[30] }}>
              {phase[0][0]}
            </Typography>
            <Typography variant="displaySmall" sx={{ mb: 20, color: theme.palette.neutralVariant[30] }}>
              {phase[0][1]}
            </Typography>
            <Box sx={{ py: 1, pr: 1, mb: 1, border: theme.palette.surfaceVariant.outline, borderStyle: 'hidden hidden solid hidden' }}>
              <Typography variant="bodyMedium" sx={{ color: theme.palette.background.contrastText }}>
                {phase[0][2]}
              </Typography>
            </Box>
            <Typography variant="bodyMedium" sx={{ color: theme.palette.background.contrastText }}>
              {phase[0][3]}
            </Typography>
          </Grid>
        }

        {/* NOTE phase 2 module */}
        {
          ( !phaseTitle1 && phaseTitle2 ) &&
          <Grid
            container
            direction="column"
            sx={{ mt: 12 }}
          >
            <Typography variant="displaySmall" sx={{ color: theme.palette.neutralVariant[30] }}>
              {phase[1][0]}
            </Typography>
            <Typography variant="displaySmall" sx={{ mb: 20, color: theme.palette.neutralVariant[30] }}>
              {phase[1][1]}
            </Typography>
            <Box sx={{ py: 1, pr: 1, mb: 1, border: theme.palette.surfaceVariant.outline, borderStyle: 'hidden hidden solid hidden' }}>
              <Typography variant="bodyMedium" sx={{ color: theme.palette.background.contrastText }}>
                {phase[1][2]}
              </Typography>
            </Box>
            <Typography variant="bodyMedium" sx={{ color: theme.palette.background.contrastText }}>
              {phase[1][3]}
            </Typography>
          </Grid>
        }

      </Grid>

      {/* NOTE multiple choice module */}
      {
          ( index >= 0 && index < 2 && !phaseTitle1 && !phaseTitle2 )&&
          <Grid
            container
            direction="column"
            sx={{
              pt: 12,
              pb: height/16,
              px: 3
            }}
          >
            {multipleChoice[multipleChoiceIndex].map((ele, key) => (
              <Box sx={{ height: '80px', border: theme.palette.neutralVariant[50], borderStyle: 'hidden hidden solid hidden' }}>
                <Button color="button" fullWidth onClick={() => pushSelection(key, -1)} sx={{ height: '80px' }}>
                  <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="titleLarge">
                      {key+1}
                    </Typography>
                    <Typography variant="titleLarge">
                      {ele}
                    </Typography>
                    <ArrowForwardIcon sx={{ color: theme.palette.button }} />
                  </Grid>
                </Button>
              </Box>
            ))}
          </Grid>
        }

        {
          ( phaseTitle1 || phaseTitle2 ) && (
            <img alt="bg" src={background} width={2 * width} />
          )
        }

    </ThemeProvider>
  )
}

export default Game