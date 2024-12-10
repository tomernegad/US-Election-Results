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

  return (
    <div className="results-container">
      <h1>Election Results for {stateName}</h1>
      <p>Trump Votes: {results.Trump}%</p>
      <p>Harris Votes: {results.Harris}%</p>
      <Link to="/Map" className="back-to-map-button">
        Back to Map
      </Link>
    </div>
  );
}
