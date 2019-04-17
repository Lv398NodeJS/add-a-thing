/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
import React, {Component} from 'react';
import {Container} from 'react-bootstrap';
import '../../App.scss';
import CreateDashboard from './CreateDashboard/CreateDashboard';
import ListOfDashboards from './ListOfDashboards/ListOfDashboards';
import db from '../../fire';
import getDashArrayFromDb from './getDashArrayFromDb';
import NavBar from "../Dashboard/Header/Header";
import Col from "react-bootstrap/es/Col";
import Row from "react-bootstrap/es/Row";

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
    const {dashboards} = this.state;
    return (
      <>
        <NavBar />
        <Container className="App">
          <Row>
            <Col>
              <CreateDashboard
                handleAddDashboard={this.addDashboard}
              />
              <ListOfDashboards
                dashboardArray={dashboards}
                deleteDashboard={this.deleteDashboard}
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default MainView;
