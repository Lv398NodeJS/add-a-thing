import React, {Component} from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import MainView from './components/MainView/MainView';
import Dashboard from './components/Dashboard/Dashboard';
import Login from './components/Dashboard/Header/Authentication/Login';
// import fire from './fire';
// import DashboardPreview from
// './components/MainView/ListOfDashboards/DashboardPreview/DashboardPreview';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainView} />
          <Route path="/login" component={Login} />
          {/* FIXME Dashboard component should be placeted under /dashboard/:id */}
          <Route path="/:id" component={Dashboard} />
        </Switch>
      </BrowserRouter>
    );
  }
}
