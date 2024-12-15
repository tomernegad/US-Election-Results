const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  state: { type: String, required: true },
  Trump: { type: Number, required: true },
  Harris: { type: Number, required: true },
  color: { type: String, required: true },
});

module.exports = mongoose.model("Result", ResultSchema);
