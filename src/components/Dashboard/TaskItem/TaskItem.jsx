import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import TaskDetailsModal from '../../TaskDetails/TaskDetailsModal';
import {
  getTaskRef,
  getTaskStyleByPriority,
  getTaskStyleByStatus,
  dragStart,
  dragEnd,
} from './TaskItemUtils';
import './TaskItem.scss';

class TaskItem extends Component {
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
      taskListRef,
      id,
      taskName,
      status,
      priority,
    } = this.props;

    const {
      isDeleted,
      modalShow: modalOpen,
    } = this.state;

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
          onDragStart={e => dragStart(e)}
          onDragEnd={e => dragEnd(e)}
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

const mapStateToProps = ({ mainContainerReducer: { taskListRef } }) => ({
  taskListRef,
});

export { TaskItem as TaskItemComponent };
export default connect(mapStateToProps)(TaskItem);
