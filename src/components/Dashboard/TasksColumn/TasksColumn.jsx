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

  dragOverHandler = (event) => {
    event.preventDefault();
  }

  dropHandler = (event) => {
    event.preventDefault();

    const { taskListRef, handleDroppedTask } = this.props;

    const taskID = event.dataTransfer.getData('text');
    const newStatus = event.currentTarget.dataset.status;
    const taskStatusRef = getTaskRef(taskListRef, taskID).child('status');

    handleDroppedTask(taskStatusRef, taskID, newStatus);
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
          fluid="true"
          onDragOver={this.dragOverHandler}
          onDrop={this.dropHandler}
          data-status={title}
          status={title}
          className="task-items-container h-100"
          data-test="taskItemsContainer"
        >
          {tasksToDisplay.reverse()}
        </Container>
      </div>
    );
  }
}
