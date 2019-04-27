import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './ModalToDelete.scss';

class ModalToDelete extends Component {
  render() {
    const { onHide, confirmDelete } = this.props;
    return (
      <Modal
        {...this.props}
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
              variant="secondary"
              onClick={onHide}
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
