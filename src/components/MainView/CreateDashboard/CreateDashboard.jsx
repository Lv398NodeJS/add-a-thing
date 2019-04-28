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
    this.setState({
      showComponent: !showComponent,
      dashName: '',
      dashDescription: '',
    });
  }

  render() {
    const { showComponent } = this.state;
    const { addDashboard } = this.props;
    return (
      <>
        <Container className="App">
          <Button
            className="createNewDash"
            variant="primary"
            onClick={this.toggleModal}
          >
            Create new dashboard
          </Button>
        </Container>
        <ModalToCreateDash
          show={showComponent}
          onHide={this.toggleModal}
          className="modal-to-create"
          addDashboard={addDashboard}
        />
      </>
    );
  }
}
