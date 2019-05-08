import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './TaskItem.scss';
import { getTaskRef, getTaskStyleByPriority } from './utils';
import TaskDetailsModal from '../../TaskDetails/TaskDetailsModal';

export default class TaskItem extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalShow: false,
    };
  }

  closeTaskDetails = () => {
    this.setState({ modalShow: false });
  };

  dragStart = (task) => {
    task.target.style.opacity = '0.3';
    task.dataTransfer.setData('text', task.target.id);
    console.log(`My ID is: ${task.target.id}`);
  }

  dragEnd = (task) => {
    task.preventDefault();
    task.target.style.opacity = '1';
  }

  render() {
    const { taskListRef, id, taskName } = this.props;
    const { modalShow: modalOpen } = this.state;

    return (
      <Container className="task-item-container" fluid>
        <Container
          fluid="true"
          draggable="true"
          data-test="taskName"
          id={id}
          className={getTaskStyleByPriority(this.props)}
          onDragStart={this.dragStart}
          onDragEnd={this.dragEnd}
          onClick={() => this.setState({ modalShow: !modalOpen })}
        >
          {taskName}
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
