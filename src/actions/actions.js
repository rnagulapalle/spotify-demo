import Spotify from 'spotify-web-api-js';
import artistsIds from '../data/artists.json';
const spotifyApi = new Spotify();

// our constants
export const SPOTIFY_TOKENS = 'SPOTIFY_TOKENS';
export const SPOTIFY_ARTISTS_BEGIN = 'SPOTIFY_ARTISTS_BEGIN';
export const SPOTIFY_ARTISTS_SUCCESS = 'SPOTIFY_ARTISTS_SUCCESS';
export const SPOTIFY_ARTISTS_FAILURE = 'SPOTIFY_ARTISTS_FAILURE';

/** set the app's access and refresh tokens */
export function setTokens({ accessToken, refreshToken }) {
  if (accessToken) {
    spotifyApi.setAccessToken(accessToken);
  }
  return { type: SPOTIFY_TOKENS, accessToken, refreshToken };
}

export function getArtists() {
  return dispatch => {
    dispatch({ type: SPOTIFY_ARTISTS_BEGIN });
    spotifyApi.getArtists(artistsIds).then(data => {
      // sort by popularity
      sortByPopularity(data);
      
      dispatch({ type: SPOTIFY_ARTISTS_SUCCESS, data: data });
    }).catch(e => {
      dispatch({ type: SPOTIFY_ARTISTS_FAILURE, error: e });
    });
  };

  function sortByPopularity(data) {
    data.artists.sort((a, b) => {
      return a.popularity - b.popularity;
    }).reverse();
  }
}
