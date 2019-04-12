import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Main from './Main';
import fire from './fire';
// import Dashboard from './components/MainView/ListOfDashboards/Dashboard/Dashboard';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Main} />
          {/* <Route path="/:id" component={Dashboard id={dashboard.id}} */}
        </Switch>
      </BrowserRouter>
    );
  }
}
