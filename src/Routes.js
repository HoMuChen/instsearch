import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

// Views
import DashBoard from './views/DashBoard';
import SearchMedias from './views/SearchMedias';
import NotFound from './views/NotFound';

export default class Routes extends Component {
  render() {
    return (
      <Switch>
        <Redirect
          exact
          from="/"
          to="/dashboard"
        />
        <Route
          component={DashBoard}
          exact
          path="/dashboard"
        />
        <Route
          component={SearchMedias}
          exact
          path="/search-medias"
        />
        <Route
          component={NotFound}
          exact
          path="/not-found"
        />
        <Redirect to="/not-found" />
      </Switch>
    );
  }
}
