// require("dotenv").config();
// var keys = require("./keys.js");
// var spotify = new Spotify(keys.spotify);
var src = "https://cdn.jsdelivr.net/momentjs/2.12.0/moment.min.js";
var fs = require("fs");
var movieName;
var artistName;
var movieNameArr = [];
var artistNameArr = [];
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
        queryUrlMovie = "http://www.omdbapi.com/?t=Mr.Nobody&y=&plot=short&apikey=trilogy";
    }

    axios.get(queryUrlMovie).then(
        function(response) {
                // Response from query URL is recorded to console.log
            console.log("Title of the movie : " + response.data.Title);
            appendToFile(response.data.Title);
            console.log("Release Year : " + response.data.Year);
            appendToFile(response.data.Year);
            console.log("Imdb Rating : " + response.data.imdbRating);
            appendToFile(response.data.imdbRating);
            console.log("Rotten Tomatoes Rating of the movie : " + response.data.imdbRating);
            appendToFile(response.data.imdbRating);
            console.log("Country where the movie was produced : " + response.data.Country);
            appendToFile(response.data.Country);
            console.log("Language of the movie : " + response.data.Language);
            appendToFile(response.data.Language);
            console.log("Plot of the movie : " + response.data.Plot);
            appendToFile(response.data.Plot);
            console.log("Actors in the movie : " + response.data.Actors);
            appendToFile(response.data.Actors);
    
            
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
                // Response from query URL is recorded to console.log
            // console.log(response.data.venue.name);
            console.log("Venue : " + response.data[0].venue.name);
            console.log("Venue Location : " + response.data[0].venue.city + "\n\t\t" + response.data[0].venue.latitude + "," + response.data[0].venue.longitude);
            console.log("Venue : " + response.data[0].datetime);
            // var formattedTime = response.data[0].datetime.moment().format("MM/DD/YYYY");
            // console.log("Formated Time : " + formattedTime);
            
        });
    }
else{
    console.log("Please enter name of an artist/band name");
}
}

// Getting song name from user in 3rd argument
if(process.argv[2] === "spitify-this-song"){
    // Storing user inputs to artist Name array
    for(var i=3; i<process.argv.length; i++){
        artistNameArr.push(process.argv[i]);
        artistName = artistNameArr.join(" ");
    }
}

    //   Function that appends data to text file
    function appendToFile(value){
    fs.appendFile("log.txt","\n"+value,function(err){
        if(err){
            console.log(err);
        }
        console.log("Appended movie details to Log.txt Successfully");
    });
}

  

