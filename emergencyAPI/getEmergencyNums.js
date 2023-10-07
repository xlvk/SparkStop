const baseUrl = "https://emergencynumberapi.com/api/country/";

function getCurrentGeolocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("Latitude: " + latitude);
        console.log("Longitude: " + longitude);
        return [latitude, longitude];
      },
      function (error) {
        console.error("Error getting geolocation: " + error.message);
      }
    );
  } else {
    console.error("Geolocation is not supported by this browser.");
  }
}

async function getCountryFromCoordinates(lat, lng) {
  const apiKey = "AIzaSyCyBpl5bEuva-ciBgPDZ0QC2mi5e-1cie0";
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === "OK") {
      const results = data.results;
      for (let i = 0; i < results.length; i++) {
        const addressComponents = results[i].address_components;
        for (let j = 0; j < addressComponents.length; j++) {
          const types = addressComponents[j].types;
          if (types.includes("country")) {
            return addressComponents[j].long_name;
          }
        }
      }
    } else {
      throw new Error(data.error_message);
    }
  } catch (error) {
    console.error("Error:", error.message);
    return null;
  }
}
