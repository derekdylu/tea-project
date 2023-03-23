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
      <Router>
        <Routes>
          {/* mobile */}
          <Route path="/game" element={<Wrapper />} forceRefresh={true} />
          <Route path="*" element={<Error />} />
          <Route path="/" element={ <StartPage/> } />
          {/* <Route path="/start" element={ <StartPage/> } /> */}
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