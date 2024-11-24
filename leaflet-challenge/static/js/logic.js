// Create tile layer for background of the map
console.log("Step 1 working")

// Create tile layer for background of the map
let basemap = L.tilelayer(
    "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson",
    {
        attribution:
            'map data',
    }
);

// Create map object with options
let map = L.map("map", {
    center: [
        40.7, -94.5
    ],
    zoom: 3
});

// Add base map tile to map
basemap.addTo(map)

// Function returns style data for each of the earthquakes
function styleInfo(feature) {
    return {
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        stroke: true,
        weight: 0.5
    };
}

// Function determines color of marker based on magnitude
function getColor(depth) {
    switch (true) {
        case depth > 90:
            return "#ea2c2c";
        case depth > 70:
            return "#ea822c";
        case depth > 50:
            return "#ee9c00";
        case depth > 30:
            return "#eecc00";
        case depth > 10:
            return "#d4ee00";
        default:
            return "#98ee00"
    }
}

// Function determines radius of earthquake
function getRadius(magnitude) {
    if (magnitude === 0) {
        return 1;
    }
    return magnitude * 4;
}

// Add geoJSON layer to map
L.geoJson(data, {
    // Turn each feature into circle marker
    pointToLayer: function(feature, latlng) {
        return L.circleMarker(latlng);
    },
    // Set style for each marker using styleinfo function
    style: styleInfo,
    // Create popup for each marker to display magnitude and location of earthquakes after maker has been created
    onEachFeature: function(feature, layer) {
        layer.bindPopup(
            "Magnitude: "
            + feature.properties.mag
            + "<br>Depth: "
            + feature.geometry.coordinates[2]
            + "<br>Location: "
            + feature.properties.place
        );
    }
}).addTo(map)