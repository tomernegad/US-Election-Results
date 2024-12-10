import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Homepage from "./components/HomePage";
import AboutPage from "./components/AboutPage";
import MapPage from "./components/MapPage";
import StateResults from "./components/StateResults";
import "./App.css";
function App() {
  return (
    <div>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">HomePage</Link>
            </li>
            <li>
              <Link to="/Map">Map</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/About" element={<AboutPage />} />
          <Route path="/Map" element={<MapPage />} />
          <Route path="/state/:stateName" element={<StateResults />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;
