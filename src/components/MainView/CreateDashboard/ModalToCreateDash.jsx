import React, { Component } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import db from '../../../fire';

class ModalToCreateDash extends Component {
  constructor() {
    super();
    this.state = {
      show: true,
      dashName: '',
      dashDescription: '',
    };
  }

  handleSaveButtonPush = () => {
    const { addDashboard } = this.props;
    const { dashName, dashDescription } = this.state;
    addDashboard({ dashName, dashDescription });
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

  handleClose = () => {
    this.setState({
      show: false,
    });
  }

  handleSave = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  }

  render() {
    const { show, dashName, dashDescription } = this.state;
    const styles = {
      width: '90%',
      marginLeft: '5%',
      marginRight: '5%',
      marginTop: 10,
    };
    return (
      <Modal
        size="lg"
        show={show}
        onHide={this.handleClose}
        className="createBtnModal"
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
    );
  }
}

export default ModalToCreateDash;
