# Spotify Integration Demo App

## OVERVIEW
This app is intended to demonstrate Login with Spotify and integration of Web-API:

* Login with Spotify
* Retrieve 50 artists (given ids) and sort them by populaity.

## Tech stack

* NodeJs (Express)
* React + Redux
* Webpack

## Spotify modules

* spotify-web-api-js : For calling Spotify API from browser.
* spotify-web-api-node: Server side module for calling Spotify APIs.

## UP & RUNNING
Install dependencies:
```
$ npm install
```
_or_
```
$ yarn
```

Fire up a development server:
```
$ yarn dev
```

Once the server is running, you can visit `http://localhost:8080/`

## Linting
_This assumes you have eslint and eslint-watch installed. If you don't, run the following:_
```
$ npm i -g eslint eslint-watch
```
or if you need permissions:
```
$ sudo npm i -g eslint eslint-watch
```

To run the linter once:
```
$ yarn lint
```

To run the watch task:
```
$ yarn lint:watch
```

## Production Build

To build your production assets and run the server:
```
$ yarn start
```

## DEPLOYING TO HEROKU
This app is set up for deployment to Heroku!

_This assumes you have already have a Heroku account and have the [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed_
```
$ heroku login
$ heroku create -a name-of-your-app
$ git push heroku master
$ heroku open
```

Heroku will follow the `build` command in your `package.json` and compile assets with `webpack.prod.config.js`. It runs the Express web server in `server.js`.