require("dotenv").config();

// CREATE JSON PACKAGE AND SAVE NODE MODULES: SPOTIFY, AXIOS, OMDB, MOMENT, DOTENV

// VARIABLES
var keys = require('./keys.js');
var fs = require('fs');
var Spotify = require('node-spotify-api');
var omdb = require('omdb');
var spotify = new Spotify(keys.spotify);

// grab user commands from node
var command = process.argv[2];
var mediaName = "";

for (var i = 3; i < process.argv.length; i++) {
	mediaName += "+" + process.argv[i];
}

// switch function for liri commands
function liri(command) {
	switch (command) {
		case "spotify-this-song":
			spotifyThis();
			break;
		case "movie-this":
			movieThis();
			break;
		case "concert-this":
			concertThis();
		case "do-what-it-says":
			doThis();
			break;
		default:
			console.log("Sydney, you forgot to add a liri command!");
	}
}
function spotifyThis() {
	// console.log("Spotify this song for me");	
	spotify.search({ type: 'track', query: mediaName || "ace of base - the sign" }, function (err, data) {
		if (err) {
			console.log('Error occurred: ' + err);
			return;
		}
		// console.log(data);
		console.log("Artist: " + data.tracks.items[0].artists[0].name);
		console.log("Name: " + data.tracks.items[0].name);
		console.log("Link: " + data.tracks.items[0].preview_url);
		console.log("Album: " + data.tracks.items[0].album.name);
	});
}

function movieThis() {
	// console.log("Find rotten tomatoes rating");
	omdb.get({ title: mediaName }, true, function (err, movie) {
		if (err) {
			return console.error(err);
		}
		if (!movie) {
			return console.log('Movie not found!');
		}
		// console.log(movie);
		console.log("Title: " + movie.title);
		console.log("Year: " + movie.year);
		console.log("IMDB Rating: " + movie.imdb.rating);
		console.log("Produced in: " + movie.countries);
		// this response did not have language in the API
		// console.log("Language: " + );
		console.log("Plot: " + movie.plot);
		console.log("Actors: " + movie.actors);
		// this response had "undefined" for Rotten Tomatoes Rating
		// console.log("Rotten Tomatoes Rating: " + );
		// this response did not have Rotten Tomatoes URL in the API
		// console.log("Rotten Tomatoes URL: " + );	    
	});
}
function doThis() {
console.log("Do what I say!!");
	fs.readFile("random.txt", "utf8", function (err, data) {
		if (err) {
			return;
		}
		// Break the string down by comma separation and store the contents into the output array.
		var output = data.split(',');
		command = output[0];
		mediaName = output[1];
		liri(command);
	});
}

liri(command);