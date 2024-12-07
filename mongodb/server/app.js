// Main app

require("dotenv").config();
const express = require("express");

// Enables front end connection
const cors = require("cors");
const app = express();

const PORT = process.env.PORT || 8080;

// Database connection and querying
const dbConnect = require("./db/dbConnect");
const connectionSuccessful = dbConnect();
const queryService = require("./db/queries")

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
});

app.get('/query1', (request, response) => {
    queryService.query1().then((results) => {
      response.status(200).json({results});
    });
});

app.get('/query2', (request, response) => {
    queryService.query2().then((results) => {
      response.status(200).json({results});
    });
});

app.get('/query3', (request, response) => {
    queryService.query3().then((results) => {
      response.status(200).json({results});
    });
});
