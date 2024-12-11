import json
from datetime import datetime
import re

ifolder="RAW_DATA"
ofolder="MERGED_DATA"
reviews_path = ifolder + "/Digital_Music.jsonl"
items_path = ifolder + "/meta_Digital_Music.jsonl"
output_path = ofolder + "/merged_Digital_music.jsonl"
merging_attribute = "parent_asin"

def extract_artist_and_format(store_value):
    if not isinstance(store_value, str):
        return None , None

    # Regex to extract artist
    artist_match = re.match(r"^(.*?)(?:\s+\(|\s+Format:|$)", store_value)
    artist = artist_match.group(1).strip() if artist_match else None

    # Regex to extract format
    format_match = re.search(r"Format:\s*(.*)$", store_value)
    format_value = format_match.group(1).strip() if format_match else None

    return artist, format_value

print(f"Reading {reviews_path}")

# Load JSON datasets
with open(reviews_path, 'r') as file:
    reviews = []
    for line in file:
        # Parse the JSON line
        review = json.loads(line.strip())

        # Remove unnecessary fields
        review.pop('images', None)  # Remove images
        
        reviews.append(review)

print(f"Reading {items_path}")

with open(items_path, 'r') as file:
    items = []
    for line in file:
        # Parse the JSON line
        item = json.loads(line.strip())

        # Remove unnecessary fields
        item.pop('images', None)  # Remove images 
        item.pop('videos', None)  # Remove videos
        item.pop('bought_together', None) # Remove bought_together since all values are null
        item.pop('features', None)  # Remove features since all values are null
        item.pop('categories', None)  # Remove categories since all values are null

        storev = item.get('store')
        # Extract artist and format
        artist, format_value = extract_artist_and_format(storev)

        # Add extracted fields to the item
        item["artist"] = artist
        item["format"] = format_value

        # Extract details
        details = item.get('details', {})
        
        # Flatten details into the main item dictionary
        for key, value in details.items():
            # Add details to the main dictionary
            if key == "Is Discontinued By Manufacturer":
                item[f"detail_{key.replace(' ', '_')}"] = True if value == "Yes" else False
            elif key == "Number of discs":
            # Convert string to integer, handling invalid values gracefully
                try:
                    item[f"detail_{key.replace(' ', '_')}"] = int(value)
                except ValueError:
                    # Handle cases where conversion to int fails
                    item[f"detail_{key.replace(' ', '_')}"] = None
            elif key == "Date First Available":
                try:
                    # Convert to ISO 8601 format
                    date_obj = datetime.strptime(value, "%B %d, %Y")
                    item[f"detail_{key.replace(' ', '_')}"] = date_obj.strftime("%Y-%m-%d")
                except ValueError:
                    item[f"detail_{key.replace(' ', '_')}"] = None
            else:
                # Add other details as-is
                item[f"detail_{key.replace(' ', '_')}"] = value
        
        # Remove the original 'details' key
        item.pop('details', None)

        items.append(item)

print(f"Processed {reviews_path} and {items_path}")
print(f"Merging {reviews_path} and {items_path}")

# Create a hash map for items dataset
items_map = {item[merging_attribute]: item for item in items}

# Merge reviews with item details, nesting the product information in an 'item' object
merged_data = []
for review in reviews:
    parent_asin = review.get(merging_attribute)
    if parent_asin in items_map.keys():
        # Nest item details inside an 'item' object
        merged_review = {**review, "item": items_map[parent_asin]}
        merged_data.append(merged_review)

# Save the merged data to a new JSON file
with open(output_path, 'w') as f:
    for merged_review in merged_data:
        f.write(json.dumps(merged_review) + '\n')

print(f"Merge complete! Data saved in {output_path}.")
