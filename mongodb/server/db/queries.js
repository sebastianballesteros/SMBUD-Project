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
    { 
      $match: {
        MainBranch: "I am a developer by profession",
        EdLevel: {$regex: "Professional degree"} 
      }
    },
    { $group: 
      { 
        _id: "$Country", 
        Count: { $sum: 1 } 
      } 
    },
    {
      $project: {
        _id: 0,
        Country: '$_id',
        Count: 1
      }
    },
    {
      $sort: {
        Count: -1 
      }
    }    
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
    { 
      $match: { 
        CompTotal: { $ne: NaN }, 
        EdLevel: { $ne: null}, 
        Currency: { $eq: "USD\tUnited States dollar" }
      } 
    },
    { 
      $group: { 
        _id: {EdLevel:"$EdLevel"}, 
        averageSalary: { $avg: "$CompTotal" } 
      } 
    },
    {
      $project: {
        _id: 0,
        EdLevel: "$_id.EdLevel",
        AverageSalary: { $round: ["$averageSalary", 2] } // Round to 2 decimal places
      }
    },
    { $sort: { AverageSalary: -1 } },
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
      $sort: { 
        "_id.OrgSize": 1, 
        count: -1 
      }
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

module.exports.query7 = async () => {
  //Most desired database to work with based on age group
  query = [
    { 
      $match: { 
        DatabaseWantToWorkWith: { $ne: null }, 
        Age: { $ne: null },
      }
    },
    { $unwind: "$DatabaseWantToWorkWith" },
    { 
      $group: {
        _id: 
        {
          Database: "$DatabaseWantToWorkWith",
          Age: "$Age"
        },
        count: { $sum: 1 } 
      }
    },
    {
      $project: {
        _id: 0,
        Database: "$_id.Database",
        Age: "$_id.Age",
        Count: "$count"
      }
    },
    {$sort: {Age: 1, Count: -1}},
    {
      $group: {
        _id: "$Age", // Group by age only
        Database: { $first: "$Database" }, // Take the first database for each age group (most desired to work with)
        Count: { $first: "$Count" } // Get the count of the most used database
      }
    },
    { $sort: { 
        _id: 1, 
        Count: -1
      }
    },
    {
      $project: {
        _id: 0,
        Age: "$_id",
        MostDesiredDatabase: "$Database",
        Count: "$Count"
      }
    }
  ]

  return await Developers.aggregate(query).limit(100).toArray((error, documents) => {
    return documents
  });
}


module.exports.query8 = async () => {
  //Average years coding based on developer type
  query = [
    { $match: 
      { 
        YearsCode: {$ne: NaN},
        DevType: {$ne: NaN}
      }
    },    
    { $project: 
      {
        DevType: "$DevType",
        YearsCodeNumeric: {
          $cond: {
            if: { $eq: ["$YearsCode", "More than 50 years"] },
            then: 50,  // You can choose to use 50 or another value if needed
            else: {
              $cond: {
                if: { $eq: ["$YearsCode", "Less than 1 year"] },
                then: 0,  // Convert "Less than a year" to 0 (or 0.5, depending on your context)
                else: { $toInt: "$YearsCode" }  // Convert other values to integers
              }
            }
          }
        }
      }
    },
    {
      $group: {
        _id: {DevType: "$DevType"},        
        YearsCode: { $avg: "$YearsCodeNumeric" }
      }
    }, 
    { $project: { 
        _id: 0,
        DevType: "$_id.DevType",
        AverageYearsCoding: { $round: ["$YearsCode", 2] } ,
      } 
    },
    { $sort: { 
        "AverageYearsCoding": -1 
      }
    }
  ]

  return await Developers.aggregate(query).toArray((error, documents) => {
    return documents
  });
}

module.exports.query9 = async () => {
  //Employment status based on country 
  query = [
    {
      $unwind: "$Employment"
    },
    {
      $match: {
        Employment: {$ne: null},
        Country: {$ne: NaN}
      }
    },    
    {
      $group: {
        _id: {
          Employment: '$Employment',
          Country: '$Country'         
        },
        count: {$sum: 1}
      }
    },
    {
      $project: {
        _id: 0,
        Employment: '$_id.Employment',
        Country: '$_id.Country',
        Count: '$count'
      }
    },
    {
      $sort: { 
        Country: 1,
        Count: -1,
        Employment: -1
      }
    }
  ]

  return await Developers.aggregate(query).toArray((error, documents) => {
    return documents
  });
}


module.exports.query10 = async () => {
  //Employment status based on country 
  query = [
    {
      $match: {
        '$OrgSize': { $ne: null },
        '$OrgSize': { $ne: NaN }, 
        '$DatabaseHaveWorkedWith': { $ne: null, $not: { $size: 0 } }
      }
    },
    {
      $group: {
        _id: '$OrgSize',
        count: { $sum: 1 }
      }
    }
    

    //db.Developers.aggregate([{$match: {OrgSize: { $ne: null }, OrgSize: { $ne: NaN }, DatabaseHaveWorkedWith: { $ne: null, $not: { $size: 0 } }}},{ $group: {_id: '$OrgSize',count: {$sum: 1}}}])
    /*{
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
      $sort: { 
        "_id.OrgSize": 1, 
        count: -1 
      }
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
    }*/
  ]

  return await Developers.aggregate(query).toArray((error, documents) => {
    return documents
  });
}

