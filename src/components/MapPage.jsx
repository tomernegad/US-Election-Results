import React from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import axios from "axios";
import "./MapPage.css";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

export default function MapPage() {
  const handleStateClick = async (stateName) => {
    try {
      const response = await axios.get(
        `/api/election-results?state=${stateName}`
      );
      console.log(response.data); // Handle the response data as needed
    } catch (error) {
      console.error("Error fetching election results:", error);
    }
  };

  return (
    <div className="map-container">
      <h1>USA Election Map</h1>
      <ComposableMap projection="geoAlbersUsa">
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                onClick={() => handleStateClick(geo.properties.name)}
                style={{
                  default: { fill: "#D6D6DA", outline: "none" },
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
