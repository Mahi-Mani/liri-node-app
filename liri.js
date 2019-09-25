// require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
// var Spotify = require('node-spotify-api');
var SpotifyWebApi = require('spotify-web-api-node');
// File System
var fs = require("fs");
// Variable that holds spotify api access token
var accessToken;
// Moment npm
var moment = require("moment");

const spotifyApi = new SpotifyWebApi({
    clientId: '7134a257fe4647d790e880e5b34382c2',
    clientSecret: '1a131a78fa4247fea31b6cc5e905d3d6',
    redirectUri: 'http://www.example.com/callback',
  });
  
  // Set an access token.
  // This is required as Spotify implemented a new auth flow since May 2017.
  // See https://developer.spotify.com/news-stories/2017/01/27/removing-unauthenticated-calls-to-the-web-api/
  spotifyApi.clientCredentialsGrant()
    .then(function(data) {
    //   console.log('The access token expires in ' + data.body['expires_in']);
    //   console.log('The access token is ' + data.body['access_token']);
    accessToken = data.body['access_token'];
  
      // Save the access token so that it's used in future calls
      spotifyApi.setAccessToken(data.body['access_token']);
    }, function(err) {
      console.log('Something went wrong when retrieving an access token', err.message);
    });


var src = "https://cdn.jsdelivr.net/momentjs/2.12.0/moment.min.js";
var fs = require("fs");
var movieName;
var artistName;
var songName;
var movieNameArr = [];
var artistNameArr = [];
var songNameArr = [];
// Axios package
var axios = require("axios");
// Getting movie name from user in 4th argument
if(process.argv[2] === "movie-this"){
// Storing user inputs to Movie Name array
for(var i=3; i<process.argv.length; i++){
    movieNameArr.push(process.argv[i]);
    movieName = movieNameArr.join(" ");
}
// console.log("Name of the movie : " + movieName);
if(movieName){
    var queryUrlMovie = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    }
    // If user did not enter any value then give information about Mr. Nobody
    else if((!movieName) && (process.argv[2] === "movie-this")){
        console.log("Since you have not entered a movie name, we give you details about Mr. Nobody!\n");
        queryUrlMovie = "http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy";
    }

    axios.get(queryUrlMovie).then(
        function(response) {
                var appendMovieArr = [];
                appendMovieArr.push("************************* MOVIE DETAILS ***********************************");
                // Response from query URL is recorded to console.log
            console.log("Title of the movie : " + response.data.Title);
            // Pushing console logged data to an empty array
            appendMovieArr.push(response.data.Title);
            console.log("Release Year : " + response.data.Year);
            appendMovieArr.push(response.data.Year);
            console.log("Imdb Rating : " + response.data.imdbRating);
            appendMovieArr.push(response.data.imdbRating);
            console.log("Rotten Tomatoes Rating of the movie : " + response.data.Ratings[1].Value);
            appendMovieArr.push(response.data.Ratings[1].Value);
            console.log("Country where the movie was produced : " + response.data.Country);
            appendMovieArr.push(response.data.Country);
            console.log("Language of the movie : " + response.data.Language);
            appendMovieArr.push(response.data.Language);
            console.log("Plot of the movie : " + response.data.Plot);
            appendMovieArr.push(response.data.Plot);
            console.log("Actors in the movie : " + response.data.Actors);
            appendMovieArr.push(response.data.Actors);
            // Appending the array to log.txt
            appendToFile(appendMovieArr.join("\n"));
    
            
        }).catch(function(error) {
            if (error.response) {
              // The request was made and the server responded with a status code
              // that falls out of the range of 2xx
              console.log("---------------Data---------------");
              console.log(error.response.data);
              console.log("---------------Status---------------");
              console.log(error.response.status);
              console.log("---------------Status---------------");
              console.log(error.response.headers);
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an object that comes back with details pertaining to the error that occurred.
              console.log(error.request);
            } else {
              // Something happened in setting up the request that triggered an Error
              console.log("Error", error.message);
            }
            console.log(error.config);
          });
    
}
// Getting band/artist name from user in 3rd argument
if(process.argv[2] === "concert-this"){
    // Storing user inputs to artist Name array
    for(var i=3; i<process.argv.length; i++){
        artistNameArr.push(process.argv[i]);
        artistName = artistNameArr.join(" ");
    }
    // If user entered a value then use below URL
    if(artistName){
    var queryUrlConcert = "https://rest.bandsintown.com/artists/" + artistName + "/events?app_id=codingbootcamp";
    axios.get(queryUrlConcert).then(
        function(response) {
                var appendConcertArr = [];
                appendConcertArr.push("*********************** CONCERT DETAILS *************************************");
                // Response from query URL is recorded to console.log
            // console.log(response.data.venue.name);
            console.log("Venue : " + response.data[0].venue.name);
            // Pushing console.log contents to an empty Array
            appendConcertArr.push(response.data[0].venue.name);
            console.log("Venue Location : " + response.data[0].venue.city + "\n\t\t" + response.data[0].venue.latitude + "," + response.data[0].venue.longitude);
            appendConcertArr.push(response.data[0].venue.city + "\n\t\t" + response.data[0].venue.latitude + "," + response.data[0].venue.longitude);
            console.log("Date and Time : " + moment(response.data[0].datetime).format("MM/DD/YYYY"));
            appendConcertArr.push(moment(response.data[0].datetime).format("MM/DD/YYYY"));
            // Appending the array to log.txt
            appendToFile(appendConcertArr.join("\n"));

            
        });
    }
else{
    console.log("Please enter name of an artist/band name");
}
}

// Getting song name from user in 3rd argument
if(process.argv[2] === "spotify-this-song"){ 

    // Storing user inputs to artist Name array
    for(var i=3; i<process.argv.length; i++){
        songNameArr.push(process.argv[i]);
        songName = songNameArr.join(" ");
    }
        // If user entered a song name
        if(songName){
        spotify(songName);
        }
        // If user did not enter a song name then do this
        else{
            // songName = "The Sign by Ace of Base";
            console.log("As you have not entered a song name, here we present you with..\n");
            spotify("The Sign by Ace of Base");
        } 
}

// Spotify function to spotify songs when requested
    function spotify(songName){
    spotifyApi.setAccessToken('BQCu-VeF-h0ZRrGNC6iWYGFyMzt_mR0jnVdrnzG6EKkc9XJRL5jSVjlOp8MmbM0P2IpPnK151lMHFfsUjME');

    spotifyApi.searchTracks(songName)
    .then(function(data) {
        var appendSongArr = [];
        appendSongArr.push("************************* SONG DETAILS ***********************************");
        console.log("Name of Album : ", data.body.tracks.items[0].album.name);
        appendSongArr.push(data.body.tracks.items[0].album.name);
        console.log("Name of Artist : ", data.body.tracks.items[0].album.artists[0].name);
        appendSongArr.push(data.body.tracks.items[0].album.artists[0].name);
        console.log("Name of Song : ", data.body.tracks.items[0].name);
        appendSongArr.push(data.body.tracks.items[0].name);
        console.log("Preview Link : ", data.body.tracks.items[0].external_urls.spotify);
        appendSongArr.push(data.body.tracks.items[0].external_urls.spotify);
        appendToFile(appendSongArr.join("\n"));
    }, function(err) {
        console.error(err);
    });
}

// If 3rd argument is "do-what-it-says"
if(process.argv[2] === "do-what-it-says"){ 
    // Using filesystem read file random.txt
    fs.readFile("random.txt","utf8",function(err, data){
        if(err){
            console.log(err);
        }
        // Split contents of file using a comma
        var dataArr = data.split(",");
        process.argv[2] = dataArr[0];
        songName = dataArr[1];
        // Assigning the name of song from file to songName
        spotify(songName);

    });
}

    //   Function that appends data to text file
    function appendToFile(value){
    fs.appendFile("log.txt","\n"+value,function(err){
        if(err){
            console.log(err);
        }
        console.log("\nAPPENDED DETAILS TO LOG SUCCESSFULLY !");
    });
}

  

