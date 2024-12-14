#!/bin/bash
# ES_INDEX="test_index_v3"
# ES_HOST="http://localhost:9200"
# PASSWORD=8kScDrZY
# ES_INDEX="reviews_index"
# ES_HOST="https://localhost:9200"
# PASSWORD=gCLiJEL7E*+uA55wZOqg
ES_INDEX="reviews_index"
ES_USER="Test1"
ES_HOST="https://7c9e0123f447443cb786651acef7ec40.us-central1.gcp.cloud.es.io:443"
PASSWORD=M3JIUXRaTUJ3Rmx0eUJDT3ltZEM6a3IxSEQ2YmtRaUdVTnZYZlZhSW9idw==


echo "-------------------- Query 1 --------------------"
# QUERY 1
# Reviews related to Mexican, Colombian, or Peruvian music that should have a rating >= 4
curl -k -X POST "$ES_HOST/$ES_INDEX/_search?pretty" \
  -H "Authorization: ApiKey $PASSWORD" \
  -H "Content-Type: application/json" \
  -d'
{
  "query": {
    "bool": {
      "must": {
        "match": {
          "title": "Mexican, Colombia, Peruvian"
        }
      },
      "should": {
        "range": {
          "rating": { "gte" : 4 }
        }
      }
    }
  }
}'

echo "-------------------- Query 2 --------------------"
# QUERY 2
# Reviews that must be verified purchase and specifying the item is boring
curl -k -X POST "$ES_HOST/$ES_INDEX/_search?pretty" \
  -H "Authorization: ApiKey $PASSWORD" \
  -H "Content-Type: application/json" \
  -d'
{
  "query": {
    "bool": {
      "must": {
        "match": { "verified_purchase": true }
      },
      "should": {
        "match": { "title": "Boring" }
      }
    }
  }
}'

echo "-------------------- Query 3 --------------------"
# QUERY 3
# A negative review of an item with artist as Elton John and with a price item >= 29.99
curl -k -X POST "$ES_HOST/$ES_INDEX/_search?pretty" \
  -H "Authorization: ApiKey $PASSWORD" \
  -H "Content-Type: application/json" \
  -d'
{
  "query": {
    "nested": {
      "path": "item",
      "query": {
        "bool": {
          "should": {
            "match": { "text": "Expensive, Cheaper, Refund" }
          },
          "must": [
            { "range": {
                "item.price": { "gte" : 29.99 }}
            },
            { "match": {"item.store": "Elton John"} }
          ]
        }
      }
    }
  }
}'

echo "-------------------- Query 4 --------------------"
# QUERY 4
# top 5 artists with the highest average rating and atl least 20 reviews
curl -k -X POST "$ES_HOST/$ES_INDEX/_search?pretty" -H "Authorization: ApiKey $PASSWORD" -H 'Content-Type: application/json' -d'
{
  "size": 0,
  "query": {
    "nested": {
      "path": "item",
      "query": {
        "bool": {
          "must_not": [
            {"term": {"item.artist": "Format: Audio CD" }},
            {"term": {"item.artist": "Various Artists" }},
            {"term": {"item.artist": "Various" }},
            {"term": {"item.artist": "VARIOUS ARTISTS" }}
          ],
          "must": [
            {"range": {"item.rating_number": {"gte" : 20}}}
          ]
        }
      }
    }
  },
  "aggs": {
    "most_frequent_artist": {
      "nested": {
        "path": "item"
      },
      "aggs": {
        "artist_aggregation": {
          "terms": {
            "field": "item.artist",
            "size": 5
          }
        }
      }
    }
  }
}'

echo "-------------------- Query 5 --------------------"
# QUERY 5
# User that has made more reviews overall
curl -k -X POST "$ES_HOST/$ES_INDEX/_search?pretty" \
  -H "Authorization: ApiKey $PASSWORD" \
  -H "Content-Type: application/json" \
  -d'
{
  "size": 0,
  "aggs": {
    "most_reviews_user": {
      "terms": {
        "field": "user_id",
        "size": 1
      }
    }
  }
}'

echo "-------------------- Query 6 --------------------"
# QUERY 6
# How many of the reviews of the top user had possitive comments
curl -k -X POST "$ES_HOST/$ES_INDEX/_search?pretty" \
  -H "Authorization: ApiKey $PASSWORD" \
  -H "Content-Type: application/json" \
  -d'
{
  "size": 0,
  "query": {
    "bool": {
      "must": {
        "term": {
          "user_id": "AGAFM74L2RIJ5O36NNYH4Z5ISQNQ"
        }
      },
      "should": {
        "match": {
          "text": "Good, Great, Excellent, Amazing, Awesome"
        }
      }
    }
  }
}'

echo "-------------------- Query 7 --------------------"
# QUERY 7
# Average price of the Taylor Swift items
curl -k -X POST "$ES_HOST/$ES_INDEX/_search?pretty" \
  -H "Authorization: ApiKey $PASSWORD" \
  -H "Content-Type: application/json" \
  -d'
{
  "size": 0,
  "query": {
    "nested": {
      "path": "item",
      "query": {
        "bool": {
          "must": {
            "match": {
              "item.artist": "Taylor Swift"
            }
          }
        }
      }
    }
  },
  "aggs": {
    "average_price": {
      "nested": {
        "path": "item"
      },
      "aggs": {
        "average_price": {
          "avg": {
            "field": "item.price"
          }
        }
      }
    }
  }
}'

echo "-------------------- Query 8 --------------------"
# QUERY 8
# Average rating of the items with price >= 49.99
curl -k -X POST "$ES_HOST/$ES_INDEX/_search?pretty" \
  -H "Authorization: ApiKey $PASSWORD" \
  -H "Content-Type: application/json" \
  -d'
{
  "size": 0,
  "query": {
    "nested": {
      "path": "item",
      "query": {
        "bool": {
          "must": {
            "range": {
              "item.price": { "gte" : 49.99 }
            }
          }
        }
      }
    }
  },
  "aggs": {
    "average_rating": {
      "nested": {
        "path": "item"
      },
      "aggs": {
        "average_rating": {
          "avg": {
            "field": "item.average_rating"
          }
        }
      }
    }
  }
}'

echo "-------------------- Query 9 --------------------"
# QUERY 9
# correlation between the price and the rating of the items
curl -k -X POST "$ES_HOST/$ES_INDEX/_search?pretty" \
  -H "Authorization: ApiKey $PASSWORD" \
  -H "Content-Type: application/json" \
  -d'
{
  "size": 0,
  "query": {
    "nested": {
      "path": "item",
      "query": {
        "bool": {
          "must": {
            "exists": {
              "field": "item.price"
            }
          }
        }
      }
    }
  },
  "aggs": {
    "correlation": {
      "nested": {
        "path": "item"
      },
      "aggs": {
        "correlation": {
          "stats": {
            "field": "item.price"
          }
        }
      }
    }
  }
}'

echo "-------------------- Query 10 --------------------"
# QUERY 10
# Histogram of the price ranges and the average rating of the items
curl -k -X POST "$ES_HOST/$ES_INDEX/_search?pretty" \
  -H "Authorization: ApiKey $PASSWORD" \
  -H "Content-Type: application/json" \
  -d'
{
  "size": 0,
  "query" : {
    "nested": {
      "path": "item",
      "query": {
        "bool": {
          "must": [
            { "exists": { "field": "item.price" } },
            { "exists": { "field": "item.average_rating" } },
            { "range": { "item.price": { "gt": 0 , "lt": 200 } } }
          ]
        }
      }
    }
  },
  "aggs": {
    "item": {
      "nested": {
        "path": "item"
      },
      "aggs": {
        "price_ranges": {
          "histogram": {
            "field": "item.price",
            "interval": 10
          },
          "aggs": {
            "average_rating": {
              "avg": {
                "field": "item.average_rating"
              }
            }
          }
        }
      }
    }
  }
}'

#