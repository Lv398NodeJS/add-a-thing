import React from 'react';
import { Container, ButtonGroup, Button } from 'react-bootstrap';
import EditName from './EditName';
import EditDescription from './EditDescription';
import TaskStatus from './TaskStatus';
import TaskPriority from './TaskPriority';
import './TaskDetailsStyle.scss';

export default class TaskDetails extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      editName: false,
      editDescription: false,
    };
  }

  componentDidMount() {
    const { taskRef } = this.props;
    if (!taskRef) return;
    taskRef.on('value', (snapshot) => {
      const {
        name, description, status, priority, subtaskList,
      } = snapshot.val() ? snapshot.val() : {};
      this.setState({
        name,
        description,
        status,
        priority,
        subtaskList,
      });
    });
  }

  handleEditName = () => {
    const { editName } = this.state;
    this.setState({
      editName: !editName,
    });
  };

  handleEditDescription = () => {
    const { editDescription } = this.state;
    this.setState({
      editDescription: !editDescription,
    });
  };

  handleSaveTaskDetails =(taskName, taskDescription, taskStatus, taskPriority) => {
    const {
      name, description, status, priority,
    } = this.state;
    const { taskRef } = this.props;
    this.setState(() => ({
      name: taskName || name,
      description: taskDescription || description,
      status: taskStatus || status,
      priority: taskPriority || priority,
    }));
    const { subtaskList } = this.state;
    const task = {
      name: taskName || name || {},
      description: taskDescription || description || {},
      status: taskStatus || status || {},
      priority: taskPriority || priority || {},
      subtaskList: subtaskList || {},
    };
    taskRef.set(task);
  };

  render() {
    const {
      name, description, editName, editDescription, status, priority,
    } = this.state;
    const { closeTaskDetails } = this.props

    const nameContext = editName
      ? (
        <EditName
          name={name}
          editName={editName}
          closeEditNameField={this.handleEditName}
          saveName={this.handleSaveTaskDetails}
        />
      ) : (
        <Container
          className="open-edit-name"
          onClick={this.handleEditName}
        >
          {name}
        </Container>
      );
    const descriptionContext = editDescription
      ? (
        <EditDescription
          description={description}
          editDescription={editDescription}
          closeEditDescriptionField={this.handleEditDescription}
          saveDescription={this.handleSaveTaskDetails}
        />
      ) : (
        <Container
          className="open-edit-description"
          onClick={this.handleEditDescription}
        >
          {description || 'Description'}
        </Container>
      );

    return (
      <Container className="task-details pl-0">
        {'Name:'}
        <Button
          className="close-task-button cancel-button float-right px-0"
          onClick={closeTaskDetails}
        >
          {'╳'}
        </Button>
        <Container className="task-details-container main-modal-for-taskN">
          {nameContext}
        </Container>
        {'Description:'}
        <Container className="task-details-container description-container main-modal-for-taskD">
          {descriptionContext}
        </Container>
        <ButtonGroup>
          <TaskStatus
            status={status}
            changeStatus={this.handleSaveTaskDetails}
          />
          <TaskPriority
            priority={priority}
            changePriority={this.handleSaveTaskDetails}
          />
        </ButtonGroup>
      </Container>
    );
  }
}
