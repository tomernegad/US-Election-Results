import express from "express";
const express = require("express");
const router = express.Router();
const SenateResult = require("../models/SenateResults");

// GET /api/senate-results?state=StateName
router.get("/", async (req, res) => {
  try {
    const stateName = req.query.state;
    console.log(
      `Received request for state: ${stateName} at ${new Date().toISOString()}`
    );

    // Check if stateName is defined
    if (!stateName) {
      console.log("State query parameter is required");
      return res
        .status(400)
        .json({ message: "State query parameter is required" });
    }

    // Log the state name before querying
    console.log(`Querying for state: ${stateName}`);

    const result = await SenateResult.findOne({ state: stateName });
    console.log(`Query result for state ${stateName}: ${result}`);

    if (!result) {
      console.log("State not found");
      return res.status(404).json({ message: "State not found" });
    }

    // Enhanced response
    const parsedResult = {
      state: result.state,
      senator: result.senator,
      party: result.party,
      percentage: result.percentage,
      opponent: result.opponent,
      opponent_party: result.opponent_party,
      opponent_percentage: result.opponent_percentage,
    };
    res.json(parsedResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
