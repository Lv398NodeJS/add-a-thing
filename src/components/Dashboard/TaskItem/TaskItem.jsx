import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import './TaskItem.scss';
import { getTaskRef, getTaskStyleByPriority, getTaskStyleByStatus } from './utils';
import TaskDetailsModal from '../../TaskDetails/TaskDetailsModal';

export default class TaskItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
      isDeleted: false,
    };
  }

  closeTaskDetails = () => {
    this.setState({ modalShow: false });
  };

  dragStart = (event) => {
    event.dataTransfer.setData('id', event.target.id);
    event.target.classList.add('dragged');
  }

  dragEnd = (event) => {
    event.target.classList.remove('dragged');
  }

  handleTaskDelete = (event) => {
    const { isDeleted } = this.state;
    const { deleteTask, taskListRef, id } = this.props;

    if (!isDeleted) {
      this.setState({ isDeleted: true });
    } else {
      const taskRef = getTaskRef(taskListRef, id);
      deleteTask(taskRef, id);
    }

    event.stopPropagation();
  }

  render() {
    const {
      taskListRef, id, taskName, status, priority,
    } = this.props;

    const { modalShow: modalOpen, isDeleted } = this.state;

    return (
      <Container
        className="task-item-container"
        fluid="true"
      >
        <Container
          fluid="false"
          draggable="true"
          data-test="taskName"
          id={id}
          className={getTaskStyleByPriority(priority)}
          onDragStart={this.dragStart}
          onDragEnd={this.dragEnd}
          onClick={() => this.setState({ modalShow: !modalOpen })}
        >
          <span className={getTaskStyleByStatus(status)}>
            {taskName}
          </span>
          <Button
            variant="light"
            className="delete-button"
            size="sm"
            as="input"
            value={!isDeleted ? '╳' : '✓'}
            onClick={this.handleTaskDelete}
            onMouseLeave={() => this.setState({ isDeleted: false })}
          />
        </Container>
        <Container>
          <TaskDetailsModal
            data-test="taskDetails"
            taskRef={getTaskRef(taskListRef, id)}
            show={modalOpen}
            onClose={() => { this.closeTaskDetails(); }}
          />
        </Container>
      </Container>
    );
  }
}
