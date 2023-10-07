import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor

df = pd.read_csv('train.csv')

X = df[["windspeed", "wind_direction_num", "fire_size"]]
y = df["fire_spread"]

X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

y_pred = model.predict(X_test)


wind_speed = float(input("Enter wind speed (km/h): "))
wind_direction = float(input("Enter wind direction (degrees): "))
fire_size = float(input("Enter fire size: "))

input_data = pd.DataFrame(
    {
        "windspeed": [wind_speed],
        "wind_direction_num": [wind_direction],
        "fire_size": [fire_size],
    }
)

spread_prediction = model.predict(input_data)

print(f"Predicted fire spread: {spread_prediction[0]}")

