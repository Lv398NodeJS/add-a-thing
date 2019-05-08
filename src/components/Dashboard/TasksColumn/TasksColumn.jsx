import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './TasksColumn.scss';
import { getTaskRef } from '../TaskItem/utils';
import { columnTitleClass } from './utils';
import TaskItem from '../TaskItem/TaskItem';

export default class TasksColumn extends Component {
  constructor() {
    super();
    this.state = {};
  }

  onDragOver = (task) => {
    const { title } = this.props;
    task.preventDefault();
    console.log(`This is drag over ${title}`);
  }

  onDrop = (task) => {
    task.preventDefault();

    const { taskListRef, handleDroppedTaskStatusChange } = this.props;

    const taskID = task.dataTransfer.getData('text');
    const newStatus = task.currentTarget.dataset.status;
    const taskStatusRef = getTaskRef(taskListRef, taskID).child('status');

    handleDroppedTaskStatusChange(taskStatusRef, taskID, newStatus);

    console.log(`Moved into ${task.currentTarget.dataset.status}`);
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
      <div
        className="tasks-column rounded mb-4 mb-lg-0"
      >
        <h1
          data-test="columnTitle"
          className={columnTitleClass(title)}
        >
          {title}
        </h1>
        <Container
          fluid
          onDragOver={this.onDragOver}
          onDrop={this.onDrop}
          data-status={title}
          status={title}
          className="task-items-container"
          data-test="taskItemsContainer"
        >
          {tasksToDisplay.reverse()}
        </Container>
      </div>
    );
  }
}
