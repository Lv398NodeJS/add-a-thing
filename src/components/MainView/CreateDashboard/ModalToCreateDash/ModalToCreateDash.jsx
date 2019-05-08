import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Modal, Form, Button } from 'react-bootstrap';
import createNewDash from './CreateNewDash';
import './ModalToCreateDash.scss';
import * as viewActions from '../../../../actions/mainViewActions';

export class ModalToCreateDash extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: props.show,
      dashName: '',
      dashDescription: '',
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show: nextProps.show });
  }

  handleClose = () => {
    const { closeModal } = this.props;
    closeModal();
    this.setState({
      show: false,
      dashName: '',
      dashDescription: '',
    });
  }

  handleSaveButtonPush = () => {
    const { closeModal, mainViewActions } = this.props;
    const { dashName, dashDescription } = this.state;
    createNewDash(dashName, dashDescription, mainViewActions.addDashboard);
    closeModal();
    this.setState({
      show: false,
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
    const { dashName, dashDescription, show } = this.state;
    return (
      <Modal
        onHide={this.handleClose}
        show={show}
        size="lg"
        className="createBtnModal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Create Dashboard</Modal.Title>
        </Modal.Header>
        <Form.Control
          className="modal-form dash-name"
          type="text"
          placeholder="Enter the name for the new dashboard"
          name="dashName"
          value={dashName}
          onChange={this.handleSave}
        />
        <Form.Group controlId="exampleForm.ControlTextarea1">
          <Form.Control
            className="modal-form dash-description"
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
            className="close-button"
            variant="secondary"
            onClick={this.handleClose}
          >
            Close
          </Button>
          <Button
            className="save-changes"
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

const mapDispatchToProps = dispatch => ({
  mainViewActions: bindActionCreators(viewActions, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(ModalToCreateDash);
