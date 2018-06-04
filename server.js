const Spotify = require('spotify-web-api-node');
const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const PORT = process.env.PORT || 8080;

// configure the express server
const CLIENT_ID = process.env.client_id || 'fdcd98041f9b4d5582658a9d79e0c83f';
const CLIENT_SECRET = process.env.client_secret || 'ee02b6246e40497ab607da92ad1f7e7f';
const REDIRECT_URI = process.env.redirect_uri || 'http://localhost:8080/callback';
console.log('redirect_uri', redirect_uri);
console.log('client_id', client_id);
console.log('client_secret', client_secret);
const STATE_KEY = 'spotify_auth_state';
// your application requests authorization
const scopes = ['user-read-private', 'user-read-email'];

// configure spotify
const spotifyApi = new Spotify({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
  redirectUri: REDIRECT_URI
});

/** Generates a random string containing numbers and letters of N characters */
const generateRandomString = N => (Math.random().toString(36)+Array(N).join('0')).slice(2, N+2);

app.use(express.static(path.join(__dirname, 'dist')))
  .use(cookieParser()); 

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/dist/index.html');
});

/**
 * The /login endpoint
 * Redirect the client to the spotify authorize url, but first set that user's
 * state in the cookie.
 */
app.get('/login', function(req, res){
  const state = generateRandomString(16);
  console.log(state);
  res.cookie(STATE_KEY, state);
  res.redirect(spotifyApi.createAuthorizeURL(scopes, state));
});

/**
 * The /callback endpoint - hit after the user logs in to spotifyApi
 * Verify that the state we put in the cookie matches the state in the query
 * parameter. Then, if all is good, redirect the user to the user page. If all
 * is not good, redirect the user to an error page
 */
app.get('/callback', (req, res) => {
  const { code, state } = req.query;
  const storedState = req.cookies ? req.cookies[STATE_KEY] : null;
  // first do state validation
  console.log(state);
  console.log(storedState);
  if (state === null || state !== storedState) {
    res.redirect('/#/error/state mismatch');
  // if the state is valid, get the authorization code and pass it on to the client
  } else {
    res.clearCookie(STATE_KEY);
    // Retrieve an access token and a refresh token
    spotifyApi.authorizationCodeGrant(code).then(data => {
      const { expires_in, access_token, refresh_token } = data.body;

      // Set the access token on the API object to use it in later calls
      spotifyApi.setAccessToken(access_token);
      spotifyApi.setRefreshToken(refresh_token);

      // use the access token to access the Spotify Web API
      spotifyApi.getMe().then(({ body }) => {
        console.log(body);
      });

      // we can also pass the token to the browser to make requests from there
      res.redirect(`/#/user/${access_token}/${refresh_token}`);
    }).catch(err => {
      res.redirect('/#/error/invalid token');
    });
  }
});

app.listen(PORT, error => (
  error
    ? console.error(error)
    : console.info(`Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
));
