import React from 'react';
import { Modal, Button } from 'react-bootstrap';
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
            closeTaskDetails={this.closeTaskDetails}
          />
          <SubTaskList taskRef={taskRef} />
        </Modal.Body>
        <Button
          variant="outline-danger"
          onClick={() => this.setState({ showDelete: !showDelete })}
          className="delete-task-details-button float-right"
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
