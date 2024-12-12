import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "./SenateResultsState.css";

export default function SenateResultsState() {
  const { stateName } = useParams();
  const [results, setResults] = useState(null);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        console.log(`Fetching results for state: ${stateName}`);
        const response = await axios.get(
          `http://localhost:5000/api/senate-results?state=${stateName}`
        );
        console.log("Response data:", response.data);
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching senate results:", error);
      }
    };

    fetchResults();
  }, [stateName]);

  if (!results) {
    return <div>Loading...</div>;
  }

  const winGif = "https://media.giphy.com/media/3o6Zt481isNVuQI1l6/giphy.gif";
  const loseGif = "https://media.giphy.com/media/3o6Zt8LdG9p0kz4F7y/giphy.gif";

  const isDemocraticWinner = results.party === "Democratic";

  return (
    <div className="results-container">
      <h1>Senate Results for {stateName}</h1>
      <div className="candidates-container">
        <div className="candidate democratic">
          <h2>Democratic</h2>
          <p>
            Senator:{" "}
            {results.party === "Democratic"
              ? results.senator
              : results.opponent}
          </p>
          <p>
            Percentage:{" "}
            {results.party === "Democratic"
              ? results.percentage
              : results.opponent_percentage}
            %
          </p>
          <img
            src={isDemocraticWinner ? winGif : loseGif}
            alt={isDemocraticWinner ? "Win" : "Lose"}
            className="result-gif"
          />
        </div>
        <div className="candidate republican">
          <h2>Republican</h2>
          <p>
            Senator:{" "}
            {results.party === "Republican"
              ? results.senator
              : results.opponent}
          </p>
          <p>
            Percentage:{" "}
            {results.party === "Republican"
              ? results.percentage
              : results.opponent_percentage}
            %
          </p>
          <img
            src={!isDemocraticWinner ? winGif : loseGif}
            alt={!isDemocraticWinner ? "Win" : "Lose"}
            className="result-gif"
          />
        </div>
      </div>
      <Link to="/SenateResults" className="back-to-map-button">
        Back to Senate Results
      </Link>
    </div>
  );
}
