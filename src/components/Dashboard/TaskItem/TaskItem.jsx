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

  dragStartHandler = (event) => {
    event.dataTransfer.setData('text', event.target.id);
    event.currentTarget.style.border = '1px dashed grey';
    event.currentTarget.style.opacity = '0.7';
  }

  dragEndHandler = (event) => {
    event.preventDefault();
    event.currentTarget.style.border = 'none';
    event.currentTarget.style.opacity = '1';
  }

  render() {
    const { taskListRef, id, taskName } = this.props;
    const { modalShow: modalOpen } = this.state;

    return (
      <Container
        className="task-item-container"
        fluid="true"
      >
        <Container
          fluid="true"
          draggable="true"
          data-test="taskName"
          id={id}
          className={getTaskStyleByPriority(this.props)}
          onDragStart={this.dragStartHandler}
          onDragEnd={this.dragEndHandler}
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
