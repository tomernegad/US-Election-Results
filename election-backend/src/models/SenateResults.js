import mongoose from "mongoose";
const mongoose = require("mongoose");

const SenateResultSchema = new mongoose.Schema({
  state: { type: String, required: true },
  senator: { type: String, required: true },
  party: { type: String, required: true },
  percentage: { type: Number, required: true },
  opponent: { type: String, required: true },
  opponent_party: { type: String, required: true },
  opponent_percentage: { type: Number, required: true },
});

module.exports = mongoose.model(
  "SenateResult",
  SenateResultSchema,
  "SenateResults"
);
