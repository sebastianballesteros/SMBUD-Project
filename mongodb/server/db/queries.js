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
  // People that whave a job satisfacion <= 5 based on country
  query = [
    { $match: {
        JobSat: { $ne: NaN },
        Country: { $ne: null }
      }
    },
    { $group: {
        _id: "$Country",
        totalCount: { $sum: 1 }, // Total documents per country
        conditionCount: {
          $sum: {
            $cond: [
              {
                $lte: ["$JobSat", 5.0] ,
              },
              1, // If condition matches, increment by 1
              0  // Otherwise, increment by 0
            ]
          }
        }
      }
    },
    { $project: {
        _id: 0,
        Country: "$_id",
        Percentage: {
          $concat: [
            {
              $toString: {
                $round: [
                  {
                    $multiply: [
                      { $divide: ["$conditionCount", "$totalCount"] },
                      100
                    ]
                  },
                  2
                ]
              }
            },
            "%"
          ]
        }
      }
    }
    
  ]

  return await Developers.aggregate(query).toArray((error, documents) => {
    return documents
  });
}

// Query 3
module.exports.query3 = async () => {
  // Number of developers that have a professional degree grouped by country
  query = [
    { $match: {
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
    { $project: {
        _id: 0,
        Country: '$_id',
        Count: 1
      }
    },
    { $sort: {
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
    { $group: {
        _id: { EdLevel: "$EdLevel", LearnCode: "$LearnCode" },
        count: { $sum: 1 }
      }
    },
    { $group: {
        _id: "$_id.EdLevel",
        mostPreferredResource: { $first: "$_id.LearnCode" },
        maxCount: { $first: "$count" }
      }
    },
    { $sort: { 
        _id: 1 
      } 
    },
    { $project: {
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
        CompTotal: { $ne: NaN }, 
        EdLevel: { $ne: null}, 
        Currency: { $eq: "USD\tUnited States dollar" }
      } 
    },
    { $group: { 
        _id: {EdLevel:"$EdLevel"}, 
        averageSalary: { $avg: "$CompTotal" } 
      } 
    },
    { $project: {
        _id: 0,
        EdLevel: "$_id.EdLevel",
        AverageSalary: { $round: ["$averageSalary", 2] }
      }
    },
    { $sort: { AverageSalary: -1 } }
  ]

  return await Developers.aggregate(query).toArray((error, documents) => {
    return documents
  });
}

// Query 6

module.exports.query6 = async () => {
  // Database used based on the organization size
  query = [
    { $match: {
        OrgSize: { $ne: NaN },
        DatabaseHaveWorkedWith: { $ne: null, $not: { $size: 0 } }
      }
    },
    { $unwind: "$DatabaseHaveWorkedWith" },
    { $group: {
        _id: { OrgSize: "$OrgSize", Database: "$DatabaseHaveWorkedWith" },
        count: { $sum: 1 }
      }
    },
    { $sort: { 
        "_id.OrgSize": 1, 
        count: -1 
      }
    },
    { $group: {
        _id: "$_id.OrgSize",
        mostUsedDatabase: { $first: "$_id.Database" },
        count: { $first: "$count" }
      }
    },
    { $sort: { 
        _id: 1 
      } 
    },
    { $project: {
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
    { $match: { 
        DatabaseWantToWorkWith: { $ne: null }, 
        Age: { $ne: null },
      }
    },
    { $unwind: "$DatabaseWantToWorkWith" },
    { $group: {
        _id: 
        {
          Database: "$DatabaseWantToWorkWith",
          Age: "$Age"
        },
        count: { $sum: 1 } 
      }
    },
    { $project: {
        _id: 0,
        Database: "$_id.Database",
        Age: "$_id.Age",
        Count: "$count"
      }
    },
    { $sort: {
        Age: 1, 
        Count: -1
      }
    },
    { $group: {
        _id: "$Age", // Group by age only
        Database: { $first: "$Database" },
        Count: { $first: "$Count" }
      }
    },
    { $sort: { 
        _id: 1, 
        Count: -1
      }
    },
    { $project: {
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
            then: 50,  
            else: {
              $cond: {
                if: { $eq: ["$YearsCode", "Less than 1 year"] },
                then: 0,  // Convert "Less than a year" to 0
                else: { $toInt: "$YearsCode" }  // Convert to integer
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
  //Average number of languages worked with and desired to work with based on developer type
  query = [
    { $match: {
        LanguageHaveWorkedWith: {$ne: null},
        DevType: {$ne: NaN},
      }
    },
    {
      $project: {
        DevType: "$DevType",
        LanguagesWorkedWithCount: {
          $size: "$LanguageHaveWorkedWith"
        },
        LanguagesDesiredToWorkWithCount: {
          $size: "$LanguageWantToWorkWith"
        },
      }
    },
    {
      $group: {
        _id: '$DevType',         
        AvgLanguagesWorkedWith: {
          $avg: "$LanguagesWorkedWithCount"
        },
        AvgLanguagesDesiredToWorkWith: {
          $avg: "$LanguagesDesiredToWorkWithCount"
        },
      }
    },
    {
      $project: {
        _id: 0,
        DevType: '$_id',
        AvgLanguagesWorkedWith: {
          $round: ["$AvgLanguagesWorkedWith", 1]
        },
        AvgLanguagesDesiredToWorkWith: {
          $round: ["$AvgLanguagesDesiredToWorkWith", 1]
        },
      }
    }
  ]

  return await Developers.aggregate(query).toArray((error, documents) => {
    return documents
  });
}

