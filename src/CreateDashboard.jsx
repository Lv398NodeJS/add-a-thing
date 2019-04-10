import React, { Component } from 'react';
import './App.scss';
import { Button, Modal, Form } from 'react-bootstrap';

export default class CreateDashboard extends Component {
  constructor() {
    super();

    this.handleShow = this.handleShow.bind(this);
    this.handleClose = this.handleClose.bind(this);

    this.state = {
      show: false,
    };
  }

  handleClose() {
    this.setState({ show: false });
  }

  handleShow() {
    this.setState({ show: true });
  }

  render() {
    const styles = {
      width: '90%',
      marginLeft: '5%',
      marginRight: '5%',
    };
    const { show } = this.state;
    return (
      <content className="App">
         <Button variant="primary" onClick={this.handleShow}>
          Click to create new dashboard...
        </Button>

        <Modal
          size="lg"
          show={show} 
          onHide={this.handleClose}
        >
          <Modal.Header closeButton>
            <Modal.Title>Create Dashboard</Modal.Title>
          </Modal.Header>
          <Form.Control style={styles} type="text" placeholder="Enter the name for the new dashborad" />
          <br />
          <Modal.Body>Click 'Save Changes' to create a new dashboard</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </content>
    );
  }
}
