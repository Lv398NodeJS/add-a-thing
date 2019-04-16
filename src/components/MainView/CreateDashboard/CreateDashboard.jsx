import React, { Component } from 'react';
import '../../../App.scss';
import { Button, Modal, Form } from 'react-bootstrap';
// import uuidv1 from 'uuid/v1';
import db from '../../../fire';

export default class CreateDashboard extends Component {
  constructor() {
    super();

    this.state = {
      show: false,
      dashName: '',
      dashDescription: '',
    };
  }

  handleSaveButtonPush = () => {
    const { handleAddDashboard } = this.props;
    const { dashName, dashDescription } = this.state;
    handleAddDashboard({ dashName, dashDescription });
    const dashboardsRef = db.database().ref('dashboards');
    const dashboard = {
      name: dashName,
      description: dashDescription,
    };
    dashboardsRef.push(dashboard);
    this.setState({
      show: false,
      dashName: '',
      dashDescription: '',
    });
  }

  handleShow = () => {
    this.setState({ show: true });
  }

  handleSave = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  handleClose = () => {
    this.setState({
      show: false,
    });
  }

  render() {
    const styles = {
      width: '90%',
      marginLeft: '5%',
      marginRight: '5%',
      marginTop: 10,
    };
    const { show, dashName, dashDescription } = this.state;
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
          <Form.Control
            style={styles}
            type="text"
            placeholder="Enter the name for the new dashboard"
            name="dashName"
            value={dashName}
            onChange={this.handleSave}
          />
          <Form.Group controlId="exampleForm.ControlTextarea1">
            <Form.Control
              style={styles}
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
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={this.handleSaveButtonPush} disabled={!dashName}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </content>
    );
  }
}
