import React, { Component } from 'react';
import { Container, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TaskDetailsModal from '../../TaskDetails/TaskDetailsModal';
import * as taskActions from '../../../actions/taskDetailsActions';
import './TaskItem.scss';
import del from '../../assets/delete.svg';
import accept from '../../assets/accept.svg';
import {
  // getTaskRef,
  getTaskStyleByPriority,
  getTaskStyleByStatus,
  dragStart,
  dragEnd,
} from './TaskItemUtils';

class TaskItem extends Component {
  constructor() {
    super();
    this.state = {
      modalShow: false,
      isDeleted: false,
    };
  }

  openTaskDetails = () => {
    const { id, modalOpen, taskDetailsActions } = this.props;
    taskDetailsActions.fetchTaskDetails(id);
    this.setState({ modalShow: !modalOpen });
  }

  closeTaskDetails = () => {
    this.setState({ modalShow: false });
  };

  deleteTaskHandle = (event) => {
    const { isDeleted } = this.state;
    // const { taskListRef, id } = this.props;

    if (!isDeleted) {
      this.setState({ isDeleted: true });
    } else {
      // getTaskRef(taskListRef, id).remove();
    }

    event.stopPropagation();
  }

  render() {
    const {
      // taskListRef,
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
          onClick={this.openTaskDetails}
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
            onClick={this.deleteTaskHandle}
            onMouseLeave={() => this.setState({ isDeleted: false })}
          >
            {!isDeleted
              ? <img src={del} alt={del} className="delete-icon" draggable="false" />
              : <img src={accept} alt={accept} className="accept-icon" draggable="false" />}
          </Button>
        </Container>
        <Container>
          <TaskDetailsModal
            data-test="taskDetails"
          // taskRef={getTaskRef(taskListRef, id)}
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

const mapDispatchToProps = dispatch => ({
  taskDetailsActions: bindActionCreators(taskActions, dispatch),
});

export { TaskItem as TaskItemComponent };
export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
