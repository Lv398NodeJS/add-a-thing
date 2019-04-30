import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ModalToDelete.scss';

class ModalToDelete extends Component {
  constructor(props) {
    super(props);

    this.state = { show: props.show };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show: nextProps.show });
  }

  handleClose = () => {
    const { toggleModal } = this.props;
    toggleModal();
    this.setState({ show: false });
  }

  render() {
    const { confirmDelete } = this.props;
    const { show } = this.state;
    return (
      <Modal
        onHide={this.handleClose}
        show={show}
        className="confirm-delete-modal"
      >
        <Modal.Dialog className="delete-message">
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete this dashboard?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>This action cannot be undone.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button
              className="cancel-btn"
              variant="secondary"
              onClick={this.handleClose}
            >
            Cancel
            </Button>
            <Button
              variant="outline-danger"
              onClick={confirmDelete}
            >
              Delete this dashboard
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    );
  }
}

export default ModalToDelete;
