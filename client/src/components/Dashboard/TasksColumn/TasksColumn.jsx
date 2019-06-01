import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import Loader from 'react-loader-spinner';
import { columnTitleClass, loaderColor } from './TasksColumnUtils';
import TaskItem from '../TaskItem/TaskItem';
import SortList from '../SortList/SortList';
import { sortComparer } from '../SortList/sortUtils';
import './TasksColumn.scss';

class TasksColumn extends Component {
  onDrop = (event) => {
    event.preventDefault();

    const { handleTaskDrop } = this.props;

    const taskID = event.dataTransfer.getData('taskID');
    const newStatus = event.currentTarget.dataset.status;

    handleTaskDrop(taskID, newStatus);

    const fakeTask = document.getElementById('drag-avatar');
    if (fakeTask != null) fakeTask.remove();
    document.getElementById('delete-zone').classList.remove('shown');
  };

  render() {
    const {
      title, filteredTasks, loading, allSortSettings = {},
    } = this.props;

    const sortIconColor = loaderColor(title);

    const storageKey = `${document.URL.split('/').pop()}:${title}`;
    const sortState = allSortSettings[storageKey] || {};
    const sortedTasks = [...filteredTasks].sort(sortComparer(sortState.field, sortState.direction));

    const tasksToDisplay = sortedTasks.map(
      task => (
        <TaskItem
          key={task._id}
          status={task.status}
          priority={task.priority}
          id={task._id}
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
          <SortList
            storageKey={storageKey}
            color={sortIconColor}
          />
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

const mapStateToProps = ({ mainContainerReducer: { taskListRef, loading }, sortListReducer }) => ({
  taskListRef,
  loading,
  allSortSettings: sortListReducer,
});

export { TasksColumn as TaskColumnComponent };
export default connect(mapStateToProps)(TasksColumn);
