import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StartPage } from "./Components/StartPage";
import { Live } from "./Containers/Live";
import { Anim } from "./Containers/Anim";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <StartPage/> } />
          <Route path="/start" element={ <StartPage/> } />
          <Route path="/live" element={ <Live/> } />
          <Route path="/anim" element={ <Anim/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
