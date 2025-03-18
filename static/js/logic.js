// Create the 'basemap' tile layer that will be the background of our map.
let streetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});

let topoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.opentopomap.org">OpenTopoMap</a> contributors'
});

// Create the map object with center and zoom options.
let map = L.map("map", {
  center: [20, 0],
  zoom: 2,
  layers: [streetMap]
});

// Base maps for switching between layers
let baseMaps = {
  "Street Map": streetMap,
  "Topographic Map": topoMap
};

// Function to determine marker color based on earthquake depth.
function getColor(depth) {
  return depth > 90 ? "#d73027" :
         depth > 70 ? "#fc8d59" :
         depth > 50 ? "#fee08b" :
         depth > 30 ? "#d9ef8b" :
         depth > 10 ? "#91cf60" : "#1a9850";
}

// Function to determine marker radius based on earthquake magnitude.
function getRadius(magnitude) {
  return magnitude ? magnitude * 4 : 1;
}

// Function to style each marker.
function styleInfo(feature) {
  return {
    radius: getRadius(feature.properties.mag),
    fillColor: getColor(feature.geometry.coordinates[2]),
    color: "#000",
    weight: 0.5,
    opacity: 1,
    fillOpacity: 0.8
  };
}

// Create layers for earthquakes and tectonic plates.
let earthquakes = new L.LayerGroup();
let tectonicPlates = new L.LayerGroup();

// Fetch earthquake data and plot it.
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {
  L.geoJson(data, {
    pointToLayer: function (feature, latlng) {
      return L.circleMarker(latlng);
    },
    style: styleInfo,
    onEachFeature: function (feature, layer) {
      layer.bindPopup(
        "<strong>Location:</strong> " + feature.properties.place +
        "<br><strong>Magnitude:</strong> " + feature.properties.mag +
        "<br><strong>Depth:</strong> " + feature.geometry.coordinates[2] + " km"
      );
    }
  }).addTo(earthquakes);
});

// Fetch tectonic plates data and plot it.
d3.json("https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json").then(function (data) {
  L.geoJson(data, {
    color: "orange",
    weight: 2
  }).addTo(tectonicPlates);
});

// Create an overlay object to hold our layers.
let overlayMaps = {
  "Earthquakes": earthquakes,
  "Tectonic Plates": tectonicPlates
};

// Add layer control to the map.
L.control.layers(baseMaps, overlayMaps, {
  collapsed: false
}).addTo(map);

// Create a legend control object.
let legend = L.control({ position: "bottomright" });

legend.onAdd = function () {
  let div = L.DomUtil.create("div", "info legend"),
      depths = [-10, 10, 30, 50, 70, 90],
      labels = [];

  // Loop through depth intervals and create a colored label.
  for (let i = 0; i < depths.length; i++) {
    div.innerHTML +=
      '<i style="background:' + getColor(depths[i] + 1) + '; width: 18px; height: 18px; display: inline-block; margin-right: 5px;"></i> ' +
      depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+');
  }
  return div;
};

// Add the legend to the map.
legend.addTo(map);

// Add earthquake and tectonic plates layers to the map.
earthquakes.addTo(map);
tectonicPlates.addTo(map);
