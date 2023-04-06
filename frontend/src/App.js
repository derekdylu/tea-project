import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Wrapper from './Components/Game/Wrapper';
import Wall from './Components/Wall/Wall';
import Error from './Containers/Error';
import About from './Containers/About';

import { StartPage } from "./Components/StartPage";
import { Live } from "./Containers/Live";
import { Result } from "./Containers/Result";
import { Video } from "./Containers/Video"

function App() {

  return (
    <div>
      <Router>
        <Routes>
          {/* mobile */}
          <Route path="/game" element={<Wrapper />} forceRefresh={true} />
          <Route path="*" element={<Error />} />
          <Route path="/" element={ <StartPage/> } />
          <Route path="/result" element={ <Result/> } />
          <Route path="/wall" element={ <Wall /> } />
          <Route path="/live" element={ <Live/> } />
          <Route path="/about" element={ <About/> } />
          <Route path="/video" element={ <Video/> } />
        </Routes>
      </Router>
    </div>
  );
}

export default App;