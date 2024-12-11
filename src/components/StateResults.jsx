import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./StateResults.css";

export default function StateResults() {
  const { stateName } = useParams();
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        console.log(`Fetching results for state: ${stateName}`);
        const response = await axios.get(
          `http://localhost:5000/api/election-results?state=${stateName}`
        );
        console.log("Response data:", response.data);
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching election results:", error);
      }
    };

    fetchResults();
  }, [stateName]);

  if (!results) {
    return <div>Loading...</div>;
  }

  const trumpGif =
    "https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3RxZjR0OWp0aWo3cGxiZHowdmt5YWN3ZWtoNmh6cThrOXl3bGVuNSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qOLT5C2SxNINSREyx9/200.webp";
  const harrisGif =
    "https://media3.giphy.com/media/Hi0scxlr9BM7znd3Wy/200.webp?cid=ecf05e472ln3ry7mks3dthw4ukq8jvb94yqlhvt4y5ghenjp&ep=v1_gifs_search&rid=200.webp&ct=g";

  const getStateColor = () => {
    return results.Trump > results.Harris ? "red" : "blue";
  };

  const stateCoordinates = {
    Alabama: [32.806671, -86.79113],
    Alaska: [61.370716, -152.404419],
    Arizona: [33.729759, -111.431221],
    Arkansas: [34.969704, -92.373123],
    California: [36.778259, -119.417931],
    Colorado: [39.550051, -105.782067],
    Connecticut: [41.603221, -73.087749],
    Delaware: [38.910832, -75.52767],
    Florida: [27.994402, -81.760254],
    Georgia: [32.165622, -82.900075],
    Hawaii: [19.896766, -155.582782],
    Idaho: [44.068203, -114.742043],
    Illinois: [40.633125, -89.398528],
    Indiana: [40.551217, -85.602364],
    Iowa: [41.878003, -93.097702],
    Kansas: [39.011902, -98.484246],
    Kentucky: [37.839333, -84.270018],
    Louisiana: [30.984298, -91.962333],
    Maine: [45.253783, -69.445469],
    Maryland: [39.045755, -76.641271],
    Massachusetts: [42.407211, -71.382437],
    Michigan: [44.314844, -85.602364],
    Minnesota: [46.729553, -94.6859],
    Mississippi: [32.354668, -89.398528],
    Missouri: [37.964253, -91.831833],
    Montana: [46.879682, -110.362566],
    Nebraska: [41.492537, -99.901813],
    Nevada: [38.80261, -116.419389],
    New_Hampshire: [43.193852, -71.572395],
    New_Jersey: [40.058324, -74.405661],
    New_Mexico: [34.51994, -105.87009],
    New_York: [40.712776, -74.005974], // Corrected coordinates
    North_Carolina: [35.759573, -79.0193],
    North_Dakota: [47.551493, -101.002012], // Corrected coordinates
    Ohio: [40.417287, -82.907123],
    Oklahoma: [35.007752, -97.092877],
    Oregon: [43.804133, -120.554201],
    Pennsylvania: [41.203322, -77.194525],
    Rhode_Island: [41.580095, -71.477429],
    South_Carolina: [33.836081, -81.163725],
    South_Dakota: [44.5, -100.0], // Corrected coordinates
    Tennessee: [35.517491, -86.580447],
    Texas: [31.968599, -99.901813],
    Utah: [39.32098, -111.093731],
    Vermont: [44.558803, -72.577841],
    Virginia: [37.431573, -78.656894],
    Washington: [47.751074, -120.740139],
    West_Virginia: [38.597626, -80.454903],
    Wisconsin: [43.78444, -88.787868],
    Wyoming: [43.075968, -107.290284],
  };

  const formatStateName = (name) => {
    return name.replace(/ /g, "_");
  };

  return (
    <div className="results-container">
      <h1>Election Results for {stateName}</h1>
      <p>Trump Votes: {results.Trump}%</p>
      <p>Harris Votes: {results.Harris}%</p>
      <div className="gif-container">
        <img
          src={results.Trump > results.Harris ? trumpGif : harrisGif}
          alt={results.Trump > results.Harris ? "Trump GIF" : "Harris GIF"}
          className="results-gif"
        />
      </div>
      <div className="state-map-container">
        <MapContainer
          center={stateCoordinates[formatStateName(stateName)]}
          zoom={6}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker position={stateCoordinates[formatStateName(stateName)]}>
            <Popup>
              <strong>{stateName}</strong>
              <br />
              Trump Votes: {results.Trump}%<br />
              Harris Votes: {results.Harris}%
            </Popup>
          </Marker>
        </MapContainer>
      </div>
      <Link to="/Map" className="back-to-map-button">
        Back to Map
      </Link>
    </div>
  );
}
