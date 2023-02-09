import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import useWindowDimensions from './Hooks/useWindowDimensions';

import Dialog from '@mui/material/Dialog';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import GameContainer from './Containers/GameContainer'
import Error from './Containers/Error'

import { StartPage } from "./Components/StartPage";
import { Live } from "./Containers/Live";
import { Anim } from "./Containers/Anim";
import { Map } from "./Containers/Map";

function App() {
  const { width, height, ratio } = useWindowDimensions()
  const [open, setOpen] = useState(false);
  const [narrow, setNarrow] = useState(false);

  useEffect(() => {
    
    if (width < 320) {
      setNarrow(true)
      setOpen(true)
      return
    } else {
      if (ratio > 1) {
        setNarrow(false)
        setOpen(true)
        return
      } else {
        setNarrow(false)
        setOpen(false)
        return
      }
    }
  }, [ratio])

  return (
    <div>
    {/* TODO page for bigger screen doesn't need this vertical restriction */}
      <Dialog aria-labelledby="window-size" open={open} fullScreen>
          <Grid container direction="column" alignItems="center" justifyContent="center" sx={{ my: 1 }} height="100%">
            {
              narrow ?
              (
                <Typography variant="body2" color="#2D3748" fontWeight="500" sx={{mt: 2.5}} align="center">
                  最小螢幕寬度 320 px
                </Typography>
              ):(
                <>
                  <Typography variant="h6" color="#2D3748" fontWeight="700" sx={{mt: 2.5}} align="center">
                    豎直手機螢幕或瀏覽器視窗以享受最佳遊戲體驗
                  </Typography>
                </>
              )
            }
          </Grid>
        </Dialog>
        <Router>
          <Routes>

            <Route path="/game" element={<GameContainer />} forceRefresh={true} />
            <Route path="*" element={<Error />} />

            <Route path="/" element={ <StartPage/> } />
            <Route path="/start" element={ <StartPage/> } />
            <Route path="/live" element={ <Live/> } />
            <Route path="/anim" element={ <Anim/> } />
            <Route path="/map" element={ <Map/> } />

          </Routes>
        </Router>
    </div>
  );
}

export default App;
