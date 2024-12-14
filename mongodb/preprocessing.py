import pandas as pd
import json

# Load the CSV file
csv_file = 'survey_results_public.csv'
df = pd.read_csv(csv_file)

#Drop un necessary columns

# Drop the 'check' column
if 'check' in df.columns:
    df.drop('check', axis=1, inplace=True)

# Drop columns with more than 60% missing values
threshold = 0.60  
df = df.loc[:, df.isna().mean() <= threshold]

# Convert columns with multiple answers into arrays
for col in df.select_dtypes(include='object').columns:
    if df[col].str.contains(';', na=False).any():
        df[col] = df[col].apply(lambda x: x.split(';') if pd.notna(x) else [])

# Convert to JSON
json_file = 'survey_results.json'
df.to_json(json_file, orient='records', lines=True, indent=4)

print(f"CSV converted to JSON and saved as {json_file}")

