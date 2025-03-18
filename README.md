# Earthquake Data Visualization

## Overview & Features

This project visualizes earthquake data using Leaflet.js and D3.js. The map dynamically displays real-time earthquake data from the USGS API, allowing users to explore recent seismic activity worldwide. Additionally, the map overlays tectonic plate boundaries for geographic reference.

## Features

### Dynamic Earthquake Markers:


Marker size corresponds to earthquake magnitude.


Marker color corresponds to earthquake depth.

### Interactive Popups:

Each earthquake marker displays location, magnitude, and depth when clicked.

### Tectonic Plates Layer:

Shows global tectonic plate boundaries as a reference.

### Base Maps & Layer Control:

Choose between different map styles (Street Map, Topographic Map).


Toggle Earthquake and Tectonic Plates overlays independently.

### Legend:

Displays depth color scale for better interpretation.

## Data Sources & Implementation

This project fetches and visualizes real-time data from the following sources:

## Data Sources

Earthquake Data: Retrieved from the USGS GeoJSON API:
USGS Earthquake Data (Past Week) [USGS Earthquake Data (Past Week](https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson)


## Technologies Used

Leaflet.js – Used for interactive map visualization.

D3.js – Fetches and processes GeoJSON data.

JavaScript – Handles data processing and visualization logic.

HTML/CSS – Structures and styles the map display.

## Setup Instructions

Clone or download the repository.

Open index.html in a web browser.

Ensure an active internet connection to fetch live data from USGS.

## Screenshot
