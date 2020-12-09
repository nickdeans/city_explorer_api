'use strict';

// ======= Server Start ==========

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3001;

// ======== Middleware =========

app.use(cors());

// ======== Routes ==========

app.get('/location', function(req,res){
    const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
    const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${req.query.city}&format=json`;

    superagent.get(url).then(whatReturnsBack => {
        const coordinates = whatReturnsBack.body;
        const instanceOfCoordinates = new Coordinates(coordinates,req.query.city);
    
        console.log(instanceOfCoordinates);
    
        res.send(instanceOfCoordinates);
    })
        .catch(error => console.log(error));
});

app.get('/weather', function(req,res){
    const WEATHER_API_KEY = process.env.WEATHER_API_KEY;
    superagent.get('https://api.weatherbit.io/v2.0/forecast/daily')
        .query({
            key: WEATHER_API_KEY,
            lat: req.query.latitude,
            lon: req.query.longitude,
            days: 8
        })
        .then(whatReturnsBack => {
            const weatherStats = whatReturnsBack.body;
            const weatherStatsArray = weatherStats.data.map(instance => new Weather(instance));
            res.send(weatherStatsArray);
        }).catch(error => console.log(error));
});

app.get('/trails', function(req,res){
    const TRAIL_API_KEY = process.env.TRAIL_API_KEY;
    superagent.get('https://www.hikingproject.com/data/get-trails?lat=40.0274&lon=-105.2519&maxDistance=10&key=200991550-2da6ccb4e4aab4a21cc5f8e882f9fdf4')
    .query({
        key: TRAIL_API_KEY,
        lat: req.query.latitude,
        lon: req.query.longitude,
    })
    .then(whatReturnsBack => {
        const trailInfo = whatReturnsBack.body;
        const trailInfoArray = trailInfo.trails.map(instance => new Trail(instance));
        res.send(trailInfoArray);
    }).catch(error => console.error(error));
});

// ========== Callback Functions =============

function Coordinates(coordinateObject, search_query){
    this.search_query = coordinateObject[0].search_query || 'seattle';
    this.formatted_query = coordinateObject[0].display_name;
    this.latitude = coordinateObject[0].lat;
    this.longitude = coordinateObject[0].lon;
}

function Weather(weatherObject){
    this.forecast = weatherObject.weather.description;
    this.time = weatherObject.valid_date;
}

function Trail(trail){
    this.name = trail.name;
    this.location = trail.location;
    this.length = trail.length;
    this.stars = trail.stars;
    this.summary = trail.summary;
    this.trail_url = trail.url;
    this.conditions = trail.conditionDetails
    this.condition_date = trail.conditionDate.substring(4,7);
    this.condition_time = trail.conditionDate.substring(4,7);
    this.star_votes = trail.minStars;
}

// ========== Add Error handling and start server ========

app.use('*', (request, response) => {
    response.status(404).send('The route you are looking for is disconnected. Come back soon!');
});
app.listen(PORT, () => console.log('server is up on port: ${PORT}'));