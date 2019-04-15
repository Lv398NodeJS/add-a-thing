import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainView from './components/MainView/MainView';
import Dashboard from './Dahsboard';
// import fire from './fire';
// import DashboardPreview from
// './components/MainView/ListOfDashboards/DashboardPreview/DashboardPreview';

export default class App extends Component {
  componentWillReceiveProps() {
    this.forceUpdate();
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={MainView} />
          <Route path="/:id" component={() => (<Dashboard id={id} /> )} />
        </Switch>
      </BrowserRouter>
    );
  }
}
