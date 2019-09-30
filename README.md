# liri-node-app

## Summary
   LIRI Application - Language Interpretation and Recognition Interface. LIRI is a command line node application that takes in parameters and gives you back data. User needs to install axios, moment and spotify web api node to use this application. User has to add user's spotify api key to access spotify songs. 
   
## Installation Guide
* User has to download all files from github.
* User can either clone the repository or download all files manually.
* Package.json file has required depencies to be installed. So, user can type `npm install` to install all needed packages
* User can type `node liri.js` to run the application
* To access different API's results, follow steps from results section

## Technologies Used
- Javascript : used to provide interactive effects
- Node : used to run javascript file outside the browser. Supports command line user input. Node is useful is different ways. As
far as this code is concerned, utilised filesystem, axios, moment, spotify api.
- Axios : used to call api and extract datas from them.

## APIs Used
- Spotify API
- Bands in Town API
- OMDb API

## Results
1. Spotify API :

`node liri.js spotify-this-song losing you`


>The above code gives name of album, artist, song and preview link of song in spotify. 
Output is logged in log.txt file as well.

`node liri.js spotify-this-song Stay`

>The above code gives name of album, artist, song and preview link of song in spotify. 
Output is logged in log.txt file as well.

`node liri.js spotify-this-song`

>Since user did not give any input song to log, default value of "The Sign by Ace of Base" 
song details are displayed. Output is logged in log.txt file as well.

![Site](gif/spotify.gif)

2. Bands in Town API :

`node liri.js concert-this Built to Spill`

>The above code gives Venue, venue location, Date and Time in customized format(MM/DD/YYYY). 
Output is logged in log.txt file as well.

`node liri.js concert-this`

>Since user did not give any input, it reminds the user to enter either band/artist name to proceed further. 
This time, output is not logged as user did not provide an input.

![Site](gif/concert.gif)

3. OMDb API :

`node liri.js movie-this star wars`

>The above code gives title of movie, release year, Imdb rating, rotten tomatoes rating, country where the movie was produced, language, plot and actors in the movie. Output is logged in log.txt file as well.

`node liri.js movie-this`

>Since user did not give any input, it gives details about the default value "Mr. Nobody". 
The output is logged to log.txt file as well.

![Site](gif/movie.gif)
 
4. Spotify API using filesystem

`node liri.js do-what-it-says`

>The above code gives name of album, artist, song and preview link of song in spotify of "I want it that way" 
since that song name was specified in random.txt. Code reads random.txt file and outputs the 
song name that was read from text file. Output is logged in log.txt file as well.

![Site](gif/doWhatItSays.gif)


## Logs

All outputs are logged to log.txt file. Results of each command is appended to file to keep track of results.

![Site](logImages/logAfterSpotify.png)

![Site](logImages/logAfterConcert.png)

![Site](logImages/logAfterMovie.jpg)

![Site](logImages/logAfterDoItThatWay.jpg)

## Code Snippet
```Javascript

    // ****************************************
    // Function that appends data to text file
    // ****************************************
    
    function appendToFile(value){
    fs.appendFile("log.txt","\n"+value,function(err){
        if(err){
            console.log(err);
        }
        console.log("\nAPPENDED DETAILS TO LOG SUCCESSFULLY !");
    });
}

    // ***************************************************************
    // This code snippet is executed when user typed "do-what-it-says"
    // ****************************************************************
 
    if(process.argv[2] === "do-what-it-says"){ 
        // Using filesystem read file random.txt
        fs.readFile("random.txt","utf8",function(err, data){
            if(err){
                console.log(err);
            }
            // Split contents of file using a comma
            var dataArr = data.split(",");
            process.argv[2] = dataArr[0];
            // Assigning the name of song from file to songName
            songName = dataArr[1];
            // Calling spotify function to print song details
            spotify(songName);

        });
    }
```
The above code implements multiple instances of liri node application. Used filesystem npm to append the details to log file. Also, used filesystem to read a command from text file and produce results.

## Author Links
[LinkedIn](https://www.linkedin.com/in/mahisha-gunasekaran-0a780a88/)

[GitHub](https://github.com/Mahi-Mani)

