import Spotify from 'spotify-web-api-js';
const spotifyApi = new Spotify();

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_ME_BEGIN = 'SPOTIFY_ME_BEGIN';
export const SPOTIFY_ME_SUCCESS = 'SPOTIFY_ME_SUCCESS';
export const SPOTIFY_ME_FAILURE = 'SPOTIFY_ME_FAILURE';

/** set the app's access and refresh tokens */
export function setTokens({ accessToken, refreshToken }) {
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  }
  return { type: SPOTIFY_TOKENS, accessToken, refreshToken };
}

/* get the user's info from the /me api */
export function getMyInfo() {
  return dispatch => {
    dispatch({ type: SPOTIFY_ME_BEGIN });
    spotifyApi.getMe().then(data => {
      console.log('inside getMe', data);
      dispatch({ type: SPOTIFY_ME_SUCCESS, data: data });
    }).catch(e => {
      dispatch({ type: SPOTIFY_ME_FAILURE, error: e });
    });
  };
}

export function getArtists() {
  return dispatch => {
    dispatch({ type: 'SPOTIFY_ARTISTS_BEGIN' });
    spotifyApi.getArtists(['2hazSY4Ef3aB9ATXW7F5w3', '6J6yx1t3nwIDyPXk5xa7O8']).then(data => {
      console.log('artists', data);
      dispatch({ type: 'SPOTIFY_ARTISTS_SUCCESS', data: data });
    }).catch(e => {
      dispatch({ type: 'SPOTIFY_ARTISTS_FAILURE', error: e });
    });
  };
}
