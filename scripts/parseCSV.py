import pandas as pd

df = pd.read_csv("../data/train.csv")

json_data = df.to_json(orient="records")

with open("../data/json/train.json", "w") as f:
    f.write(json_data)
