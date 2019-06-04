import React from 'react';
import { Container, Col, Row } from 'react-bootstrap';
import { connect } from 'react-redux';
import '../../App.scss';
import CreateDashboard from './CreateDashboard/CreateDashboard';
import ListOfDashboards from './ListOfDashboards/ListOfDashboards';
import WelcomeView from '../Dashboard/Header/WelcomeView';
import Header from '../Dashboard/Header/Header';


export class MainView extends React.Component {
  render() {
    const { loggedData } = this.props;
    let content;
    if (loggedData.isLoggedIn) {
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

const mapStateToProps = state => ({
  loggedData: state.loginationReducer.loggedData,
});

export default connect(
  mapStateToProps,
)(MainView);
