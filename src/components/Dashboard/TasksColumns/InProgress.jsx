import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './TaskColumns.scss';
import TaskItem from '../TaskItem/TaskItem';

export default class InProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { sortedTasks } = this.props;

    const tasksToDisply = sortedTasks.map(
      task => <TaskItem key={task.id} id={task.id} taskName={task.name} />,
    );

    return (
      <Container>
        <h1 className="tasksColumnInProgressTitle">In Progress</h1>
        <Container className="taskItemsContainer">{tasksToDisply}</Container>
      </Container>
    );
  }
}
