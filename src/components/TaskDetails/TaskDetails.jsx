import React from 'react';
import {
  Modal, Button, Form, Container, Dropdown,
} from 'react-bootstrap';
import SubTaskList from '../SubTaskList/SubTaskList';

export default class TaskDetails extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      editMode: false,
    };
  }

  componentDidMount() {
    this.taskRef.on('value', (snapshot) => {
      const {
        name, description, status, subtaskList,
      } = snapshot.val();
      this.setState({
        name,
        description,
        status,
        subtaskList,
      });
    });
  }

  handleEditTaskDetails() {
    this.setState(prevState => ({
      editMode: !prevState.editMode,
    }));
  }

  closeTaskDetails() {
    const { onClose: close } = this.props;
    close();
  }

  handleSaveTaskDetails() {
    const { subtaskList, status } = this.state;
    const task = {
      name: this.taskName ? this.taskName.value : 'Name',
      description: this.taskDescription ? this.taskDescription.value : 'Description',
      status: this.status ? this.status : status,
      subtaskList: subtaskList || {},
    };
    this.taskRef.set(task);
    this.setState(prevState => ({
      editMode: !prevState.editMode,
      name: this.taskName ? this.taskName.value : 'Name',
      description: this.taskDescription ? this.taskDescription.value : 'Description',
      status: prevState.status,
      subtaskList: prevState.subtaskList,
    }));
  }

  render() {
    const { taskRef, show: modalShow } = this.props;
    this.taskRef = taskRef;
    this.modalShow = modalShow;
    const {
      name, description, status, editMode,
    } = this.state;

    const displayHead = editMode ? (
      <Container>
        <Form.Control
          name="taskName"
          type="text"
          placeholder="Name"
          defaultValue={name}
          ref={(taskName) => {
            this.taskName = taskName;
          }}
        />
        <Dropdown>
          <Dropdown.Toggle size="sm" variant="secondary" id="dropdown-basic">
            {'status'}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => { this.status = 'To Do'; }}>
              {'To Do'}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => { this.status = 'In Progress'; }}>
              {'In Progress'}
            </Dropdown.Item>
            <Dropdown.Item onClick={() => { this.status = 'Done'; }}>
              {'Done'}
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Container>
    ) : (
      <Container>
        {name}
        <Container>
          {status}
        </Container>
      </Container>
    );
    const displayBody = editMode
      ? (
        <Container>
          <Form.Control
            name="taskDescription"
            as="textarea"
            defaultValue={description}
            ref={(taskDescription) => {
              this.taskDescription = taskDescription;
            }
            }
          />
        </Container>
      ) : (
        <Container>
          {description}
        </Container>
      );

    return (
      <Modal
        show={modalShow}
        aria-labelledby="contained-modal-title-center"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-center">
            <Form.Label htmlFor="taskName">Name: </Form.Label>
            {displayHead}
          </Modal.Title>
          <Button type="button" className="close" aria-label="Close" onClick={() => { this.closeTaskDetails(); }}>
            <span aria-hidden="true">×</span>
          </Button>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="taskDescription">Description:</Form.Label>
          {displayBody}
          <h3>Sub task:</h3>
          {/* Sab task component */}
          <SubTaskList taskRef={this.taskRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!editMode}
            variant="outline-success"
            onClick={() => {
              this.handleSaveTaskDetails(this.taskName.value, this.taskDescription.value, status);
            }}
          >
            {'Save'}
          </Button>
          <Button
            disabled={editMode}
            variant="outline-info"
            onClick={() => { this.handleEditTaskDetails(); }}
          >
            {'Edit'}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
