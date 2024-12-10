const mongoose = require("mongoose");

const ResultSchema = new mongoose.Schema({
  state: { type: String, required: true },
  Trump: { type: mongoose.Schema.Types.Mixed, required: true },
  Harris: { type: mongoose.Schema.Types.Mixed, required: true },
});

module.exports = mongoose.model("Result", ResultSchema);
