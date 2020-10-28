# Leaflet-challenge - Visualizing Data with Leaflet

![1-Logo](Images/1-Logo.png)

## Project Objective
The purpose of this project is to analyze the United States Geological Survey, or USGS, data on all earthquakes worldwide over the past 30 days and display it on the map. USGS is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment; and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes.

The map can be accessed at: https://nsheikh23.github.io/leaflet-challenge/

## Methods Used
* Data Visualization

## Technologies
* JavaScript
* Leaflet
* HTML, CSS

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

## Analysis
As expected, it can be seen that majority of the earthquakes occurred at the boundaries of the tectonic plates. However, something interesting to note is the depth of these earthquakes. In North America, it can be seen there were numerous events but they were mostly less than 10km deep. In contrast, western South America had seemingly fewer earthquakes but they were much deeper. There appears to be greater stress between the Nazca plate and South American plate. A similar pattern can be observed in the Pacific with the Pacific plate clashing with the Australian, the Filipino, and the North American plates. There is a lot of tension causing deeper earthquakes.

In the future I would like to continue this project and add heatmap, clusters and a timelapse. 

### Satellite Image
![Satellite Image](Images/Satellite.PNG)

### Grayscale Image
![Grayscale Image](Images/GrayscalePopup.PNG)

### Outdoors Image
![Outdoors Image](Images/OutdoorsTectonic.PNG)


