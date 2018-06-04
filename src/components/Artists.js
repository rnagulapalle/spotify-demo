import React, { Component } from 'react';
import { connect }      from 'react-redux';
import InfiniteGrid from 'react-infinite-grid';
import {
  getArtists,
  setTokens,
} from '../actions/actions';

class Artist extends React.Component{
  render() {
    return (
      <div className="artist">
				This is {this.props.image}
      </div>
    );
  }
}

/**
 * Our error page
 * Displays the error
 */
class Artists extends Component {
  
  componentDidMount() {
    // params injected via react-router, dispatch injected via connect
    const { dispatch, params } = this.props;
    const { accessToken, refreshToken } = params;
    dispatch(setTokens({ accessToken, refreshToken }));
    dispatch(getArtists());
  }
  render() {
    // injected via react-router
    // TODO: problem not able to find artists.. missing inside props
    // need to figure out this issue..
    console.log(this.props);
    const { accessToken, refreshToken, artists } = this.props;
    console.log('artists', artists); // it returns undefined..
    return (
      <div className="msg">
        <h2>This page is under construction!</h2>
      </div>
    );
  }
}

export default connect(state => state)(Artists);
