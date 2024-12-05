import sys
import json

def process_file(input_file, output_file):
    """
    Process the input file and generate an Elasticsearch bulk JSON file.
    
    :param input_file: Path to the input file.
    :param output_file: Path to save the processed bulk JSON file.
    """
    try:
        with open(input_file, 'r', encoding='utf-8') as infile, \
             open(output_file, 'w', encoding='utf-8') as outfile:
            
            for line in infile:
                # Parse the JSON line
                record = json.loads(line.strip())
                
                # Generate the bulk indexing structure
                index_metadata = {"index": { }}
                
                # Write the metadata and the document to the output file
                outfile.write(json.dumps(index_metadata) + '\n')
                outfile.write(json.dumps(record) + '\n')
                
        print(f"Processed {input_file} and saved to {output_file}")
    
    except Exception as e:
        print(f"Error processing {input_file}: {e}")
        sys.exit(1)


if __name__ == "__main__":
    # Ensure the script is called with the correct arguments
    if len(sys.argv) != 3:
        print("Usage: python process_file.py <input_file> <output_file>")
        sys.exit(1)
    
    input_file = sys.argv[1]
    output_file = sys.argv[2]
    
    process_file(input_file, output_file)
