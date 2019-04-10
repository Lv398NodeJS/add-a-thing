import React, { Component } from 'react';
import './App.scss';
import CreateDashboard from './components/CreateDashboard/CreateDashboard';
import ListOfDashboards from './components/ListOfDashboards/ListOfDashboards';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dashboards: [],
    }

    this.handler = this.handler.bind(this);
  }

  handler = (data) => {
    this.setState(prevState => ({
      dashboards: [...prevState.dashboards, data],
    }));
  }

  render() {
    const { dashboards } = this.state;
    return (
      <content className="App">
        <CreateDashboard handler={this.handler} />
        <ListOfDashboards dashes={dashboards} />
      </content>
    );
  }
}
