import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import '../../App.scss';
import CreateDashboard from './CreateDashboard/CreateDashboard';
import ListOfDashboards from './ListOfDashboards/ListOfDashboards';
import db from '../../fire';
import getDashArrayFromDb from './getDashArrayFromDb';
import WelcomeView from '../Dashboard/Header/WelcomeView';

class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: props.isLoggedIn,
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
    const { isLoggedIn } = this.state;
    let content;

    if (isLoggedIn) {
      content = (
        <Container className="App">
          <Row>
            <Col>
              <CreateDashboard />
              <ListOfDashboards />
            </Col>
          </Row>
        </Container>
      );
    } else {
      content = <WelcomeView />;
    }

    return (
      <>
        {content}
      </>
    );
  }
}

export default MainView;
