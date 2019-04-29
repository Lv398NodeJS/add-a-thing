import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainView from './components/MainView/MainView';
import Dashboard from './components/Dashboard/Dashboard';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainView} />
          <Route path="/:id" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}
