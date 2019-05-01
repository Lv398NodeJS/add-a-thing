import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import '../../App.scss';
import CreateDashboard from './CreateDashboard/CreateDashboard';
import ListOfDashboards from './ListOfDashboards/ListOfDashboards';
import db from '../../fire';
import getDashArrayFromDb from './getDashArrayFromDb';
import NavBar from '../Dashboard/Header/Header';

class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dashboards: [],
    };
  }

  componentDidMount() {
    const newArr = getDashArrayFromDb();
    this.setState({
      dashboards: newArr,
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
      <>
        <NavBar />
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
      </>
    );
  }
}

export default MainView;
