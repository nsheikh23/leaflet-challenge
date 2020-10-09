# Leaflet-challenge - Visualizing Data with Leaflet

## Background

![1-Logo](Images/1-Logo.png)

Welcome to the United States Geological Survey, or USGS for short! The USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. As a new hire, you will be helping them out with an exciting new project!

The USGS is interested in building a new set of tools that will allow them visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. Their hope is that being able to visualize their data will allow them to better educate the public and other government organizations (and hopefully secure more funding..) on issues facing our planet.

## Tasks Performed

1. Imported the GeoJSON data for all earthquakes in the past 30 days from the USGS website: 
https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php

2. Created a map using Leaflet with the latitude and longitude from the data.

   * Multiple base maps were created to allow user interaction.

   * Earthquakes overlay map was created using the data imported.
   
   * The size of the marker was determined by the magnitude of the earthquake, while the color was determined by the depth. For example, earthquakes with higher magnitudes appear larger in radius, while earthquakes that are deeper are colored darker as shown in the legend.

   * Popups were bound to each event that provide details on location and time.

   * A legend was created to provide context of the map.

3. Imported additional GeoJSON data on tectonic plates from:
https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json

   * This data illustrated a relationship between the tectonic plates and the seismic activity

   * Another overlay map was created for tectonic plates that gives the user power to turn on or off each layer independently.


