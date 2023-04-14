const express = require('express');
const moviePlayRoutes = express.Router();
const db = require("../../database/database");
const Movie = require("../Movie/movie");
const MoviePlay = require("./moviePlay");

module.exports = moviePlayRoutes;