import React, { Component } from 'react';
import { connect }      from 'react-redux';
import InfiniteGrid from 'react-infinite-grid';

import {
  getArtists,
  setTokens,
} from '../actions/actions';

//Temporarily store data here
const PostsData = [
  {
    "category": "News",
    "title": "CNN Acquire BEME",
    "text": "CNN purchased Casey Neistat's Beme app for $25million.",
    "image": "https://source.unsplash.com/user/erondu/600x400"
  },
  {
    "category": "Travel",
    "title": "Nomad Lifestyle",
    "text": "Learn our tips and tricks on living a nomadic lifestyle",
    "image": "https://source.unsplash.com/user/_vickyreyes/600x400"
  },
  {
    "category": "Development",
    "title": "React and the WP-API",
    "text": "The first ever decoupled starter theme for React & the WP-API",
    "image": "https://source.unsplash.com/user/ilyapavlov/600x400"
  },
  {
    "category": "News",
    "title": "CNN Acquire BEME",
    "text": "CNN purchased Casey Neistat's Beme app for $25million.",
    "image": "https://source.unsplash.com/user/erondu/600x400"
  },
  {
    "category": "Travel",
    "title": "Nomad Lifestyle",
    "text": "Learn our tips and tricks on living a nomadic lifestyle",
    "image": "https://source.unsplash.com/user/_vickyreyes/600x400"
  },
  {
    "category": "Development",
    "title": "React and the WP-API",
    "text": "The first ever decoupled starter theme for React & the WP-API",
    "image": "https://source.unsplash.com/user/ilyapavlov/600x400"
  }
]


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

   constructor() {
    super();
    
    this.state = {
      posts: {}
    }
  }
  componentWillMount() {
    this.setState({
      posts: PostsData
    });
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




class Title extends React.Component {
  render() {
    return <section className="app-title">
      <div className="app-title-content">
        <h1>Top Artist</h1>
        <p>Covering Spotify Artist</p>
        <a className="designer-link" href="https://dribbble.com/shots/1978243-Latest-News" target="_blank">Design from <i className="fa fa-dribbble"></i></a>
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
        <p>Followers: {this.props.followers}</p>
        
        <h2>{this.props.name}</h2>
        
        <p className="body-content">Popularity: {this.props.popularity}</p>
        <Button url={this.props.url} />
      </div>
    )
  }
}


class Card extends React.Component {
  render() {
    return (
      <article className="card">
        <CardHeader type={this.props.details.type} image={this.props.details.images[0].url}/>
        <CardBody url={this.props.details.external_urls.spotify} popularity={this.props.details.popularity} followers={this.props.details.followers.total} name={this.props.details.name}/>
      </article>
    )
  }
}



