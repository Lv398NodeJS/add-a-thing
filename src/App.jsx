import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import MainView from './components/MainView/MainView';
import Dashboard from './components/Dashboard/Dashboard';
// import fire from './fire';
// import DashboardPreview from
// './components/MainView/ListOfDashboards/DashboardPreview/DashboardPreview';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      
    }
  }

  render() {
    return (
      <Router>
        <Switch>
          <Route path="/:id" component={Dashboard} />
          <Route exact path="/" component={MainView} />
        </Switch>
      </Router>
    );
  }
}
