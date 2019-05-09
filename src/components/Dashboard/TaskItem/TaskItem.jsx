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

  render() {
    const { taskName } = this.props;
    const { modalShow: modalOpen } = this.state;

    return (
      <Container className="task-item-container" fluid>
        <Container
          fluid
          data-test="taskName"
          className={getTaskStyleByPriority(this.props)}
          onClick={() => this.setState({ modalShow: !modalOpen })}
        >
          {taskName}
        </Container>
        <Container>
          <TaskDetailsModal
            data-test="taskDetails"
            taskRef={getTaskRef(this.props)}
            show={modalOpen}
            onClose={() => { this.closeTaskDetails(); }}
          />
        </Container>
      </Container>
    );
  }
}
