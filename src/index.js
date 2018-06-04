import React, { Component } from 'react';
import { render }           from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk        from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistory, routeReducer }     from 'react-router-redux';
import { createHistory } from 'history';
import reducer from './reducers';
import App     from './components/App';
import Login   from './components/Login';
import User    from './components/User';
import Error   from './components/Error';
import Artists   from './components/Artists';

import "./assets/stylesheets/style.scss";
// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(hashHistory)
const createStoreWithMiddleware = applyMiddleware(
  thunk,
  reduxRouterMiddleware
)(createStore)
const store = createStoreWithMiddleware(reducer);

class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router history={hashHistory}>
          <Route path="/" component={App}>
            <IndexRoute component={Login} />
            {/* <Route path="/user/:accessToken/:refreshToken" component={User} /> */}
            <Route path="/error/:errorMsg" component={Error} />
            <Route path="/artists/:accessToken/:refreshToken" component={Artists} />
          </Route>
        </Router>
      </Provider>
    );
  }
}

// render town
const rootElement = document.getElementById('root');
render(<Root />, rootElement);
