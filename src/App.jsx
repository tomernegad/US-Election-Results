import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Homepage from "./components/Homepage";
import AboutPage from "./components/AboutPage";
import PresidentialResultsPage from "./components/PresidentialResultsPage";
import PresidentialResultsStatePage from "./components/PresidentialResultsStatePage";
import SenateResults from "./components/SenateResults";

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
              <Link to="/PresidentialResults">Presidential Results</Link>
            </li>
            <li>
              <Link to="/SenateResults">Senate Results</Link>
            </li>
            <li>
              <Link to="/About">About</Link>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/" exact element={<Homepage />} />
          <Route path="/About" element={<AboutPage />} />
          <Route
            path="/PresidentialResults"
            element={<PresidentialResultsPage />}
          />
          <Route
            path="/state/:stateName"
            element={<PresidentialResultsStatePage />}
          />
          <Route path="/SenateResults" element={<SenateResults />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
