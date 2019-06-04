import React, { Component } from 'react';
import {
  Button,
} from 'react-bootstrap';
import ModalToCreateDashboard from './ModalToCreateDash/ModalToCreateDash';
import '../../../App.scss';

export default class CreateDashboard extends Component {
  constructor() {
    super();

    this.state = {
      showComponent: false,
      showLogin: false,
    };
  }

  toggleModal = () => {
    const { showComponent } = this.state;
    this.setState({
      showComponent: !showComponent,
    });
  };

  closeModal = () => {
    const { showLogin } = this.state;
    this.setState({
      showLogin: !showLogin,
    });
  };

  render() {
    const { showComponent } = this.state;
    return (
      <>
        <Button
          className="createDash"
          variant="primary"
          onClick={this.toggleModal}
        >
          Create new dashboard
        </Button>
        <ModalToCreateDashboard
          closeModal={this.toggleModal}
          show={showComponent}
          className="modal-to-create"
        />
      </>
    );
  }
}
