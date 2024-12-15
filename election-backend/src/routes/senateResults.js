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

    if (!stateName) {
      console.log("State query parameter is required");
      return res
        .status(400)
        .json({ message: "State query parameter is required" });
    }

    console.log(`Querying for state: ${stateName}`);

    const result = await SenateResult.findOne({ state: stateName });
    console.log(`Query result for state ${stateName}: ${result}`);

    if (!result) {
      console.log("State not found");
      return res.status(404).json({ message: "State not found" });
    }

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
