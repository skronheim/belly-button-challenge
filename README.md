# belly-button-challenge

## Table of Contents

1. Purpose
2. Instructions

## Purpose

This code is written in JavaScript for use with D3 and Plotly to fulfill the Module 14 Challenge homework assignment in the UofT data analytics course. 

More generally, this code is used to set up and run an app to show data for the biiodiversity of the bellybuttons of a set of individuals. A dropdown list shows each sample ID, and when an ID is chosen the data for that sample is shown on the graphs and in the Demographic info box. 

The Demographic info shows the ID designation of the sample, their ethnicity, gender, age, location, belly button type (bbtype), and how frequently they wash their belly button per week (wfreq). 

The bar graph shows the 10 most common operational taxonomic units (OTUs) present in the selected belly button and the number of those OTUs present. Hovertext shows the exact designations of each OTU. 

The bubble chart shows all OTUs present in the selected sample, with OTU on the x-axis and the number found on the y-axis. The size of the bubbles corresponds to the number found, and the color corresponds to the taxonomic designations of each bubble. The hovertext shows the taxonomic designations. 

## Instructions 

Navigate to the app deployment on github-pages to view and interact with the app (https://skronheim.github.io/belly-button-challenge/). 

The code is in the static/js/app.js file. 