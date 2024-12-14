#!/bin/bash

#Global variables
ES_INDEX="reviews_index"
ES_USER="Test1"
ES_HOST="https://7c9e0123f447443cb786651acef7ec40.us-central1.gcp.cloud.es.io:443"
PASSWORD=M3JIUXRaTUJ3Rmx0eUJDT3ltZEM6a3IxSEQ2YmtRaUdVTnZYZlZhSW9idw==
# ES_USER="elastic"
# ES_HOST="https://localhost:9200"
# PASSWORD=gCLiJEL7E*+uA55wZOqg
#ES_HOST="http://localhost:9200"
#PASSWORD=8kScDrZY

#check status fo the cluster
echo "Checking the status of the cluster."
curl -X GET "$ES_HOST" \
-H "Authorization: ApiKey $PASSWORD" \
-H "Content-Type: application/json"

#Create index specifying the mapping
echo "Creating index '$ES_INDEX'."

curl -k -X PUT "$ES_HOST/$ES_INDEX?pretty" -H "Authorization: ApiKey $PASSWORD" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "properties": {
      "asin":    { "type": "keyword" },
      "parent_asin":  { "type": "keyword"  },
      "user_id":  { "type": "keyword"  },
      "title":  { "type": "text"  },
      "text":  { "type": "text"  },
      "rating":  { "type": "integer"  },
      "timestamp":  { "type": "date", "format": "epoch_millis"  },
      "helpful_vote":  { "type": "integer"  },
      "verified_purchase":  { "type": "boolean"  },
      "item":  {
        "type": "nested",
        "properties": {
          "main_category":    { "type": "keyword"  },
          "title": { "type": "text"  },
          "average_rating":     { "type": "half_float"   },
          "rating_number":   { "type": "integer"   },
          "description":   { "type": "text"   },
          "price":   { "type": "float"   },
          "store":   { "type": "text"   },
          "artist":   { "type": "keyword"   },
          "format":   { "type": "keyword"   },
          "parent_asin":   { "type": "keyword"   },
          "detail_Package_Dimensions": { "type": "text" },
          "detail_Manufacturer": { "type": "keyword" },
          "detail_Date_First_Available": { "type": "date", "format": "yyyy-MM-dd" },
          "detail_Label": { "type": "keyword" },
          "detail_Number_of_discs": { "type": "integer" },
          "detail_Is_Discontinued_By_Manufacturer": { "type": "boolean" }
        }
      }
    }
  }
}
'
