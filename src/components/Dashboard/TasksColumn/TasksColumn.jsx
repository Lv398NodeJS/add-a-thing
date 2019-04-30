import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './TasksColumn.scss';
import TaskItem from '../TaskItem/TaskItem';

export default class TasksColumn extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  columnTitleClass = () => {
    const { title } = this.props;

    switch (title) {
      case 'To Do':
        return 'tasksColumnToDoTitle';
      case 'In Progress':
        return 'tasksColumnInProgressTitle';
      case 'Done':
        return 'tasksColumnDoneTitle';
      default:
        return 'tasksColumnInvalidTitle';
    }
  };

  render() {
    const { sortedTasks, taskListRef, title } = this.props;

    const tasksToDisply = sortedTasks.map(
      task => (
        <TaskItem
          key={task.id}
          status={task.status}
          id={task.id}
          taskName={task.name}
          taskListRef={taskListRef}
        />
      ),
    );

    return (
      <div className="tasksColumn rounded mb-3">
        <h1 className={this.columnTitleClass()}>
          {title}
        </h1>
        <Container className="taskItemsContainer">
          {tasksToDisply}
        </Container>
      </div>
    );
  }
}
