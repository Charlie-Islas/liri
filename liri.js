//declaring global variables
require("dotenv").config();
var keys = require("./keys.js");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var song="";
var author="";
var request = require('request'); //Requesting the request package that will be used for getting information from OMDB and Bands in Town APIs
var movie="";
var movieURL="";
var artist="";
var bandURL="";
var bandURL="https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"; //using the URL format provided in the homework description
var fs = require("fs");
var command =process.argv[2];
var moment=require('moment');

//switch to call different functions based on a command

switch (command) {
    case "concert-this":
        concert_name();
        concert_this(artist);
        break;
    case "spotify-this":
        spotify_name();
        spotify_this(song);
        break;
    case "movie-this":
        movie_name();
        movie_this(movie);
        break;
    case "do-what-it-says":
        do_this();
        break;
    default:
        console.log("Invalid command! Please try again...");
}

//making the function for the concert API
function concert_name(){
    artist = process.argv.splice(3).join(" ");
}

function concert_this(artist){

    bandURL="https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"; //using the URL format provided in the homework description
    request(bandURL,function(error,response,body){

        if(!error){
            var concerts=JSON.parse(body);
            console.log("--------- Information about concerts of: "+artist.charAt(0).toUpperCase()+artist.slice(1)+" ---------");
                for(var x in concerts){
                console.log("-----------");
                console.log("Name of the venue: "+concerts[x].venue.name);
                console.log("Location: "+concerts[x].venue.city+", "+concerts[x].venue.country);
                var date=moment(concerts[x].datetime.substring(0,10)).format('MM-DD-YYYY');
                console.log("Date with new format: "+date);
                }
        }
        else{console.log(error);}
    });
}

function spotify_name(){
    song = process.argv.splice(3).join(" ");
    if(song===""){
        song="the sign, Ace of Base";
    }
}

function spotify_this(song) {

    console.log("--------- Information about the track: "+song.charAt(0).toUpperCase()+song.slice(1)+" ---------");

    spotify.search({ type: "track", query: song, limit: 1 }, function (error, response) {
        if (error) {
            return console.log(error);
        }
        for (var j = 0; j < response.tracks.items[0].album.artists.length; j++) {
            console.log("Artist(s): " + response.tracks.items[0].album.artists[j].name);
            console.log("Song: " + response.tracks.items[0].name);
            console.log("Song Link: " + response.tracks.items[0].external_urls.spotify);
            console.log("Album: " + response.tracks.items[0].album.name);
        }
    });
}

function movie_name(){
    movie = process.argv.splice(3).join(" ");
    if(movie===""){
        movie="Mr. Nobody";
    }
}

function movie_this(movie) {

    console.log("--------- Information about the movie: "+movie.charAt(0).toUpperCase()+movie.slice(1)+" ---------");

    movieURL = "http://www.omdbapi.com/?apikey=trilogy&t=" + movie;
	request(movieURL, function (error, res, body) {
		if (error) {
			return console.log(error);
		}

		//printint out desired information
		console.log("Title of the movie: " + JSON.parse(body).Title);
		console.log("Year the movie came out: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).imdbRating +"/10");
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		console.log("Country where the movie was produced: " + JSON.parse(body).Country);
		console.log("Movie language: " + JSON.parse(body).Language);
		console.log("Movie plot: " + JSON.parse(body).Plot);
		console.log("Actors in the movie: " + JSON.parse(body).Actors);

	});

}

function do_this() {
	fs.readFile("random.txt", "utf8", function(error, data) {
		if (error) {
			return console.log(error);
		} else {
			var split=data.split(",");

			if (split[0] === "concert-this") {
				artist = split[1];
				concert_this(artist);
			} 

			else if (split[0] === "spotify-this") {
				song = split[1];
				spotify_this(song);
            }
            
            else if (split[0] === "movie-this") {
				movie = split[1];
				movie_this(movie);
			}

			else {
				console.log("Oops! Something went wrong with the call! Please check the format and try again.")
			}

		}

	});
}





