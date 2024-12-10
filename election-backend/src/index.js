const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const resultsRouter = require("./routes/results");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
const dbUri =
  "mongodb+srv://project_elections:elections@electionsresults.80eq5.mongodb.net/electionResults?retryWrites=true&w=majority";
mongoose
  .connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/election-results", resultsRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});