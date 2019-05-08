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
      styleBeforeDrop: '',
    };
  }

  closeTaskDetails = () => {
    this.setState({ modalShow: false });
  };

  dragStartHandler = (event) => {
    event.dataTransfer.setData('id', event.target.id);
    event.currentTarget.style.border = '1px dashed grey';
    event.currentTarget.style.opacity = '0.7';

    this.setState({
      styleBeforeDrop: event.currentTarget.style,
    });
  }

  dragEndHandler = (event) => {
    event.preventDefault();
    const { styleBeforeDrop } = this.state;
    event.currentTarget.style = styleBeforeDrop;
  }

  render() {
    const {
      taskListRef, id, taskName, taskDelete, status, priority,
    } = this.props;

    const { modalShow: modalOpen } = this.state;
    const taskRef = getTaskRef(taskListRef, id);

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
          onDragStart={this.dragStartHandler}
          onDragEnd={this.dragEndHandler}
          onClick={() => this.setState({ modalShow: !modalOpen })}
        >
          <span className={getTaskStyleByStatus(status)}>{taskName}</span>
          <Button
            variant="light"
            className="delete-button"
            size="sm"
            as="input"
            value="╳"
            onClick={() => taskDelete(taskRef, id)}
          />
        </Container>
        <Container>
          <TaskDetailsModal
            data-test="taskDetails"
            taskRef={taskRef}
            show={modalOpen}
            onClose={() => { this.closeTaskDetails(); }}
          />
        </Container>
      </Container>
    );
  }
}
