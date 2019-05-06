import React, { Component } from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import '../../App.scss';
import CreateDashboard from './CreateDashboard/CreateDashboard';
import ListOfDashboards from './ListOfDashboards/ListOfDashboards';
import NavBar from '../Dashboard/Header/Header';

class MainView extends Component {
  render() {
    return (
      <>
        <NavBar />
        <Container className="App">
          <Row>
            <Col>
              <CreateDashboard />
              <ListOfDashboards />
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

export default MainView;
