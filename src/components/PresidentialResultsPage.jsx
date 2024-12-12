import React from "react";
import { useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";

import "./PresidentialResultsPage.css";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export default function PresidentialResultsPage() {
  const navigate = useNavigate();

  const handleStateClick = (stateName) => {
    navigate(`/state/${stateName}`);
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
                    fill: "#D6D6DA",
                    outline: "none",
                  },
                  hover: { fill: "#90EE90", outline: "none" },
                  pressed: { fill: "#90EE90", outline: "none" },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
