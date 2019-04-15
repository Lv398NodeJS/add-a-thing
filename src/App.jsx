import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import MainView from './components/MainView/MainView';
import Dashboard from './Dashboard';
// import fire from './fire';
// import DashboardPreview from
// './components/MainView/ListOfDashboards/DashboardPreview/DashboardPreview';

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      id: null,
    };
    this.jumpToThisDash = this.jumpToThisDash.bind(this);
  }

  jumpToThisDash(data) {
    console.log(data);
    this.setState({
      id: data.id,
    });
  }

  render() {
    const { id } = this.state;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={() => (<MainView jumpToThisDash={this.jumpToThisDash} /> )} />
          <Route path="/:id" component={() => (<Dashboard id={id} /> )} />
        </Switch>
      </BrowserRouter>
    );
  }
}
