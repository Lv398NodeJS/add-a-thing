import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './TasksColumn.scss';
import { columnTitleClass } from './utils';
import TaskItem from '../TaskItem/TaskItem';

export default class TasksColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      sortedTasks, taskListRef, title,
    } = this.props;

    const tasksToDisplay = sortedTasks.map(
      task => (
        <TaskItem
          key={task.id}
          status={task.status}
          priority={task.priority}
          id={task.id}
          taskName={task.name}
          taskListRef={taskListRef}
        />
      ),
    );

    return (
      <div className="tasks-column rounded mb-4 mb-lg-0">
        <h1
          data-test="columnTitle"
          className={columnTitleClass(title)}
        >
          {title}
        </h1>
        <Container
          fluid
          className="task-items-container"
          data-test="taskItemsContainer"
        >
          {tasksToDisplay.reverse()}
        </Container>
      </div>
    );
  }
}
