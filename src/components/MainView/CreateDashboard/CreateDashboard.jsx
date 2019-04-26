import React, { Component } from 'react';
import {
  Button, Container,
} from 'react-bootstrap';
import ModalToCreateDash from './ModalToCreateDash';
import '../../../App.scss';

export default class CreateDashboard extends Component {
  constructor() {
    super();

    this.state = {
      showComponent: false,
    };
  }

  handleShow = () => {
    this.setState({ showComponent: true });
  }

  render() {
    const { showComponent } = this.state;
    const { addDashboard } = this.props;
    return (
      <Container className="App">
        <Button className="createNewDash" variant="primary" onClick={this.handleShow}>
          Create new dashboard
          {showComponent ? <ModalToCreateDash className="modal-to-create" addDashboard={addDashboard} /> : null}
        </Button>
      </Container>
    );
  }
}
