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
    const { dispatch, params } = this.props;
    const { accessToken, refreshToken } = params;
    dispatch(setTokens({ accessToken, refreshToken }));
    dispatch(getArtists());
  }

  constructor() {
    super();
  }

  render() {
    // injected via react-router
    const { accessToken, refreshToken, artists } = this.props;
    if (artists.loading) {
      return <h2>Loading...</h2>;
    }
    if (!artists.artists) {
      return <h2>Something went wrong while fetching artist</h2>;
    }
    return (
      <div>
        <header className="app-header"></header>
        <Title />
        <div className="app-card-list" id="app-card-list">
          {
            Object
              .keys(artists.artists)
              .map(key => <Card key={key} index={key} details={artists.artists[key]}/>)
          }
        </div>
      </div>
    );
  }
}

export default connect(state => state)(Artists);


// TODO: move them into seperate file and import

class Title extends React.Component {
  render() {
    return <section className="app-title">
      <div className="app-title-content">
        <h1>Top Artist</h1>
        <p>Covering Spotify Artist</p>
      </div>
    </section>
  }
}

class Button extends React.Component {
  render() {
    return (
      <a href={this.props.url} target="_blank">
        <button className="button button-primary">
          <i className="fa fa-chevron-right"></i> Find out more
        </button>
      </a>
    )
  }
}

class CardHeader extends React.Component {
  render() {
    const { image, type } = this.props;
    var style = { 
      backgroundImage: 'url(' + image + ')',
    };
    return (
      <header style={style} className="card-header">
        <h4 className="card-header--title">{type}</h4>
      </header>
    )
  }
}


class CardBody extends React.Component {
  render() {
    return (
      <div className="card-body">
        <img className="profile" src={this.props.image}/>
        <div className="artist-details">
          <p>{this.props.followers} Monthly Listeners</p>
          
          <h2>{this.props.name}</h2>
          
          <p className="body-content">Popularity: {this.props.popularity}</p>
          <Button url={this.props.url} />
        </div>
      </div>
    )
  }
}


class Card extends React.Component {
  render() {
    return (
      <article className="card">
        {/* <CardHeader type={this.props.details.type} image={this.props.details.images[0].url}/> */}
        <CardBody url={this.props.details.external_urls.spotify} popularity={this.props.details.popularity} followers={this.props.details.followers.total} name={this.props.details.name} image={this.props.details.images[1].url}/>
      </article>
    )
  }
}



