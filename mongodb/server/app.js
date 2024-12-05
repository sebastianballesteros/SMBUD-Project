// Main app

require("dotenv").config();
const express = require("express");

// Enables front end connection
const cors = require("cors");
const app = express();
//app.use(morgan('dev'));

const PORT = process.env.PORT || 8080;

// Database connection
const dbConnect = require("./db/dbConnect");
const connectionSuccessful = dbConnect();

app.use(
  cors({
    origin: "*",
  })
);
app.use(express.json());

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send('Something broke!')
});

if (process.env.NODE_ENV === "test") {
  module.exports = app;
} else {
  app.listen(PORT, function () {
    console.log(`Server listening on port ${PORT}!`);
  });
}

app.get('/', (request, response) => {
  if (connectionSuccessful)
    response.status(200).json("Successfully connected to mongoDB");
  else
    response.status(200).json("Could not connect to mongoDB");
})
