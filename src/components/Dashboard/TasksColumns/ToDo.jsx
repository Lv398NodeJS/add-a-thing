import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './TaskColumns.scss';
import TaskItem from '../TaskItem/TaskItem';

export default class ToDo extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const { sortedTasks, taskListRef } = this.props;

    const tasksToDisply = sortedTasks.map(
      task => (
        <TaskItem
          key={task.id}
          id={task.id}
          taskName={task.name}
          taskListRef={taskListRef}
        />
      ),
    );

    return (
      <Container>
        <h1 className="tasksColumnToDoTitle">To Do</h1>
        <Container className="taskItemsContainer">{tasksToDisply}</Container>
      </Container>
    );
  }
}
