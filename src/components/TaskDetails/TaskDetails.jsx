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
        name, description, status, subtaskList, priority,
      } = snapshot.val();
      this.setState({
        name,
        description,
        status,
        priority,
        subtaskList,
      });
    });
  }

  closeTaskDetails = () => {
    const { onClose: close } = this.props;
    close();
  }

  handleEditTaskDetails() {
    this.setState(prevState => ({
      editMode: !prevState.editMode,
    }));
  }

  handleSaveTaskDetails() {
    const { subtaskList, status, priority } = this.state;
    const task = {
      name: this.taskName ? this.taskName.value : 'Name',
      description: this.taskDescription ? this.taskDescription.value : 'Description',
      status: this.status ? this.status : status,
      priority: this.priority ? this.priority : priority,
      subtaskList: subtaskList || {},
    };
    this.taskRef.set(task);
    this.setState(prevState => ({
      editMode: !prevState.editMode,
      name: this.taskName ? this.taskName.value : 'Name',
      description: this.taskDescription ? this.taskDescription.value : 'Description',
      status: prevState.status,
      priority: prevState.priority,
      subtaskList: prevState.subtaskList,
    }));
  }

  render() {
    const { taskRef, show: modalShow } = this.props;
    this.taskRef = taskRef;
    this.modalShow = modalShow;
    const {
      name, description, status, editMode, priority,
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
        <Container>
          <Dropdown>
            <Dropdown.Toggle size="sm" variant="secondary" id="dropdown-basic">
              {'priority'}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => { this.priority = 'High'; }}>
                {'High'}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => { this.priority = 'Medium'; }}>
                {'Medium'}
              </Dropdown.Item>
              <Dropdown.Item onClick={() => { this.priority = 'Low'; }}>
                {'Low'}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
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

    switch (priority) {
      case 'High':
        this.priorityColor = '#ff666b';
        break;

      case 'Medium':
        this.priorityColor = '#9effbd';
        break;

      case 'Low':
        this.priorityColor = '#fff98b';
        break;

      default:
        this.priorityColor = '#9fa1a3';
        break;
    }

    return (
      <Modal
        show={modalShow}
        aria-labelledby="contained-modal-title-center"
        centered
        onHide={this.closeTaskDetails}
      >
        <Modal.Header style={{ backgroundColor: this.priorityColor }}>
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
          <SubTaskList taskRef={this.taskRef} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            disabled={!editMode}
            variant="outline-success"
            onClick={() => {
              this.handleSaveTaskDetails(this.taskName.value, this.taskDescription.value,
                status, priority);
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
