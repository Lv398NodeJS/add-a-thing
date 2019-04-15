import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import TaskItem from '../TaskItem/TaskItem';

export default class Done extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const taskColumnDoneStyle = {
      textAlign: 'center',
      margin: '25px auto 30px',
      fontSize: '1.8rem',
      color: 'rgb(194, 105, 95)',
      borderBottom: '3px solid rgb(191, 134, 123)',
    };

    const { sortedTasks } = this.props;

    const tasksToDisply = sortedTasks.map(task => <TaskItem key={task} taskName={task.name} />);
    
    return (
      <Container className="taskColumnContainer">
        <h1 className="taskColumnDoneStyle" style={taskColumnDoneStyle}>Done</h1>
        {tasksToDisply}
      </Container>
    );
  }
}
