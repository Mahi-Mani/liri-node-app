var SpotifyWebApi = require('spotify-web-api-node');

// credentials are optional
// var spotifyApi = new SpotifyWebApi({
//   clientId: '7134a257fe4647d790e880e5b34382c2',
//   clientSecret: '1a131a78fa4247fea31b6cc5e905d3d6',
//   redirectUri: 'http://www.example.com/callback'
// });

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
    console.log('The access token expires in ' + data.body['expires_in']);
    console.log('The access token is ' + data.body['access_token']);

    // Save the access token so that it's used in future calls
    spotifyApi.setAccessToken(data.body['access_token']);
  }, function(err) {
    console.log('Something went wrong when retrieving an access token', err.message);
  });

  spotifyApi.setAccessToken('BQAFpvhMmGiZSRcPyTABKMC-qKqiq_pz014lgt_Z7kps9DOVmwj-0QGjrG51lfG9q6NDD4n5bqHFcc_ejEU');

  spotifyApi.searchTracks('Stay')
  .then(function(data) {
    console.log("Name of Album : ", data.body.tracks.items[0].album.name);
    console.log("Name of Artist : ", data.body.tracks.items[0].album.artists[0].name);
    console.log("Name of Song : ", data.body.tracks.items[0].name);
    console.log("Preview Link : ", data.body.tracks.items[0].external_urls.spotify);
  }, function(err) {
    console.error(err);
  });