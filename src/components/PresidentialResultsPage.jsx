import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import axios from "axios";
import "./PresidentialResultsPage.css";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export default function PresidentialResultsPage() {
  const navigate = useNavigate();
  const [stateResults, setStateResults] = useState({});

  const handleStateClick = (stateName) => {
    navigate(`/state/${stateName}`);
  };

  const getStateColor = (stateName) => {
    const result = stateResults[stateName];
    if (!result) return "#D6D6DA"; // Default color if no result
    return result.color; // Use the color field from the result
  };

  return (
    <div className="map-container">
      <h1>USA Presidential Election Map</h1>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => handleStateClick(geo.properties.name)}
                style={{
                  default: {
                    fill: getStateColor(geo.properties.name),
                    outline: "none",
                  },
                  hover: { fill: "#F53", outline: "none" },
                  pressed: { fill: "#E42", outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
