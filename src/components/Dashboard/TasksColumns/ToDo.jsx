import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import TaskItem from '../TaskItem/TaskItem';

export default class ToDo extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const tasksColumnToDoTitleStyle = {
      margin: '25px auto 1px',
      textAlign: 'center',
      fontSize: '1.8rem',
      color: 'rgb(103, 102, 106)',
      borderBottom: '3px solid rgb(103, 102, 106)',
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
        <h1 className="tasksColumnToDoTitle" style={tasksColumnToDoTitleStyle}>To Do</h1>
        <Container className="taskItemsContainer" style={taskItemsContainerStyle}>{tasksToDisply}</Container>
      </Container>
    );
  }
}
