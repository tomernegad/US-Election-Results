import express from "express";
const express = require("express");
const router = express.Router();
const Result = require("../models/Result");

// GET /api/election-results?state=StateName
router.get("/", async (req, res) => {
  try {
    const stateName = req.query.state;
    console.log(`Querying for state: ${stateName}`);

    // Check if stateName is defined
    if (!stateName) {
      return res
        .status(400)
        .json({ message: "State query parameter is required" });
    }

    const result = await Result.findOne({ state: stateName });
    console.log(`Query result: ${result}`);

    if (!result) {
      return res.status(404).json({ message: "State not found" });
    }

    // Directly use the numeric values
    const parsedResult = {
      state: result.state,
      Trump: result.Trump,
      Harris: result.Harris,
    };
    res.json(parsedResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
