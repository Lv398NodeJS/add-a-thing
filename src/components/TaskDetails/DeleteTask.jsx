import React from 'react';
import { Modal, Button } from 'react-bootstrap';

export default class DeleteTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: props.showDelete,
    };
  }

  handleDelete = () => {
    const { taskRef, closeTaskDetails } = this.props;
    const { showDelete } = this.state;
    taskRef.remove();
    this.setState({
      showDelete: !showDelete,
    });
    closeTaskDetails();
  };

  closeModal = () => {
    const { closeDeleteModal } = this.props;
    closeDeleteModal();
  };

  render() {
    const { showDelete } = this.props;
    return (
      <Modal
        show={showDelete}
        onHide={this.closeModal}
        aria-labelledby="contained-modal-title-center"
        centered
      >
        <Modal.Header>
          <Modal.Title>Delete task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            onClick={this.closeModal}
          >
            {'Cancel'}
          </Button>
          <Button
            variant="outline-danger"
            onClick={this.handleDelete}
          >
            {'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
