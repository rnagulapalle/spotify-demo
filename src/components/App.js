import React, { Component } from 'react';

/**
 * Main app component
 * Has a header and then render's the page content
 */
export default class SpotifyLogin extends Component {
  render() {
    // injected via react router
    const {children} = this.props;
    return (
      <div className="spotify-login">
        <h1>Login With Spotify and See Top 50 Artists</h1>
        <div className="page-content">
          <p>This is a demo of the Login flow using Spotify Web API and retreiving top 50 artists.</p>
          {children}
        </div>
      </div>
    );
  }
}
