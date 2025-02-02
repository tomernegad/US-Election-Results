import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import axios from "axios";
import "./PresidentialResultsPage.css";

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

const trumpStates = [
  "Alabama",
  "Alaska",
  "Arizona",
  "Arkansas",
  "Florida",
  "Georgia",
  "Idaho",
  "Indiana",
  "Iowa",
  "Kansas",
  "Kentucky",
  "Louisiana",
  "Maine's 2nd Congressional District",
  "Michigan",
  "Mississippi",
  "Missouri",
  "Montana",
  "Nebraska",
  "North Carolina",
  "North Dakota",
  "Ohio",
  "Oklahoma",
  "Pennsylvania",
  "South Carolina",
  "South Dakota",
  "Tennessee",
  "Texas",
  "Utah",
  "West Virginia",
  "Wisconsin",
  "Wyoming",
];

const harrisStates = [
  "California",
  "Colorado",
  "Connecticut",
  "Delaware",
  "Hawaii",
  "Illinois",
  "Maine",
  "Maryland",
  "Massachusetts",
  "Minnesota",
  "Nevada",
  "New Hampshire",
  "New Jersey",
  "New Mexico",
  "New York",
  "Oregon",
  "Rhode Island",
  "Vermont",
  "Virginia",
  "Washington",
  "Washington, D.C.",
];

export default function PresidentialResultsPage() {
  const navigate = useNavigate();
  const [stateResults, setStateResults] = useState({});

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/election-results"
        );
        const results = response.data.reduce((acc, result) => {
          acc[result.state] = result;
          return acc;
        }, {});
        setStateResults(results);
      } catch (error) {
        console.error("Error fetching election results:", error);
      }
    };

    fetchResults();
  }, []);

  const handleStateClick = (stateName) => {
    navigate(`/state/${stateName}`);
  };

  const getStateColor = (stateName) => {
    if (trumpStates.includes(stateName)) return "#FF0000"; // Red for Trump
    if (harrisStates.includes(stateName)) return "#0000FF"; // Blue for Harris
    return "#D6D6DA"; // Default color if no result
  };

  const getHoverColor = (stateName) => {
    if (trumpStates.includes(stateName)) return "#FF0000"; // Red for Trump
    if (harrisStates.includes(stateName)) return "#0000FF"; // Blue for Harris
    return "#D6D6DA"; // Default color if no result
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
                onMouseEnter={() => {
                  const stateName = geo.properties.name;
                  console.log(`Hovering over ${stateName}`);
                }}
                onMouseLeave={() => {
                  const stateName = geo.properties.name;
                  console.log(`Leaving ${stateName}`);
                }}
                style={{
                  default: {
                    fill: getStateColor(geo.properties.name),
                    outline: "none",
                  },
                  hover: {
                    fill: getHoverColor(geo.properties.name),
                    outline: "none",
                  },
                  pressed: {
                    fill: getHoverColor(geo.properties.name),
                    outline: "none",
                  },
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
