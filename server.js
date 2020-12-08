'use strict';

// ======= Server Start ==========

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// ======== Middleware =========

app.use(cors());

// ======== Routes ==========

app.get('/location', function(req,res){
    const coordinates = require('./data/location.json');
    const instanceOfCoordinates = new Coordinates(coordinates);

    console.log(instanceOfCoordinates);

    res.send(instanceOfCoordinates);
});

app.get('/weather', function(req,res){
    const weatherStatsArray = [];
    const weatherStats = require('./data/weather.json');
    weatherStats.data.forEach(instance=> {
        weatherStatsArray.push(new Weather(instance));
    });
    res.send(weatherStatsArray);
});

// ========== Callback Functions =============

function Coordinates(coordinateObject){
    this.name = coordinateObject[0].display_name;
    this.latitude = coordinateObject[0].lat;
    this.longitude = coordinateObject[0].lon;
}

function Weather(weatherObject){
    this.forecast = weatherObject.weather.description;
    this.time = weatherObject.valid_date;
}

// ========== Add Error handling and start server ========

app.use('*', (request, response) => {
    response.status(404).send('The route you are looking for is disconnected. Come back soon!');
});
app.listen(PORT, () => console.log('server is up on port: ${PORT}'));