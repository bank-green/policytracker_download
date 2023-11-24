import os
import pandas as pd
import requests
import re

# Replace this with the path to your spreadsheet
spreadsheet_path = 'coalpolicytracker.xlsx'  # or .csv
output_folder = 'downloaded_content'

# Read the spreadsheet
df = pd.read_excel(spreadsheet_path)  # or pd.read_csv(spreadsheet_path) for CSV files

# Ensure the output folder exists
if not os.path.exists(output_folder):
    os.makedirs(output_folder)

# Iterate through the rows of the DataFrame
output_dict = {}
for index, row in df.iterrows():
    text = row.iloc[-1]  # Last column for the URL
    url_pattern = """https?://[^\\s]+"""
    urls = re.findall(url_pattern, text)    
    folder_name = row.iloc[2]  # 3rd column for the folder name
    
    output_dict[folder_name] = urls


    # # Create a folder for each unique name in the 3rd column
    # folder_path = os.path.join(output_folder, str(folder_name))
    # if not os.path.exists(folder_path):
    #     os.makedirs(folder_path)
    
    # for url in urls:
    #     try:
    #     # Download the content from the URL
    #         headers = {
    #         "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/117.0"
    #         }
    #         response = requests.get(headers=headers, url=url)
    #         response.raise_for_status()

    #     # Assuming the URL points to a file, extract filename
        
    #         if url.endswith('/'):
    #             url = url[:-1]
            
    #         filename = url.split('/')[-1]
    #         file_path = os.path.join(folder_path, filename)

    #         # Write the content to a file
    #         with open(file_path, 'wb') as file:
    #             file.write(response.content)

    #         print(f'Downloaded {url} into {folder_path}')


    #     except requests.RequestException as e:
    #         print(f'Error downloading {url}: {e}')

# print('Download completed.')
import json

with open ("downloaded_content/urls.json", "w") as f:
    json.dump(output_dict, f)
