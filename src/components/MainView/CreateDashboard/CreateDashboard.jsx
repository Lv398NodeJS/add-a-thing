import React, { Component } from 'react';
import {
  Button,
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
    this.setState({
      showComponent: !showComponent,
    });
  }

  render() {
    const { showComponent } = this.state;
    const { addDashboard } = this.props;
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
          addDashboard={addDashboard}
        />
      </>
    );
  }
}
