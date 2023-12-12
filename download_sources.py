import os
import pandas as pd
import json
import requests
import re


def clean_filename(filename):
    return re.sub(r'[\/*?:"<>|]', "", filename)  # Remove invalid characters


def download_url(url, output_folder, bank_name, output_dict):
    try:
        # Download the content from the URL
        headers = {
            "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.15; rv:109.0) Gecko/20100101 Firefox/117.0"
        }
        response = requests.get(headers=headers, url=url, timeout=60, allow_redirects=True)
        response.raise_for_status()

        # Assuming the URL points to a file, extract filename
        if url.endswith("/"):
            url = url[:-1]

        filename = clean_filename(url.split("/")[-1])
        file_path = os.path.join(output_folder, bank_name, filename)

        # Write the content to a file
        with open(file_path, "wb") as file:
            file.write(response.content)

        output_dict[bank_name]["output"].append(
            {"url": url, "actual_url": url, "downloaded": True}
        )

        # print
        print(f"✅ {file_path}")

    except requests.RequestException as e:
        output_dict[bank_name]["output"].append(
            {"url": url, "actual_url": None, "downloaded": False}
        )
        print(f"🚨 {bank_name}/{url}: {e}")

    return output_dict


def download_policytracker(tracker="coal"):
    spreadsheet_path = "coalpolicytracker.xlsx"  # or .csv
    output_folder = "coal_downloaded_content"

    if tracker.lower() == "oilgas":
        spreadsheet_path = "OilGasPolicyTracker.xlsx"
        output_folder = "oilgas_downloaded_content"

    df = pd.read_excel(spreadsheet_path)  # Read the spreadsheet
    output_dict = {}

    with open("./tags.json") as f:
        tags_dict = json.load(f)

    # Ensure the output folder exists
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    # Iterate through the rows of the DataFrame
    for _, row in df.iterrows():
        text = row.iloc[-1]  # Last column for the URL
        url_pattern = """https?://[^\\s]+"""
        urls = re.findall(url_pattern, text)
        bank_name = row.iloc[2]  # 3rd column for the folder name

        output_dict[bank_name] = {}
        output_dict[bank_name]["tag"] = tags_dict.get(bank_name, None)
        output_dict[bank_name]["output"] = []

        # Create a folder for each unique name in the 3rd column
        folder_path = os.path.join(output_folder, str(bank_name))
        if not os.path.exists(folder_path):
            os.makedirs(folder_path)

        for url in urls:
            output_dict = download_url(url, output_folder, bank_name, output_dict)

        with open(f"{output_folder}/_urls.json", "w") as f:
            json.dump(output_dict, f, indent=4)

    print("Download completed.")


# download_policytracker(tracker="coal")
download_policytracker(tracker="oilgas")
