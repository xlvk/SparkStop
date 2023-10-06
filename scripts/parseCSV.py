import pandas as pd

df = pd.read_csv("../data/csv/VIIRS.csv")

json_data = df.to_json(orient="records")

with open("../data/json/VIIRS.json", "w") as f:
    f.write(json_data)
