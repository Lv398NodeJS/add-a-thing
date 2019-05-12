import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import { columnTitleClass, loaderColor } from './utils';
import TaskItem from '../TaskItem/TaskItem';
import './TasksColumn.scss';

export default class TasksColumn extends Component {
  constructor() {
    super();
    this.state = {
      tasks: [],
    };
  }

  componentDidUpdate = () => {
    const { sortedTasks } = this.props;
    const { tasks } = this.state;
    if (sortedTasks !== tasks) {
      this.setState({
        tasks: sortedTasks,
      });
    }
  }

  onDrop = (event) => {
    const { taskListRef, handleTaskDrop } = this.props;

    const taskID = event.dataTransfer.getData('taskID');
    const newStatus = event.currentTarget.dataset.status;

    handleTaskDrop(taskListRef, taskID, newStatus);

    const fakeTask = document.getElementsByClassName('drag-avatar');
    while (fakeTask.length > 0) fakeTask[0].remove();

    event.preventDefault();
  }

  render() {
    const {
      taskListRef, title, loading,
    } = this.props;

    const { tasks } = this.state;

    const tasksToDisplay = tasks.map(
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

    const loader = (
      <Loader
        type="ThreeDots"
        color={loaderColor(title)}
        height="80"
        width="100"
        className="mt-5"
      />
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
          onDragOver={e => e.preventDefault()}
          onDrop={this.onDrop}
          data-status={title}
          status={title}
          className="task-items-container h-100 px-4"
          data-test="taskItemsContainer"
        >
          {loading ? loader : tasksToDisplay}
        </Container>
      </div>
    );
  }
}
