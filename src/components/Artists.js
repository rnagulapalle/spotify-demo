import React, { Component } from 'react';
import { connect }      from 'react-redux';
import {
  getArtists,
  setTokens,
} from '../actions/actions';
/**
 * Our error page
 * Displays the error
 */
class Artists extends Component {
  componentDidMount() {
    // params injected via react-router, dispatch injected via connect
    const {dispatch, params} = this.props;
    const {accessToken, refreshToken} = params;
    dispatch(setTokens({accessToken, refreshToken}));
    dispatch(getArtists());
  }
  render() {
    // injected via react-router
    const { accessToken, refreshToken, user } = this.props;
    return (
      <div className="msg">
        <h2>Hello World!</h2>
      </div>
    );
  }
}

export default connect(state => state)(Artists);