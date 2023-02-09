import React, { useState, useEffect, useRef, useMemo, createRef } from 'react'
import TinderCard from 'react-tinder-card'

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Snackbar, { SnackbarOrigin } from '@mui/material/Snackbar';
import Slide, { SlideProps } from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

import placeholder from '../Images/placeholder.png';
import cardstack from '../Images/cardstack.svg';

import ReplayRoundedIcon from '@mui/icons-material/ReplayRounded';
import FavoriteBorderRoundedIcon from '@mui/icons-material/FavoriteBorderRounded';
import FavoriteRoundedIcon from '@mui/icons-material/FavoriteRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function SlideLeftTransition(props: SlideProps) {
  return <Slide {...props} direction="left" />;
}

function SlideRightTransition(props: SlideProps) {
  return <Slide {...props} direction="right" />;
}

const db = [
  {
    name: '草麥味',
    engName: 'Wheat',
    img: 'https://cdn.britannica.com/80/157180-050-7B906E02/Heads-wheat-grains.jpg'
  },
  {
    name: '玄米味',
    engName: 'Brown Rice',
    img: 'https://hips.hearstapps.com/hmg-prod/images/brown-rice-vs-white-rice-royalty-free-image-1670260714.jpg'
  },
  {
    name: '茉莉香',
    engName: 'Jasmine',
    img: 'https://gilmour.com/wp-content/uploads/2019/05/Jasmine-Care.jpg'
  },
  {
    name: '奶香',
    engName: 'Milk',
    img: 'https://i0.wp.com/post.healthline.com/wp-content/uploads/2019/11/milk-soy-hemp-almond-non-dairy-1296x728-header-1296x728.jpg?w=1155&h=1528'
  },
  {
    name: '花香',
    engName: 'Floral',
    img: 'https://images.unsplash.com/photo-1559759708-d6e99b50f0e9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8ZmxvcmFsJTIwZGVzaWdufGVufDB8fDB8fA%3D%3D&w=1000&q=80'
  },
  {
    name: '青香',
    engName: 'Grass',
    img: 'https://tg-cdn.azureedge.net/sites/default/files/images/paragraph/italrb/easy_guide_grass.jpg'
  }
]

const Game = ({ onChangeIndex }) => {
  const [selection, setSelection] = useState([])
  const [openSnackYes, setOpenSnackYes] = useState(false);
  const [openSnackNo, setOpenSnackNo] = useState(false);

  const pushSelection = (input) => {
    let _selection = selection
    _selection.push(input)
    setSelection(_selection)
    console.log("new selection", selection)
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

  const [open, setOpen] = useState(false);

  const handleDialogOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  useEffect(() => {
    handleDialogOpen()
  }, [])

  const [currentIndex, setCurrentIndex] = useState(db.length - 1)
  const [lastDirection, setLastDirection] = useState()
  // used for outOfFrame closure
  const currentIndexRef = useRef(currentIndex)

  const childRefs = useMemo(
    () =>
      Array(db.length)
        .fill(0)
        .map((i) => createRef()),
    []
  )

  const updateCurrentIndex = (val) => {
    setCurrentIndex(val)
    currentIndexRef.current = val
  }

  const canGoBack = currentIndex < db.length - 1
  const canSwipe = currentIndex >= 0

  // set last direction and decrease current index
  const swiped = (direction, nameToDelete, index) => {
    console.log("swiped")
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
    // handle the case in which go back is pressed before card goes outOfFrame
    currentIndexRef.current >= idx && childRefs[idx].current.restoreCard()
    // TODO: when quickly swipe and restore multiple times the same card,
    // it happens multiple outOfFrame events are queued and the card disappear
    // during latest swipes. Only the last outOfFrame event should be considered valid
  }

  const swipe = async (dir) => {
    if (canSwipe && currentIndex < db.length) {
      console.log("swipe")
      await childRefs[currentIndex].current.swipe(dir) // Swipe the card!
    }
  }

  // increase current index and show card
  const goBack = async () => {
    if (!canGoBack) return
    removeSelection()
    const newIndex = currentIndex + 1
    updateCurrentIndex(newIndex)
    // await childRefs[newIndex].current.restoreCard()
  }

  return (
    <div>
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
            backgroundColor: ' #FEFCF4',
            boxShadow: '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3), 0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '300px 0px 0px 300px',
          }}
        >
          <FavoriteRoundedIcon
            style={{ height: '56px', width: '56px', position: 'relative', top: '35%', left: '25%' }}
            sx={{ color: '#006A65' }}
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
            backgroundColor: ' #FEFCF4',
            boxShadow: '0px 8px 12px 6px rgba(0, 0, 0, 0.15), 0px 4px 4px rgba(0, 0, 0, 0.3), 0px 4px 4px rgba(0, 0, 0, 0.25)',
            borderRadius: '0px 300px 300px 0px',
          }}
        >
          <CloseRoundedIcon
            style={{ height: '56px', width: '56px', position: 'relative', top: '35%', left: '10%' }}
            sx={{ color: '#BA1A1A' }}
          />
        </Box>
      </Snackbar>

      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          style: { backgroundColor: '#FEFCF4', borderRadius: 28 }
        }}
      >
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          sx={{ px: 3, pt: 3 }}
        >
          <Typography variant="body" style={{ textDecoration: "underline" }}>
            如何操作
          </Typography>
          <Typography variant="h6" sx={{ mb: 3, mt: 2}}>
            向右滑動表示喜歡
          </Typography>
          <img src={placeholder} alt="placeholder" width="278px" />
        </Grid>
        <DialogActions
          sx={{ m: 2 }}
        >
          <Button onClick={handleClose}>上一步</Button>
          <Button onClick={handleClose} autoFocus>下一步</Button>
        </DialogActions>
      </Dialog>

      <Grid
        container
        direction="column"
        sx={{ mt: 4, px: 3 }}
      >
        <Box sx={{ py: 1, pr: 1, mb: 1, border: '#48473C', borderStyle: 'hidden hidden solid hidden' }}>
        {/* color to theme */}
          <Typography variant="body">
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
              <Typography variant="h3">
                {db[currentIndex].name}
              </Typography>
              <Typography variant="body0" sx={{ml: 1, mt: 1/3}}>
                {db[currentIndex].engName}
              </Typography>
            </Grid>
          </Grid>
          <IconButton color="primary" onClick={() => goBack()}>
            <ReplayRoundedIcon />
          </IconButton>
        </Grid>

        <div className='cardContainer'>
          <Grid
            container
            direction='column'
            alignItems='center'
            justifyContent='center'
            sx={{ mt: 3, mb: 6, p: 2 }}
            style={{ backgroundImage: 'url(' + cardstack + ')', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', backgroundSize: 'cover' }}
          >
            <TinderCard
              ref={childRefs[currentIndex]}
              className='swipe'
              key={db[currentIndex].name}
              onSwipe={(dir) => swiped(dir, db[currentIndex].name, currentIndex)}
              onCardLeftScreen={() => outOfFrame(db[currentIndex].name, currentIndex)}
            >
              <div
                style={{ backgroundImage: 'url(' + db[currentIndex].img + ')' , height: '300px' , width: '300px' , borderRadius: '60px', border: '1px solid #45483D'}}
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
          <Box sx={{ height: '64px', width: 0.49, border: '#79786A', borderStyle: 'solid solid solid hidden' }}>
            <Button fullWidth onClick={() => swipe('left')} sx={{ height: '64px' }}>
              <CloseRoundedIcon />
            </Button>
          </Box>
          <Box sx={{ height: '64px', width: 0.49, border: '#79786A', borderStyle: 'solid hidden solid hidden' }}>
            <Button fullWidth onClick={() => swipe('right')} sx={{ height: '64px' }}>
              <FavoriteBorderRoundedIcon />
            </Button>
          </Box>
        </Grid>

      </Grid>
      
    </div>
  )
}

export default Game