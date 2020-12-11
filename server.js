'use strict';

// ======= Server Start ==========

const express = require('express');
const cors = require('cors');
const superagent = require('superagent');
const pg = require('pg');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;

const client = new pg.Client(DATABASE_URL);
client.on('error', (error) => console.error(error));

// ======== Middleware =========

app.use(cors());

// ======== Routes ==========

app.get('/location', function(req,res){
    client.query('SELECT * FROM location WHERE search_query=$1', [req.query.city])
    .then(data => {
        if(data.rows.length > 0){
            console.log(data.rows);
            console.log('need to send them stuff');
            res.send(data.rows[0]);
        } else {
            const GEOCODE_API_KEY = process.env.GEOCODE_API_KEY;
            const url = `https://us1.locationiq.com/v1/search.php?key=${GEOCODE_API_KEY}&q=${req.query.city}&format=json`;
        
            superagent.get(url).then(whatReturnsBack => {
                const coordinates = whatReturnsBack.body;
                const instanceOfCoordinates = new Coordinates(coordinates,req.query.city);
            
                client.query(
                    `INSERT INTO location
                    (search_query, latitude, longitude, formatted_query)
                    VALUES ($1, $2, $3, $4)`, [req.query.city, instanceOfCoordinates.latitude, instanceOfCoordinates.longitude, instanceOfCoordinates.formatted_query])
                    .then(() => {
                        res.send(instanceOfCoordinates);
                    });
    })
        .catch(error => console.log(error));
    }
});        
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

app.get('/movies', function(req,res){
    const MOVIE_API_KEY = process.env.MOVIE_API_KEY;
    superagent.get('https://api.themoviedb.org/3/movie/550?api_key=c1b44571a95466974c595046d3a7d5cb')
    .query({
        api_key: MOVIE_API_KEY,
        query: req.query.search_query
    })
    .then(whatReturnsBack => {
        const movieInfo = whatReturnsBack.body.results;
        const movieInfoArray = movieInfo.body.results.map(instance => new Movie(instance));
        res.send(movieInfoArray);
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

function Movie(movie){
    this.title = movie.original_title;
    this.overview = movie.overview;
    this.average_votes = movie.vote_average;
    this.image_url = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
    this.popularity = movie.popularity;
    this.released_on = movie.release_date;
}

// ========== Add Error handling and start server ========

app.use('*', (request, response) => {
    response.send('The route you are looking for is disconnected. Come back soon!');
});

client.connect()
    .then(() => {
        app.listen(PORT, () => console.log(`server is up on port: ${PORT}`));
    })
    .catch(error => console.error(error));