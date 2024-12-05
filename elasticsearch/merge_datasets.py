import json

folder="RAW_DATA"
reviews_path = folder + "/Digital_Music.jsonl"
items_path = folder + "/meta_Digital_Music.jsonl"
output_path = folder + "/merged_data.jsonl"

print(f"Reading {reviews_path} and {items_path}")

# Load JSON datasets
with open(reviews_path, 'r') as file:
    reviews = []
    for line in file:
        # Parse the JSON line
        review = json.loads(line.strip())
        reviews.append(review)

with open(items_path, 'r') as file:
    items = []
    for line in file:
        # Parse the JSON line
        item = json.loads(line.strip())
        items.append(item)

print(f"Processed {reviews_path} and {items_path}")
print(f"Merging {reviews_path} and {items_path}")

# Create a hash map for items dataset
items_map = {item["parent_asin"]: item for item in items}

# Merge reviews with item details, nesting the product information in an 'item' object
merged_data = []
for review in reviews:
    parent_asin = review.get("parent_asin")
    if parent_asin in items_map.keys():
        # Nest item details inside an 'item' object
        merged_review = {**review, "item": items_map[parent_asin]}
        merged_data.append(merged_review)

# Save the merged data to a new JSON file
with open(output_path, 'w') as f:
    json.dump(merged_data, f, indent=4)

print(f"Merge complete! Data saved in 'merged_data.json'.")
