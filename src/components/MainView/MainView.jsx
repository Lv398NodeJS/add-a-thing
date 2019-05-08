/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import '../../App.scss';
import Col from 'react-bootstrap/es/Col';
import Row from 'react-bootstrap/es/Row';
import CreateDashboard from './CreateDashboard/CreateDashboard';
import ListOfDashboards from './ListOfDashboards/ListOfDashboards';
import { db } from '../../fire';
import getDashArrayFromDb from './getDashArrayFromDb';
import NavBar from '../Dashboard/Header/Header';
import WelcomeView from '../Dashboard/Header/WelcomeView';

class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: props.authenticated,
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
    const { dashboards, isLoggedIn } = this.state;
    let content;

    if (isLoggedIn) {
      content = (
        <Container className="App">
          <Row>
            <Col>
              <CreateDashboard
                addDashboard={this.addDashboard}
              />
              <ListOfDashboards
                dashboardArray={dashboards}
                deleteDashboard={this.deleteDashboard}
              />
            </Col>
          </Row>
        </Container>
      );
    } else {
      content = <WelcomeView />;
    }

    return (
      <>
        <NavBar />
        {content}
      </>
    );
  }
}

export default MainView;
