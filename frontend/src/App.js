import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Wrapper from './Components/Game/Wrapper';
import Wall from './Components/Wall/Wall';
import Error from './Containers/Error';

import { NavBar } from "./Components/NavBar";
import { StartPage } from "./Components/StartPage";
import { Live } from "./Containers/Live";
import { Result } from "./Containers/Result";
import { Map } from "./Components/Map";
import { Share } from './Components/Share';

function App() {

  return (
    <div>
      {/* TODO page for bigger screen doesn't need this vertical restriction */}
      {/* <Dialog aria-labelledby="window-size" open={open} fullScreen>
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
        </Dialog> */}
      <Router>
        <Routes>
          {/* mobile */}
          <Route path="/game" element={<Wrapper />} forceRefresh={true} />
          <Route path="*" element={<Error />} />
          <Route path="/" element={ <StartPage/> } />
          <Route path="/start" element={ <StartPage/> } />
          <Route path="/live" element={ <Live/> } />
          <Route path="/result" element={ <Result/> } />
          <Route path="/map" element={ <Map/> } />
          <Route path="/share" element={ <Share/> } />
          <Route path="/wall" element={ <Wall /> } />
          <Route path="/live" element={ <Live/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;