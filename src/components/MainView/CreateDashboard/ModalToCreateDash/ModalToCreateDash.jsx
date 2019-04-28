import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import createNewDash from './CreateNewDash';
import './ModalToCreateDash.scss';

class ModalToCreateDash extends Component {
  constructor() {
    super();
    this.state = {
      dashName: '',
      dashDescription: '',
    };
  }

  handleClose = () => {
    const { onHide } = this.props;
    onHide();
    this.setState({
      dashName: '',
      dashDescription: '',
    });
  }

  handleSaveButtonPush = () => {
    const { addDashboard, onHide } = this.props;
    const { dashName, dashDescription } = this.state;
    createNewDash(dashName, dashDescription, addDashboard);
    onHide();
    this.setState({
      dashName: '',
      dashDescription: '',
    });
  }

  handleSave = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { dashName, dashDescription } = this.state;
    return (
      <Modal
        {...this.props}
        size="lg"
        className="createBtnModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Dashboard</Modal.Title>
        </Modal.Header>
        <Form.Control
          className="modal-form"
          type="text"
          placeholder="Enter the name for the new dashboard"
          name="dashName"
          value={dashName}
          onChange={this.handleSave}
        />
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            className="modal-form"
            as="textarea"
            placeholder="Enter the description for the new dashboard"
            name="dashDescription"
            value={dashDescription}
            onChange={this.handleSave}
          />
        </Form.Group>
        <br />
        <Modal.Body>Click &apos;Save Changes&apos; to create a new dashboard</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={this.handleClose}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={this.handleSaveButtonPush}
            disabled={!dashName}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default ModalToCreateDash;
