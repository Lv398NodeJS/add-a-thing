import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import '../../App.scss';
import CreateDashboard from './CreateDashboard/CreateDashboard';
import ListOfDashboards from './ListOfDashboards/ListOfDashboards';
import WelcomeView from '../Dashboard/Header/WelcomeView';
import NavBar from '../Dashboard/Header/Header';

class MainView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoggedIn: props.isLoggedIn,
    };
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
        <NavBar isLoggedIn={isLoggedIn} />
        {content}
      </>
    );
  }
}

export default MainView;
