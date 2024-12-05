// Main app

require("dotenv").config();
const express = require("express");

// Enables front end connection
const cors = require("cors");

const app = express();

//app.use(morgan('dev'));

const PORT = process.env.PORT || 8080;

// Database connection
if (process.env.NODE_ENV != "test") {
  const dbConnect = require("./db/dbConnect");
  //dbConnect();
}

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
  //response.send('Hello from the backend')
  response.status(200).json("Hello from the backend");
})
