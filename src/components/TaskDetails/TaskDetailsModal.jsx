import React from 'react';
import {
  Modal, Button, Container,
} from 'react-bootstrap';
import TaskDetails from './TaskDetails';
import SubTaskList from '../SubTaskList/SubTaskList';

export default class TaskDetailsModal extends React.Component {
  closeTaskDetails = () => {
    const { onClose: close } = this.props;
    close();
  };

  render() {
    const { taskRef, show: modalShow } = this.props;
    this.modalShow = modalShow;
    return (
      <Modal
        show={modalShow}
        onHide={this.closeTaskDetails}
        aria-labelledby="contained-modal-title-center"
        centered
      >
        <Modal.Header className="MainModalTD">
          {'Task details'}
          <Button type="button" className="close" aria-label="Close" onClick={() => { this.closeTaskDetails(); }}>
            <span aria-hidden="true">×</span>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <TaskDetails
            taskRef={taskRef}
          />
          <Container>
            <SubTaskList taskRef={taskRef} />
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}
