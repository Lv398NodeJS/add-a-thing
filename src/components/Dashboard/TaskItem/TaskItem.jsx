import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './TaskItem.scss';
// import firebase and TaskDetails here

export default class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { taskName } = this.props; // should also receive 'id' to make it work

    return (
      <Container className="taskItem">
        {taskName}
      </Container>
    );
  }
}
