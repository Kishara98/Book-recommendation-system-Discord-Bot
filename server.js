const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
dotenv.config();
app.use(cors());

// Middleware to parse JSON
app.use(express.json());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Express Test Application!");
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});

