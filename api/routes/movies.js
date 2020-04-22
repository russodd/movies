const express = require('express');
const axios = require('axios');
const config = require('../config.json');
const router = express.Router();

const TMDB_BASE_PATH = 'https://api.themoviedb.org/3';
const TMDB_POPULAR_PATH = '/movie/popular';
const TMDB_SEARCH_PATH = '/search/movie';
const TMDB_MOVIE_BASE_PATH = '/movie/';
const TMDB_CREDITS_SUFFIX = '/credits';
const API_KEY = config.api_key;

// List the most popular movies
router.get('/', function(req, res, next) {
	const url = TMDB_BASE_PATH + TMDB_POPULAR_PATH;
	axios.get(url, {
			params: {
				api_key: API_KEY
			}
		})
		.then(tmdbRes => {
			res.send(tmdbRes.data);
		})
		.catch(err => {
			console.log(err);
			res.send(err);
		});
});

// Search for a given query string
router.get('/search', function(req, res, next) {
    const url = TMDB_BASE_PATH + TMDB_SEARCH_PATH;
    axios.get(url, {
			params: {
				query: req.query.query,
				api_key: API_KEY
			}
		})
		.then(tmdbRes => {
			res.send(tmdbRes.data);
		})
		.catch(err => {
			console.log(err);
			res.send(err);
		});
});

// Get detailed information about a given movie
router.get('/detail', function(req, res, next) {
    const movieUrl = TMDB_BASE_PATH + TMDB_MOVIE_BASE_PATH + req.query.id;
    const creditsUrl = TMDB_BASE_PATH + TMDB_MOVIE_BASE_PATH + req.query.id + TMDB_CREDITS_SUFFIX;

    // Combine the cast and crew information with the movie information, so that it can all be displayed at once
    Promise.all([
		    axios.get(movieUrl, {
				params: {
					api_key: API_KEY
				}
			}),
			axios.get(creditsUrl, {
				params: {
					api_key: API_KEY
				}
			})
		])
		.then(tmdbRes => {
			res.send({...tmdbRes[0].data, cast: tmdbRes[1].data.cast, crew: tmdbRes[1].data.crew});
		})
		.catch(err => {
			console.log(err);
			res.send(err);
		});
});

module.exports = router;