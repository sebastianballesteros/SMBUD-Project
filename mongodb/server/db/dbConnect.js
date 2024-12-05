// Database set up
const mongoose = require("mongoose");
require("dotenv").config();

async function dbConnect() {
  // use mongoose to connect this app to our database on mongoDB using the DB_URL (connection string)
  mongoose
    .connect(process.env.DB_URL)
    .then(() => {
      console.log("Successfully connected to mongo.");
      return true
    })
    .catch((error) => {
      console.log("Unable to connect to mongo.");
      console.error(error);
      return false
    });
};

module.exports = dbConnect;
