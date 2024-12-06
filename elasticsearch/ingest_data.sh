#!/bin/bash

# Check if both input and output folders are provided

INPUT_FOLDER="RAW_DATA"
OUTPUT_FOLDER="PREPARED_DATA"
PYTHON_SCRIPT="process_file.py"
ES_INDEX="test_index_v3"
ES_HOST="http://localhost:9200"
PASSWORD=8kScDrZY
CHUNK_SIZE=5000  # Number of lines per chunk

# Check if the input folder exists
if [ ! -d "$INPUT_FOLDER" ]; then
  echo "Input folder '$INPUT_FOLDER' does not exist."
  exit 1
fi

# Create the output folder if it doesn't exist
mkdir -p "$OUTPUT_FOLDER"

# Loop through each file in the input folder
for file in "$INPUT_FOLDER"/*; do
  if [ -f "$file" ]; then
    # Extract the base name of the file (e.g., "example.jsonl" -> "example")
    base_name=$(basename "$file" | cut -f 1 -d '.')

    # Define output file name based on the input file name
    output_file="$OUTPUT_FOLDER/${base_name}_bulk.json"

    echo "Processing file: $file"
    echo "Output will be saved in: $output_file"

    # Run the Python script with the file as input, passing the output file name as a parameter
    python3 "$PYTHON_SCRIPT" "$file" "$output_file"

    # Check if the processed file exists
    if [ ! -f "$output_file" ]; then
      echo "$output_file not found. Skipping Elasticsearch call for $file."
      continue
    fi

    # Split the processed file into chunks of CHUNK_SIZE lines
    echo "Splitting $output_file into chunks of $CHUNK_SIZE lines..."
    split -l "$CHUNK_SIZE" "$output_file" "${output_file}_chunk_"

    # Index each chunk into Elasticsearch
    for chunk in "${output_file}_chunk_"*; do
      echo "Indexing chunk: $chunk into Elasticsearch..."

      curl -k -X POST -u "elastic:$PASSWORD" "$ES_HOST/$ES_INDEX/_bulk" -H "Content-Type: application/json" --data-binary "@$chunk"
      if [ $? -ne 0 ]; then
        echo "Error: Failed to index chunk $chunk."
      else
        echo "Successfully indexed chunk $chunk."
      fi
    done

    # Cleanup: Remove chunk files after processing
    echo "Cleaning up chunk files for $output_file..."
    rm -f "${output_file}_chunk_"*
  fi


done

echo "All files processed."
