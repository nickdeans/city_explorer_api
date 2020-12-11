# Project Name
Lab 06 - Node, npm, and Express

**Author**: Nick Abramowicz
**Version**: 1.9.0

## Overview
I developed and deployed the backend for an application after given the frontend. I created a server and utilized several APIs to create the backend for the City Explorer web application. The applications function is to allow users to search any city around the world and have a map, weather forecast, longitude/latitude, movies from city, and restaraunts from the city returned.

## Getting Started
You will first need to create the neccessary folders and files on your machine with your code editor. You must have a .env and json files to be able to access your data as well as create your server. Next you will create your server and make sure that your server.js is interacting appropriately with your .env file. You will then need to create the routes, middleware, and constructor functions for the APIs that you will be using. Link your API keys from you .env file to access the data for your application. Furthermore you will use sql and postgres to store and access data you will be using from the APIs. Lastly you will deploy your live backend url to the frontend.

## Architecture
I am using data provided from several APIs including a location, weather, trails, movie, and restaraunt APIs. A .env file is being used for my live server. A schema.sql is being used to utilize sql through postgres to store data and have it be easily accessible. I am also using json data and javascript for my code.

## Change Log
12-07-2020 2:00pm - Created Repository 
12-07-2020 3:00pm - Created need configurations and files needed for fully functionable deployed page on Heroku.
12-07-2020 4:25pm - Created a route with a method of get.
12-07-2020 4:45pm - Created a constructor function.
12-07-2020 5:15pm - Returned an object which contained neccessary information for correct client rendering.
12-07-2020 5:20pm - Depoyed updated express server to Heroku.
12-08-2020 2:00pm - Created route with a method of get d path of /weather
12-08-2020 2:30pm - Created constructor function for weather route.
12-08-2020 3:00pm - Returned an array of objects.
12-08-2020 3:10pm - deployed updated to Heroku.
12-08-2020 9:00pm - Created geocode API.
12-08-2020 10:00pm - Created weather API.
12-09-2020 2:40pm - Created Trails API.
12-09-2020 3:30pm - Installed pg and created Database with env to my server.
12-09:2020 4:25pm - Created function to check database for location info. 
12-09-2020 4:30pm - If location exists, send info to client. If not request data from API.
12-09-2020 5:20pm - successfully deployed backend url from heroku on to city explorer page.
12-10-2020 2:00pm - Updated README and fixed couple of bugs.
12-10-2020 3:30pm - Added Movie API.

## Time Estimate
Number and Name of Feature: Lab 06 - Repository Setup, Locations, and Weather
Estimate of time needed to complete: 6 Hours
Start Time: 1:30pm
Finish Time: 8:00pm
Actual Time needed to Complete: 6 hours and 30 mins.

## Time Estimate
Number and Name of Feature: Lab 07 - Data Formatting, Location API, and Weather API
Estimate of time needed to complete: 6 Hours
Start Time: 1:30pm
Finish Time: 8:30pm
Actual Time needed to Complete: 7 hours.

## Time Estimate
Number and Name of Feature: Lab 08 - Server and Deployment
Estimate of time needed to complete: 6 Hours
Start Time: 1:30pm
Finish Time: 7:30pm
Actual Time needed to Complete: 6 hours.

## Time Estimate
Number and Name of Feature: Lab 09 - Repository Setup, Locations, and Weather
Estimate of time needed to complete: 6 Hours
Start Time: 1:30pm
Finish Time: 8:00pm
Actual Time needed to Complete: 6 hours and 30 mins.

## Credits and Collaborations
Chance Harmon, Skyler Burger, Nicholas Carignan, Alan Hung, James Gerstenberger, William Moreno.
