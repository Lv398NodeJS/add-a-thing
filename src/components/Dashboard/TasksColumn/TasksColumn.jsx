import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { columnTitleClass, loaderColor } from './utils';
import { TaskItem } from '../TaskItem/TaskItem';
import './TasksColumn.scss';

export class TasksColumn extends Component {
  onDrop = (event) => {
    const { handleTaskDrop } = this.props;

    const taskID = event.dataTransfer.getData('taskID');
    const newStatus = event.currentTarget.dataset.status;

    handleTaskDrop(taskID, newStatus);

    const fakeTask = document.getElementsByClassName('drag-avatar');
    while (fakeTask.length > 0) fakeTask[0].remove();

    event.preventDefault();
  }

  render() {
    const {
      title, sortedTasks, loading,
    } = this.props;

    const tasksToDisplay = sortedTasks.map(
      task => (
        <TaskItem
          key={task.id}
          status={task.status}
          priority={task.priority}
          id={task.id}
          taskName={task.name}
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
          className="task-items-container h-100 px-4 pb-4"
          data-test="taskItemsContainer"
        >
          {loading ? loader : tasksToDisplay}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  taskListRef: state.mainContainerReducer.taskListRef,
  loading: state.mainContainerReducer.loading,
});

export default connect(mapStateToProps)(TasksColumn);
