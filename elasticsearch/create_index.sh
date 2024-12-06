#!/bin/bash

# Global variables
ES_INDEX="test_index_v3"
ES_HOST="http://localhost:9200"
PASSWORD=8kScDrZY

# Create index specifying the mapping
echo "Creating index'$ES_INDEX'."

curl -k -X PUT -u "elastic:$PASSWORD" "$ES_HOST/$ES_INDEX?pretty" -H 'Content-Type: application/json' -d'
{
  "mappings": {
    "properties": {
      "asin":    { "type": "keyword" },
      "helpful_vote":  { "type": "integer"  },
      "images":   { "type": "object"  },
      "item":  {
        "type": "nested",
        "properties": {
          "main_category":    { "type": "text"  },
          "title": { "type": "text"  },
          "average_rating":     { "type": "half_float"   },
          "rating_number":   { "type": "half_float"   },
          "features":    { "type": "object"    },
          "description":   { "type": "text"   },
          "price":   { "type": "float"   },
          "images":   { "type": "object"   },
          "videos":   { "type": "object"   },
          "store":   { "type": "text"   },
          "categories":   { "type": "object"   },
          "details":   { "type": "object"   },
          "parent_asin":   { "type": "keyword"   },
          "bought_together":   { "type": "object"   }
        }
      },
      "parent_asin":  { "type": "keyword"  },
      "rating":  { "type": "half_float"  },
      "text":  { "type": "text"  },
      "timestamp":  { "type": "date"  },
      "title":  { "type": "text"  },
      "user_id":  { "type": "keyword"  },
      "verified_purchase":  { "type": "boolean"  }
    }
  }
}
'
