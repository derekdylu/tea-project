import React, { useState, useEffect, useRef, useMemo, createRef } from 'react'
import { useNavigate } from "react-router-dom";
import TinderCard from 'react-tinder-card'
import { ThemeProvider } from "@emotion/react";
import { useSpring, animated } from '@react-spring/web'
import theme from '../../Themes/Theme'
import useWindowDimensions from '../../Hooks/useWindowDimensions';
import { calculateGame } from '../../Utils/Axios';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';

import placeholder from '../../Images/placeholder.png';
import cardstack from '../../Images/Card/cardstack.svg';
import background from '../../Images/Card/background.png';

import ReplayIcon from '@mui/icons-material/Replay';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CloseIcon from '@mui/icons-material/Close';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { db } from './Characteristics';

import 蔬菜香 from '../../Images/Card/蔬菜香.png'
import 豆子 from '../../Images/Card/豆子.png'
import 茶色淺 from '../../Images/Card/茶色淺.png'
import 茶色深 from '../../Images/Card/茶色深.png'
import 焙香 from '../../Images/Card/焙香.png'
import 清香 from '../../Images/Card/清香.png'
import 龍眼乾 from '../../Images/Card/龍眼乾.png'
import 無花果乾 from '../../Images/Card/無花果乾.png'
import 熱帶果香 from '../../Images/Card/熱帶果香.png'
import 果香 from '../../Images/Card/果香.png'
import 口感較厚 from '../../Images/Card/口感較厚.png'
import 野薑花 from '../../Images/Card/野薑花.png'
import 柑橘味 from '../../Images/Card/柑橘味.png'
import 薄荷 from '../../Images/Card/薄荷.png'
import 肉桂味 from '../../Images/Card/肉桂味.png'
import 口感濃稠 from '../../Images/Card/口感濃稠.png'
import 甜香 from '../../Images/Card/甜香.png'
import 蜜香 from '../../Images/Card/蜜香.png'
import 中藥味 from '../../Images/Card/中藥味.png'
import 濃郁果香 from '../../Images/Card/濃郁果香.png'
import 果酸 from '../../Images/Card/果酸.png'
import 淡雅花香 from '../../Images/Card/淡雅花香.png'
import 草麥味 from '../../Images/Card/草麥味.png'
import 玄米 from '../../Images/Card/玄米.png'
import 茉莉花 from '../../Images/Card/茉莉花.png'
import 奶香 from '../../Images/Card/奶香.png'
import 花香 from '../../Images/Card/花香.png'
import 青香 from '../../Images/Card/青香.png'
import 收斂感 from '../../Images/Card/收斂感.png'

const images = [
  蔬菜香,
  豆子,
  茶色淺,
  茶色深,
  焙香,
  清香,
  龍眼乾,
  無花果乾,
  熱帶果香,
  果香,
  口感較厚,
  野薑花,
  柑橘味,
  薄荷,
  肉桂味,
  收斂感,
  甜香,
  蜜香,
  中藥味,
  濃郁果香,
  果酸,
  口感濃稠,
  淡雅花香,
  草麥味,
  玄米,
  茉莉花,
  奶香,
  花香,
  青香,
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

const buttonText = [
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

const Game = ({ onChangeIndex, onChangePage }) => {
  const navigate = useNavigate()

  const id = sessionStorage.getItem('id') || '123'

  const { width, height, ratio } = useWindowDimensions()
  const [page, setPage] = useState(0) // 0: phase 1, 1: swipe, 2: phase 2, 3: multiple choice
  const [selection, setSelection] = useState([])
  const [openSnackYes, setOpenSnackYes] = useState(false);
  const [openSnackNo, setOpenSnackNo] = useState(false);
  const [open, setOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  const currentIndexRef = useRef(currentIndex)
  const currentSwipedIndex = useRef(db.length)
  const multipleIndex = useRef(0)

  const canGoBack = currentIndex < db.length - 1
  const canSwipe = currentIndex >= 0

  const [phase1Out, p1OApi] = useSpring(() => ({
    from: { x: 0 },
  }))

  const [phase2Out, p2OApi] = useSpring(() => ({
    from: { x: 0 },
  }))
  
  const phase1FadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  const phase2FadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
  })

  const pushSelection = (input) => {
    let _selection = selection
    _selection.push(input)
    setSelection(_selection)
    console.log("new selection", selection)
    if (page === 3) {
      updateCurrentIndex(currentIndex - 1)
      console.log("new index", currentIndex - 1)
      currentIndexRef.current = currentIndexRef.current - 1
      if ( multipleIndex.current <= 0 ) {
        multipleIndex.current = multipleIndex.current + 1
      }
    }
  }

  const removeSelection = () => {
    let _selection = selection.slice(0,-1)
    setSelection(_selection)
    console.log("new selection", selection)
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
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    if (val === -1) {
      console.log('calculate...')
      localStorage.setItem("selection", selection);
      calculateGame(id, selection).then((res) => {
        console.log(res);
        // NOTE jump to single page info link
        // window.location.replace("http://localhost:3000/");
        navigate("/result");
      }).catch((err) => {
        console.log(err);
      })
      return
    }
    if (val === 1) {
      handlePageChange()
    }
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  // set last direction and decrease current index
  const swiped = (direction, tag, index) => {
    console.log("swiped, index " + index)
    if (index === currentSwipedIndex.current) return
    currentSwipedIndex.current = index
    if (direction === 'right') {
      handleClickSnackYes()
      pushSelection(1)
    }
    if (direction === 'left') {
      handleClickSnackNo()
      pushSelection(0)
    }
    setLastDirection(direction)
    updateCurrentIndex(index - 1)
    onChangeIndex(index - 1)
  }

  const outOfFrame = (name, idx) => {
    console.log(`${name} (${idx}) left the screen!`, currentIndexRef.current)
    // CHECK what does this line of code do below
    if ( currentIndexRef.current >= idx && currentIndexRef.current > 2){
      childRefs[idx].current.restoreCard()
    }
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      console.log("swipe")
      await childRefs[currentIndex].current.swipe(dir) // swipe the card
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    removeSelection()
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    await childRefs[newIndex].current.restoreCard()
  }

  const handlePhase1Out = () => {
    p1OApi.start({
      from: {
        x: 0,
      },
      to: {
        x: -width,
      },
    })
  }

  const handlePhase2Out = () => {
    p2OApi.start({
      from: {
        x: 0,
      },
      to: {
        x: -width,
      },
    })
  }

  async function handlePageChange () {
    if (page === 0) {
      await timeout(2000)
      handlePhase1Out()
      await timeout(200)
      setPage(1)
      onChangePage(1)
      handleDialogOpen()
    }
    if (page === 1) {
      setPage(2)
      onChangePage(2)
      await timeout(2000)
      handlePhase2Out()
      setCurrentIndex(1)
      currentIndexRef.current = 1
      await timeout(200)
      setPage(3)
    }
  }

  useEffect(() => {
    handlePageChange()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Snackbar
        open={openSnackYes}
        onClose={handleCloseSnackYes}
        autoHideDuration={1000}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        TransitionComponent={SlideLeftTransition}
      >
        <Box
          style={{
            position: 'relative',
            top: '300px',
            right: '-7.5px',
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
        autoHideDuration={1500}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        TransitionComponent={SlideRightTransition}
      >
        <Box
          style={{
            position: 'relative',
            top: '300px',
            left: '-7.5px',
            width: '88px',
            height: '144px',
            backgroundColor: theme.palette.surface.main,
            boxShadow: '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3), 0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '0px 300px 300px 0px',
          }}
        >
          <CloseIcon
            style={{ height: '56px', width: '56px', position: 'relative', top: '35%', left: '10%' }}
            sx={{ color: theme.palette.error.main }}
          />
        </Box>
      </Snackbar>

      <Dialog
        open={open}
        onClose={handleClose}
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
        >
          <Typography variant="bodyMedium" style={{ color: theme.palette.neutralVariant[30], textDecoration: "underline" }}>
            如何操作
          </Typography>
          <Typography variant="bodyLarge" sx={{ color: theme.palette.neutralVariant[30], mb: 1, mt: 2}}>
            向右滑動表示喜歡該風味
          </Typography>
          <Typography variant="bodyLarge" sx={{ color: theme.palette.neutralVariant[30], mb: 3}}>
            向右滑動表示不喜歡該風味
          </Typography>
          {/* <img src={placeholder} alt="placeholder" width="278px" /> */}
        </Grid>
        <DialogActions
          sx={{ m: 2 }}
        >
          <Button color="button" onClick={handleClose} autoFocus>我知道了！</Button>
        </DialogActions>
      </Dialog>
      
      {/* --- module wrapper */}
      <Grid
        container
        direction="column"
        sx={{ pt: 16, px: 3 , mb: 1 }}
      >

        {/* NOTE title module */}
        {
          ( currentIndex > -1 && ( page === 1 || page === 3 )) &&
          <>
            <Box width="100%" sx={{ py: 1, pr: 1, mb: 1, border: theme.palette.surface.contrastText, borderStyle: 'hidden hidden solid hidden' }}>
              <Typography variant="bodyMedium" sx={{ color: theme.palette.neutralVariant[30] }}>
                你喜歡什麼樣的茶？
              </Typography>
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
                    {db[currentIndex].name}
                  </Typography>
                  <Typography variant="bodyLarge" sx={{ ml: 1, mt: 1/3, color: theme.palette.neutralVariant[30] }}>
                    {db[currentIndex].engName}
                  </Typography>
                </Grid>
              </Grid>
              <IconButton onClick={() => goBack()}>
                <ReplayIcon sx={{ color: theme.palette.neutralVariant[30] }} />
              </IconButton>
            </Grid>
          </>
        }

        {/* NOTE swipe cards module */}
        {
          page === 1 &&
          <>
            <div className='cardContainer' >
              <Grid
                container
                direction='column'
                alignItems='center'
                justifyContent='center'
                sx={{ mt: 3, mb: 6, p: 2 }}
                style={{ backgroundImage: 'url(' + cardstack + ')', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: '350px' }}
              >
                <TinderCard
                  className='swipe'
                  ref={childRefs[currentIndex]}
                  key={db[currentIndex].name}
                  onSwipe={(dir) => swiped(dir, db[currentIndex].name, currentIndex)}
                  onCardLeftScreen={() => outOfFrame(db[currentIndex].name, currentIndex)}
                  swipeRequirementType={'position'}
                  swipeThreshold={width-100}
                  preventSwipe={['up', 'down']}
                >
                  {/* linear-gradient(#FEFCF499, #FEFCF499),  */}
                  {/* style={{ background: 'url(' + db[currentIndex].img + ')' , height: '300px' , width: '300px' , borderRadius: '60px', border: '1.25px solid #45483D'}} */}
                  <div
                    style={{ background: 'url(' + images[currentIndex - 2] + ')' , backgroundSize: '300px 300px' , height: '300px' , width: '300px' , borderRadius: '60px', border: '1.25px solid #45483D'}}
                    className='card'
                  >
                  </div>
                </TinderCard>
              </Grid>
            </div>
            <Grid
              container
              direction="row"
              width="100%"
            >
              <Box sx={{ height: '64px', width: 0.49, border: theme.palette.neutralVariant[50], borderStyle: 'solid solid solid hidden' }}>
                <Button color="button" fullWidth onClick={() => swipe('left')} sx={{ height: '64px' }}>
                  <CloseIcon sx={{ color: theme.palette.neutralVariant[30] }} />
                </Button>
              </Box>
              <Box sx={{ height: '64px', width: 0.49, border: theme.palette.neutralVariant[50], borderStyle: 'solid hidden solid hidden' }}>
                <Button color="button" fullWidth onClick={() => swipe('right')} sx={{ height: '64px' }}>
                  <FavoriteBorderIcon sx={{ color: theme.palette.neutralVariant[30] }} />
                </Button>
              </Box>
            </Grid>
          </>
        }

        {/* NOTE phase 1 module */}
        {
          page === 0 &&
          <animated.div style={{ ...phase1FadeIn, ...phase1Out }}>
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
          </animated.div>
        }

        {/* NOTE phase 2 module */}
        {
          page === 2 &&
          <animated.div style={{ ...phase2FadeIn, ...phase2Out }}>
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
          </animated.div>
        }

      </Grid>

      {/* NOTE multiple choice module */}
      {
          page === 3 &&
          <Grid
            container
            direction="column"
            sx={{
              px: 3
            }}
            style={{
              bottom: '96px',
              position: 'fixed',
            }}
          >
            {buttonText[multipleIndex.current].map((ele, key) => (
              <Box sx={{ height: '80px', border: theme.palette.neutralVariant[50], borderStyle: 'hidden hidden solid hidden' }}>
                <Button color="button" fullWidth onClick={() => pushSelection(key)} sx={{ height: '80px' }}>
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
          ( page === 0 || page === 2 ) && (
            <img alt="bg" src={background} width={2 * width} />
          )
        }
    </ThemeProvider>
  )
}

export default Game