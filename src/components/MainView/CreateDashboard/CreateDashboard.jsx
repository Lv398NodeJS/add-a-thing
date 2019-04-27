import React, { Component } from 'react';
import {
  Button, Container,
} from 'react-bootstrap';
import ModalToCreateDash from './ModalToCreateDash/ModalToCreateDash';
import '../../../App.scss';

export default class CreateDashboard extends Component {
  constructor() {
    super();

    this.state = {
      showComponent: false,
    };
  }

  toggleModal = () => {
    const { showComponent } = this.state;
    this.setState({ showComponent: !showComponent });
  }

  render() {
    const { showComponent } = this.state;
    const { addDashboard } = this.props;
    if (!showComponent) {
      return (
        <Container className="App">
          <Button className="createNewDash" variant="primary" onClick={this.toggleModal}>
            Create new dashboard
          </Button>
        </Container>
      );
    }
    return (
      <ModalToCreateDash
        className="modal-to-create"
        addDashboard={addDashboard}
        closeModal={this.toggleModal}
      />
    );
  }
}
