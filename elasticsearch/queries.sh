#!/bin/bash
# ES_INDEX="test_index_v3"
# ES_HOST="http://localhost:9200"
# PASSWORD=8kScDrZY
ES_INDEX="reviews_index"
ES_HOST="https://localhost:9200"
PASSWORD=gCLiJEL7E*+uA55wZOqg


echo "-------------------- Query 1 --------------------"
# QUERY 1
# Reviews related to Mexican, Colombian, or Peruvian music that should have a rating >= 4
curl -k -X POST -u "elastic:$PASSWORD" "$ES_HOST/$ES_INDEX/_search?pretty" \
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
curl -k -X POST -u "elastic:$PASSWORD" "$ES_HOST/$ES_INDEX/_search?pretty" \
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
curl -k -X POST -u "elastic:$PASSWORD" "$ES_HOST/$ES_INDEX/_search?pretty" \
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
