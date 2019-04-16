import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import TaskItem from '../TaskItem/TaskItem';

export default class Done extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const taskColumnDoneTitleStyle = {
      margin: '25px auto 1px',
      textAlign: 'center',
      fontSize: '1.8rem',
      color: 'rgb(194, 105, 95)',
      borderBottom: '3px solid rgb(191, 134, 123)',
    };

    const taskItemsContainerStyle = {
      flex: '0 1 auto',
      overflow: 'scroll',
      padding: '0px',
      width: '100%',
      height: '460px',
    };

    const { sortedTasks } = this.props;

    const tasksToDisply = sortedTasks.map(
      task => <TaskItem key={task.id} id={task.id} taskName={task.name} />,
    );

    return (
      <Container>
        <h1 className="taskColumnDoneTitle" style={taskColumnDoneTitleStyle}>Done</h1>
        <Container className="taskItemsContainer" style={taskItemsContainerStyle}>{tasksToDisply}</Container>
      </Container>
    );
  }
}
