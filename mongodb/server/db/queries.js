const {MongoClient} = require("mongodb");
require("dotenv").config();

// Connect to the database and find collection
const client = new MongoClient(process.env.DB_URL);
const database = client.db("developers");
const Developers = database.collection("Developers");


// Query 1
module.exports.query1 = async () => {

  // Define query
  query = {
    Country: "Italy",
    MainBranch: "I code primarily as a hobby",
    Age: "18-24 years old",
  }

  return await Developers.find(query).toArray((error, documents) => {
    return documents
  });
}

// Query 2
module.exports.query2 = async () => {

  // People learning to code in the USA that work remotely and have a job satisfacion <= 3
  query = {
    Country: "United States of America",
    MainBranch: "I am learning to code",
    RemoteWork: "Remote",
    JobSat: { $lte : 3.0 }

  }

  return await Developers.find(query).toArray((error, documents) => {
    return documents
  });
}

// Query 3
module.exports.query3 = async () => {
  // Number of developers that have a professional degree grouped by country
  query = [
    { $match: {
      MainBranch: "I am a developer by profession",
      EdLevel: {$regex: "Professional degree"} }
    },
    { $group: { _id: "$Country", count: { $sum: 1 } } }
  ]

  return await Developers.aggregate(query).toArray((error, documents) => {
    return documents
  });
}
