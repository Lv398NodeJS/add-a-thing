import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './TaskItem.scss';
// import TaskDetails component here

export default class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { taskName } = this.props; // should also get 'id' and 'taskListRef' to make it work
    return (
      <Container className="taskItem">
        {taskName}
      </Container>
    );
  }
}
