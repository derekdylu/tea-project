import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/home";
import { Live } from "./pages/live";
import { Anim } from "./pages/anim";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/home" element={ <Home/> } />
          <Route path="/live" element={ <Live/> } />
          <Route path="/anim" element={ <Anim/> } />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
