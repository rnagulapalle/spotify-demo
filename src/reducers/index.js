import {
  SPOTIFY_TOKENS, SPOTIFY_ARTISTS_BEGIN, SPOTIFY_ARTISTS_SUCCESS, SPOTIFY_ARTISTS_FAILURE
} from '../actions/actions';
  
  /** The initial state; no tokens and no user info */
const initialState = {
  accessToken: null,
  refreshToken: null,
  artists: {
    loading: false,
    external_urls: {},
    followers: {},
    genres: [],
    href: null,
    id: null,
    images: [],
    name: null,
    popularity: null,
    type: null,
    uri: null,
  }
};
  
  /**
   * Our reducer
   */
export default function reduce(state = initialState, action) {
  switch (action.type) {
    // when we get the tokens... set the tokens!
    case SPOTIFY_TOKENS:
      const {accessToken, refreshToken} = action;
      return Object.assign({}, state, {accessToken, refreshToken});
  
    // set our loading property when the loading begins
    case SPOTIFY_ARTISTS_BEGIN:
      return Object.assign({}, state, {
        artists: Object.assign({}, state.artists, {loading: true})
      });
  
    // when we get the data merge it in
    case SPOTIFY_ARTISTS_SUCCESS:
      return Object.assign({}, state, {
        artists: Object.assign({}, state.artists, action.data, {loading: false})
      });
  
    // currently no failure state :(
    case SPOTIFY_ARTISTS_FAILURE:
      return state;
  
    default:
      return state;
  }
}
  