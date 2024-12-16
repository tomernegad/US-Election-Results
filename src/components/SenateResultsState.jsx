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

  const demWinGif =
    "https://media1.giphy.com/media/KXOKGDNL5dxik2LrpM/giphy.webp?cid=790b7611xrxi3evkue7khshgds65tjw76sb8ib158ib4imnq&ep=v1_gifs_search&rid=giphy.webp&ct=g";
  const demLoseGif =
    "https://media3.giphy.com/media/3LgepdPI3ReXaOJhg7/giphy.webp?cid=ecf05e47060jb9tf1v5togetvm1i7ie37m26n14qhh1107uk&ep=v1_gifs_search&rid=giphy.webp&ct=g";
  const repWinGif =
    "https://media2.giphy.com/media/e3AkpsMjcfHz8d2aqe/giphy.webp?cid=ecf05e47deuczcj7qtiwqm9a9rm0iqeuwkstwyz88ti7kubn&ep=v1_gifs_search&rid=giphy.webp&ct=g";
  const repLoseGif =
    "https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExajFmdXl6d2Z5dG1tOXE5cTFmdXhtempxcXpwMjdjaTBsYWFpbXhxOCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ZT6j8x7KHGpaxT26l/giphy.webp";

  const isDemocraticWinner = results.percentage > results.opponent_percentage;
  const isRepublicanWinner = results.opponent_percentage > results.percentage;

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
            src={isDemocraticWinner ? demWinGif : demLoseGif}
            alt={isDemocraticWinner ? "Democratic Win" : "Democratic Lose"}
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
            src={isRepublicanWinner ? repWinGif : repLoseGif}
            alt={isRepublicanWinner ? "Republican Win" : "Republican Lose"}
            className="result-gif"
          />
        </div>
      </div>
      <Link to="/SenateResults" className="back-to-map-button">
        Go Back to Senate Results
      </Link>
    </div>
  );
}
