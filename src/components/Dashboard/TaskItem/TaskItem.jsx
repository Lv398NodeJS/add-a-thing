import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import { getTaskRef, getTaskStyleByPriority, getTaskStyleByStatus } from './utils';
import TaskDetailsModal from '../../TaskDetails/TaskDetailsModal';
import './TaskItem.scss';

export default class TaskItem extends Component {
  constructor() {
    super();

    this.state = {
      modalShow: false,
      isDeleted: false,
    };
  }

  closeTaskDetails = () => {
    this.setState({ modalShow: false });
  };

  dragStart = (event) => {
    event.dataTransfer.setData('taskID', event.target.id);
    event.target.classList.add('dragged');
  }

  dragEnd = (event) => {
    event.target.classList.remove('dragged');
  }

  deleteTaskHandle = (event) => {
    const { isDeleted } = this.state;
    const { taskListRef, id } = this.props;

    if (!isDeleted) {
      this.setState({ isDeleted: true });
    } else {
      getTaskRef(taskListRef, id).remove();
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
          id={id}
          fluid="false"
          draggable="true"
          data-test="taskName"
          className={getTaskStyleByPriority(priority)}
          onClick={() => this.setState({ modalShow: !modalOpen })}
          onDragStart={this.dragStart}
          onDragEnd={this.dragEnd}
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
            onClick={this.deleteTaskHandle}
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
