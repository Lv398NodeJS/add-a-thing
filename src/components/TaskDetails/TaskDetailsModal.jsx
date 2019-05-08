import React from 'react';
import {
  Modal, Button, Container,
} from 'react-bootstrap';
import TaskDetails from './TaskDetails';
import SubTaskList from '../SubTaskList/SubTaskList';
import DeleteTask from './DeleteTask';

export default class TaskDetailsModal extends React.Component {
  constructor() {
    super();
    this.state = {
      showDelete: false,
    };
  }

  closeTaskDetails = () => {
    const { onClose: close } = this.props;
    close();
  };

  closeDeleteModal = () => {
    const { showDelete } = this.state;
    this.setState({
      showDelete: !showDelete,
    });
  };

  render() {
    const { taskRef, show: modalShow } = this.props;
    const { showDelete } = this.state;
    this.modalShow = modalShow;
    return (
      <Modal
        show={modalShow}
        onHide={this.closeTaskDetails}
        aria-labelledby="contained-modal-title-center"
        centered
      >
        <Modal.Body>
          <TaskDetails
            taskRef={taskRef}
          />
          <Container>
            <SubTaskList taskRef={taskRef} />
          </Container>
        </Modal.Body>
        <Button
          variant="outline-danger"
          onClick={() => this.setState({ showDelete: !showDelete })}
          className="delete-button"
        >
          {'Delete'}
        </Button>
        <DeleteTask
          taskRef={taskRef}
          showDelete={showDelete}
          closeTaskDetails={this.closeTaskDetails}
          closeDeleteModal={this.closeDeleteModal}
        />
      </Modal>
    );
  }
}
