import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import Loader from 'react-loader-spinner';
import './TasksColumn.scss';
import { getTaskRef } from '../TaskItem/utils';
import { columnTitleClass, loaderColor } from './utils';
import TaskItem from '../TaskItem/TaskItem';

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

  drop = (event) => {
    event.preventDefault();

    const { taskListRef, handleDroppedTask, sortedTasks } = this.props;

    const taskID = event.dataTransfer.getData('id');
    const newStatus = event.currentTarget.dataset.status;
    const taskStatusRef = getTaskRef(taskListRef, taskID).child('status');

    handleDroppedTask(taskStatusRef, taskID, newStatus, sortedTasks);
  }

  dragOver = (event) => {
    event.preventDefault();
  }

  render() {
    const {
      taskListRef, title, deleteTask, loading,
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
          deleteTask={deleteTask}
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
          onDragOver={this.dragOverHandler}
          onDrop={this.dropHandler}
          data-status={title}
          status={title}
          className="task-items-container h-100"
          data-test="taskItemsContainer"
        >
          {loading ? loader : tasksToDisplay.reverse()}
        </Container>
      </div>
    );
  }
}
