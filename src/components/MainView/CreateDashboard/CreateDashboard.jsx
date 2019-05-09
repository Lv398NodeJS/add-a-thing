import React, { Component } from 'react';
import ModalToCreateDash from './ModalToCreateDash/ModalToCreateDash';
import '../../../App.scss';
import { Button, Modal, Form } from 'react-bootstrap';
// import uuidv1 from 'uuid/v1';
import { db } from '../../../fire';

export default class CreateDashboard extends Component {
  constructor() {
    super();

    this.state = {
      showComponent: false,
    };
  }

  toggleModal = () => {
    const { showComponent } = this.state;
    this.setState({
      showComponent: !showComponent,
    });
  }

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
        <ModalToCreateDash
          closeModal={this.toggleModal}
          show={showComponent}
          className="modal-to-create"
        />
      </>
    );
  }
}
