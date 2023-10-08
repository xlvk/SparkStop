const fs = require('fs')
// Create a map centered at a specific location and zoom level
var map = L.map('map').setView([26.0667, 50.5577], 10);

// Define tile layers for various map providers
var mapProviders = {
    openstreetmap: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
    }),
    mapbox: L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=YOUR_MAPBOX_ACCESS_TOKEN', {
        maxZoom: 19,
        id: 'mapbox/streets-v11', // Change this to your desired Mapbox style
    }),
    bing: L.tileLayer('https://tiles.bing.com:443/comp/ch/{q}?mkt=en&it=A,G,RL&shading=hill', {
        maxZoom: 19,
        attribution: '© 2023 Microsoft',
        subdomains: ['t0', 't1', 't2', 't3'],
    }),
    here: L.tileLayer('https://2.base.maps.ls.hereapi.com/maptile/2.1/maptile/newest/{style}/{z}/{x}/{y}/256/png8?apiKey=YOUR_HERE_API_KEY', {
        maxZoom: 19,
        style: 'normal.day',
    }),
    mapquest: L.tileLayer('https://otile{s}.mqcdn.com/tiles/1.0.0/map/{z}/{x}/{y}.jpg', {
        maxZoom: 19,
        subdomains: '1234',
    }),
    tomtom: L.tileLayer('https://api.tomtom.com/map/1/tile/basic/main/{z}/{x}/{y}.png?key=YOUR_TOMTOM_API_KEY', {
        maxZoom: 19,
    }),
    esri: L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: '© Esri',
    }),
    thunderforest: L.tileLayer('https://{s}.tile.thunderforest.com/{style}/{z}/{x}/{y}.png?apikey=YOUR_THUNDERFOREST_API_KEY', {
        maxZoom: 19,
        style: 'cycle',
    }),
    cartodb: L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
    }),
    stadia: L.tileLayer('https://{s}.tile.stadia.maps.yourserver.com/basic/{z}/{x}/{y}{r}.png', {
        maxZoom: 19,
    }),
    maptiler: L.tileLayer('https://api.maptiler.com/maps/{style}/{z}/{x}/{y}.png?key=YOUR_MAPTILER_API_KEY', {
        maxZoom: 19,
        style: 'basic',
    }),
};

// Add the default tile layer (OpenStreetMap)
mapProviders.openstreetmap.addTo(map);

fs.readFile("../data/json/BRAdata.json", (err, inputD) => [
    console.log(inputD.toString())
])

// Define an array of coordinates for multiple locations in Bahrain
var locations = [
    { lat: 26.2285, lon: 50.5860, name: "Location 1" },
    { lat: 26.1994, lon: 50.5332, name: "Location 2" },
    { lat: 26.2361, lon: 50.5875, name: "Location 3" },
    // Add more locations as needed
];

// fetch json
var Fdata = JSON.parse(fs.readFileSync("../data/json/BRAdata.json"));

// Function to change the map provider based on the selected option
document.getElementById('mapProvider').addEventListener('change', function () {
    var selectedProvider = this.value;
    map.eachLayer(function (layer) {
        map.removeLayer(layer);
    });
    mapProviders[selectedProvider].addTo(map);
    // Loop through the locations and add markers to the map
    for (var i = 0; i < locations.length; i++) {
        var locatio = locations[i];
        var marker = L.marker([locatio.lat, locatio.lon]).addTo(map);
        marker.bindPopup(locatio.name);
    }

});


// Loop through the locations and add markers to the map
for (var i = 0; i < locations.length; i++) {
    var locatio = locations[i];
    var marker = L.marker([locatio.lat, locatio.lon]).addTo(map);
    marker.bindPopup(locatio.name);
}