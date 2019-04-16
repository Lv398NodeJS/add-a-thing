import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import '../../App.scss';
import CreateDashboard from './CreateDashboard/CreateDashboard';
import ListOfDashboards from './ListOfDashboards/ListOfDashboards';
import db from '../../fire';
import getDashArrayFromDb from './getDashArrayFromDb';

class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dashboards: [],
    };
  }

  componentDidMount() {
    const dashboardsRef = db.database().ref('dashboards');
    dashboardsRef.on('value', (snapshot) => {
      const dashboardsSnap = snapshot.val();
      this.setState({
        dashboards: getDashArrayFromDb(dashboardsSnap),
      });
    });
  }

  addDashboard = (data) => {
    this.setState(prevState => ({
      dashboards: [...prevState.dashboards, data],
    }));
  }

  deleteDashboard = (data) => {
    this.setState(prevState => ({
      dashboards: prevState.dashboards.filter(dash => dash.innerId !== data.innerId),
    }));
  }

  render() {
    const { dashboards } = this.state;
    return (
      <Container className="App">
        <CreateDashboard
          addDashboard={this.addDashboard}
        />
        <ListOfDashboards
          dashboardArray={dashboards}
          deleteDashboard={this.deleteDashboard}
        />
      </Container>
    );
  }
}

export default MainView;
