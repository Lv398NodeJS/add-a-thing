import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './TaskItem.scss';
import { getTaskRef, getTaskStyleByPriority } from './utils';
import TaskDetails from '../../TaskDetails/TaskDetails';

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
      <Container className="TaskItemContainer">
        <Container
          data-test="taskName"
          className={getTaskStyleByPriority(this.props) || 'taskItem'}
          onClick={() => this.setState({ modalShow: !modalOpen })}
        >
          {taskName}
        </Container>
        <Container>
          <TaskDetails
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
