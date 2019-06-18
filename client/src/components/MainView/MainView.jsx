import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import '@src/App.scss';
import CreateDashboard from './CreateDashboard/CreateDashboard';
import ListOfDashboards from './ListOfDashboards/ListOfDashboards';
import WelcomeView from '@MainView/Header/WelcomeView';
import Header from '@MainView/Header/Header';

export default class MainView extends React.Component {
  render() {
    let content;
    if (localStorage.getItem('token')) {
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
        <Header />
        {content}
      </>
    );
  }
}