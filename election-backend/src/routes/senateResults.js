const express = require("express");
const router = express.Router();
const SenateResult = require("../models/SenateResults");

// GET /api/senate-results?state=StateName
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

    const result = await SenateResult.findOne({ state: stateName });
    console.log(`Query result: ${result}`);

    if (!result) {
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
