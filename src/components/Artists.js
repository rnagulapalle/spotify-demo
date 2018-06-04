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
				{this.props.image}
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
    console.log(this.props);
    const { accessToken, refreshToken, artists } = this.props;
    console.log('artists inside component', artists);
    console.log(artists.loading);
    if (artists.loading) {
      console.log('yes');
      return <h2>Loading...</h2>;
    }
    if (!artists.artists) {
      return <h2>Something went wrong while fetching artist</h2>;
    }
    // var items = [];
    // for (var obj in artists.artists) {
    //   items.push(<Artist image={obj.images[0].url} />);
    // }

    // return (<InfiniteGrid wrapperHeight={400} entries={items} />, document.getElementById('grid'));
    return (
      <div className="msg">
        <h2>This page is under construction!</h2>
      </div>
    );
  }
}

export default connect(state => state)(Artists);
