import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './App.scss';
import CreateDashboard from './components/MainView/CreateDashboard/CreateDashboard';
import ListOfDashboards from './components/MainView/ListOfDashboards/ListOfDashboards';

export default class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dashboards: [],
    };

    this.addDashboard = this.addDashboard.bind(this);
    this.deleteDashboard = this.deleteDashboard.bind(this);
  }

  addDashboard = (data) => {
    this.setState(prevState => ({
      dashboards: [...prevState.dashboards, data],
    }));
  }

  deleteDashboard = (data) => {
    this.setState(prevState => ({
      dashboards: prevState.dashboards.filter(dash => dash.id !== data.id),
    }));
  }

  render() {
    const { dashboards } = this.state;
    return (
      <Container className="App">
        <CreateDashboard
          handleAddDashboard={this.addDashboard}
        />
        <ListOfDashboards
          dashes={dashboards}
          deleteDashboard={this.deleteDashboard}
        />
      </Container>
    );
  }
}
