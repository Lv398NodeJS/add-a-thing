import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './TaskItem.scss';
import TaskDetails from '../../TaskDetails/TaskDetails';

export default class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
    };
  }

  closeTaskDetails() {
    this.setState({ modalShow: false });
  }

  render() {
    const {
      taskName, taskListRef, id, status,
    } = this.props;
    const taskRef = taskListRef.child(`${id}`);
    const { modalShow: modalOpen } = this.state;
    return (
      <Container className="taskItemContainer">
        <Container className={status === 'Done' ? 'taskItemDone' : 'taskItem'} onClick={() => this.setState({ modalShow: !modalOpen })}>
          {taskName}
        </Container>
        <Container>
          <TaskDetails
            taskRef={taskRef}
            show={modalOpen}
            onClose={() => { this.closeTaskDetails(); }}
          />
        </Container>
      </Container>
    );
  }
}
