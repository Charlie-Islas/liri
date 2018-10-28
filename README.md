# liri
This language assistant will help you communicate with different API's with simple commands. In case you insert a wrong command, it will display an error message.

The following is a list of valid commands and what they will display:

1. concert-this NAME OF ARTIST

Use this command to look for information of upcoming concerts of your favorite artist. The following information will be displayed:

*Name of the venue
*Venue location
*Date of the Event (in "MM/DD/YYYY" format)

2. spotify-this NAME OF SONG

Use this command to look for your favorite songs via the Spotify API. The following information about tracks will be displayed:

*Artist(s)
*The song's name
*A preview link of the song from Spotify
*The album that the song is from

In case you specify no song and type only the spotify-this command, the program will automatically assing a default song: "The Sign", by Ace of Base

3. movie-this NAME OF MOVIE

Use this command to look for movies in the OMDB API. The following information about the movies will be displayed:

   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie.

In case you specify no movie and type only the movie-this command, the program will automatically assing a default song: "Mr. Nobody"

4. do-what-it-says

Alternatively, you can use a text file called random.txt to execute the previous commands. Just write the desired command followed by a comma and the artist, song, or movie you want to look for in the desired API. Use no spaces or quotes!

If the syntax within the text file is not correct, an error message will be displayed.

For an illustrative explanation of how the program works, please review our collection of screenshots. 

