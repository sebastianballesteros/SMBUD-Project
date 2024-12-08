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

// Query 4
module.exports.query4 = async () => {
  // Learning resources are prefered by developers based on their education level
  query = [
  
    { $unwind: "$LearnCode" },
    
    {
      $group: {
        _id: { EdLevel: "$EdLevel", LearnCode: "$LearnCode" },
        count: { $sum: 1 }
      }
    },
    
    {
      $group: {
        _id: "$_id.EdLevel",
        mostPreferredResource: { $first: "$_id.LearnCode" },
        maxCount: { $first: "$count" }
      }
    },
    
    { $sort: { _id: 1 } },
    
    {
      $project: {
        _id: 0,
        EdLevel: "$_id",
        PreferedResource: "$mostPreferredResource"
      }
    }
  ]

  return await Developers.aggregate(query).toArray((error, documents) => {
    return documents
  });
}

// Query 5
module.exports.query5 = async () => {
  // Anual salary for developers based on the education level
  query = [
    { $match: { 
      CompTotal: { $ne: null }, 
      EdLevel: { $ne: null} } 
    },
    { $group: { 
      _id: "$EdLevel", 
      averageSalary: { $avg: "$CompTotal" } } 
    },
    {
      $project: {
        _id: 0,
        EdLevel: "$_id",
        AverageSalary: { $round: ["$averageSalary", 2] } // Round to 2 decimal places
      }
    }
  ]

  return await Developers.aggregate(query).toArray((error, documents) => {
    return documents
  });
}

// Query 6

module.exports.query6 = async () => {
  // Database used based on the organization size
  query = [
    {
      $match: {
        OrgSize: { $ne: null },
        DatabaseHaveWorkedWith: { $ne: null, $not: { $size: 0 } }
      }
    },
    
    { $unwind: "$DatabaseHaveWorkedWith" },
    
    {
      $group: {
        _id: { OrgSize: "$OrgSize", Database: "$DatabaseHaveWorkedWith" },
        count: { $sum: 1 }
      }
    },
    
    {
      $sort: { "_id.OrgSize": 1, count: -1 }
    },
    
    {
      $group: {
        _id: "$_id.OrgSize",
        mostUsedDatabase: { $first: "$_id.Database" },
        count: { $first: "$count" }
      }
    },
    
    { $sort: { _id: 1 } },
    
    {
      $project: {
        _id: 0,
        OrgSize: "$_id",
        MostUsedDatabase: "$mostUsedDatabase",
        Count: "$count"
      }
    }
  ]

  return await Developers.aggregate(query).toArray((error, documents) => {
    return documents
  });
}
