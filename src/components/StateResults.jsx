import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
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
      <Link to="/Map" className="back-to-map-button">
        Back to Map
      </Link>
    </div>
  );
}
