// Store our API endpoint inside url
var url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson";

// Perform a GET request to the query URL
d3.json(url, function(data) {
  // Once we get a response, send the data.features object to the createEarthquakes function
  createEarthquakes(data.features);
});

function createEarthquakes(earthquakeData) {

  var earthquakeMarkers = [];

  for (var i = 0; i < earthquakeData.length; i++) {

    var magnitude = earthquakeData[i].properties.mag
    var lat = earthquakeData[i].geometry.coordinates[1]
    var lng = earthquakeData[i].geometry.coordinates[0]
    var latlng = [lat,lng]
    var depth = earthquakeData[i].geometry.coordinates[2]
    var color = "";
    if (depth < 10){
      color = "lime"
    }
    else if (depth < 30) {
      color = "green"
    }
    else if (depth < 50) {
      color = "yellow"
    }
    else if (depth < 70) {
      color = "orange"
    }
    else if (depth < 90) {
      color = "red"
    }
    else {
      color = "maroon"
    }
    earthquakeMarkers.push(
      L.circle(latlng, {
        stroke: false,
        fillOpacity: 0.5,
        color: "white",
        fillColor: color,
        radius: magnitude*50000
      }).bindPopup("<h3>" + earthquakeData[i].properties.title +
          "</h3><hr><p>" + new Date(earthquakeData[i].properties.time) + "</p>")
    )
  }

  var earthquakes = L.layerGroup(earthquakeMarkers)

  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Define streetmap and darkmap layers
  var satellite = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/satellite-v9",
    accessToken: API_KEY
  });

  var grayscale = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "light-v10",
    accessToken: API_KEY
  });

  var outdoors = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "outdoors-v11",
    accessToken: API_KEY
  });

  // Faultline overlayMap
  var faultline = L.layerGroup();

  var faultlineurl = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json";

  d3.json(faultlineurl, function(plates){
    L.geoJSON(plates, {
      style: function() {
        return {color:"orange"}
      }
    }).addTo(faultline)
  })

  // Define a baseMaps object to hold our base layers
  var baseMaps = {
    "Satellite": satellite,
    "Grayscale": grayscale,
    "Outdoors" : outdoors
  };

  // Create overlay object to hold our overlay layer
  var overlayMaps = {
    "Tectonic Plates": faultline,
    "Earthquakes": earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load
  var myMap = L.map("map", {
    center: [
      15.5994, -28.6731
    ],
    zoom: 4,
    layers: [satellite, faultline, earthquakes]
  });

  // Create a layer control
  // Pass in our baseMaps and overlayMaps
  // Add the layer control to the map
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

  function legendColor(depth){
    if (depth < 10){
      return "lime"
    }
    else if (depth < 30) {
      return "green"
    }
    else if (depth < 50) {
      return "yellow"
    }
    else if (depth < 70) {
      return "orange"
    }
    else if (depth < 90) {
      return "red"
    }
    else {
      return "maroon"
    }
  }
  
  // Create a legend to display information about our map
  var legend = L.control({
    position: "bottomright",
    fillColor: "white"
  });
  
  // When the layer control is added, insert a div with the class of "legend"
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    var depth = [9, 29, 49, 69, 89, 500];
    var labels = ["<10", "10-30", "30-50", "50-70", "70-90", "90+"];
    div.innerHTML = '<div>Depth (km)</div>';
    for (var i = 0; i < depth.length; i++){
      div.innerHTML += '<i style="background:' + legendColor(depth[i]) + '">&nbsp;&nbsp;&nbsp;&nbsp;</i>&nbsp;'+
                      labels[i] + '<br>';
    }
    return div;
  };
  // Add the legend to the map
  legend.addTo(myMap);
}



