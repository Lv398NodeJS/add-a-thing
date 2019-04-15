import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormGroup from 'react-bootstrap/FormGroup';
import { Container } from 'react-bootstrap';

export default class TaskDetails extends React.Component {
  constructor(...args) {
    super(...args);
    const { currentTaskData } = this.props;
    this.state = {
      editMode: false,
      currentTaskData
    };
    this.closeTaskDetails = this.closeTaskDetails.bind(this);
    this.handleSaveTaskDetails = this.handleSaveTaskDetails.bind(this);
    this.handleEditTaskDetails = this.handleEditTaskDetails.bind(this);
    this.updateTaskList = this.updateTaskList.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  updateTaskList = (updatedTaskList) => {
    const { updateTaskList } = this.props;
    updateTaskList(updatedTaskList);
  }

  deleteTask = (deletedTaskID) => {
    const { deleteTask } = this.props;
    deleteTask(deletedTaskID);
  }

  closeTaskDetails() {
    const { onClose: close } = this.props;
    close();
  }

  handleEditTaskDetails() {
    this.setState(prevState => ({
      editMode: !prevState.editMode,
    }));
  }

  handleSaveTaskDetails() {
    this.setState(prevState => ({
      editMode: !prevState.editMode,
      taskNameText: this.taskName ? this.taskName.value : 'Name',
      taskDescriptionText: this.taskDescription ? this.taskDescription.value : 'Description',
    }));
  }
  // handleSaveTaskDetails() {
  //   this.setState(prevState => (
  //     taskList: prevState.taskList.map(task =>
  //       task.id === prevState.taskID ? )
  //     ));
  // }

  render() {
    const stylesForSubTask = {
      width: '100%',
      height: 100,
      backgroundColor: 'gray',
      borderRadius: 2,
    };
    const stylesForDescription = {
      width: '100%',
      height: 100,
    };

    const { currentTaskData } = this.state;
    const { show: modalShow } = this.props;
    const { taskNameText, taskDescriptionText, editMode } = this.state;
    const displayHead = editMode ? (
      <Form>
        <FormGroup>
          <Form.Label htmlFor="taskName">Name:</Form.Label>
          <Form.Control
            ref={(taskName) => {
              this.taskName = taskName;
            }}
            name="taskName"
            type="text"
            placeholder="Name"
          />
        </FormGroup>
      </Form>
    ) : <p>{taskNameText}</p>;
    const displayBody = editMode
      ? (
        <Form>
          <FormGroup>
            <Form.Label htmlFor="taskDescription">Description:</Form.Label>
            <Form.Control
              name="taskDescription"
              as="textarea"
              ref={(taskDescription) => {
                this.taskDescription = taskDescription;
              }}
            />
          </FormGroup>
        </Form>
      ) : <Container style={stylesForDescription}><p>{taskDescriptionText}</p></Container>;
    const { onClose } = this.props;
    return (
      <Container>
        <Modal
          show={ modalShow }
          {...this.props}
          aria-labelledby="contained-modal-title-center"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-center">{displayHead}</Modal.Title>
            <Button type="button" className="close" aria-label="Close" onClick={this.closeTaskDetails}>
              <span aria-hidden="true">×</span>
            </Button>
          </Modal.Header>
          <Modal.Body>
            {displayBody}
            <h3>Sub task:</h3>
            <Container style={stylesForSubTask} />
          </Modal.Body>
          <Modal.Footer>
            <Button
              style={{ position: 'absolute', left: 15 }}
              disabled={editMode}
              variant="danger"
              onClick={() => this.deleteTask(currentTaskData.id)}
            >
              Delete
            </Button>
            <Button
              disabled={!editMode}
              variant="outline-success"
              onClick={() => {
                this.handleSaveTaskDetails(this.taskName.value, this.taskDescription.value);
              }}
            >
              Save
            </Button>
            <Button
              disabled={editMode}
              variant="outline-info"
              onClick={this.handleEditTaskDetails}
            >
              Edit
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    );
  }
}
