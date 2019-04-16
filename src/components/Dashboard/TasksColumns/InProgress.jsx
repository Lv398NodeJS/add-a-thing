import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import TaskItem from '../TaskItem/TaskItem';

export default class InProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const tasksColumnInProgressTitleStyle = {
      margin: '25px auto 1px',
      textAlign: 'center',
      fontSize: '1.8rem',
      color: 'rgb(118, 183, 192)',
      borderBottom: '3px solid rgb(116, 154, 159)',
    };

    const taskItemsContainerStyle = {
      flex: '0 1 auto',
      overflow: 'scroll',
      padding: '0',
      width: '100%',
      height: '460px',
    };

    const { sortedTasks } = this.props;

    const tasksToDisply = sortedTasks.map(
      task => <TaskItem key={task.id} id={task.id} taskName={task.name} />,
    );

    return (
      <Container>
        <h1 className="tasksColumnInProgressTitle" style={tasksColumnInProgressTitleStyle}>In Progress</h1>
        <Container className="taskItemsContainer" style={taskItemsContainerStyle}>{tasksToDisply}</Container>
      </Container>
    );
  }
}
