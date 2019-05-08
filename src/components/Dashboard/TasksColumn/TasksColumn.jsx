import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './TasksColumn.scss';
import TaskItem from '../TaskItem/TaskItem';
import SortList from '../SortList/SortList';

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

  sortIconColor = () => {
    const { title } = this.props;

    switch (title) {
      case 'To Do':
        return 'rgb(103, 102, 106)';
      case 'In Progress':
        return 'rgb(118, 183, 192)';
      case 'Done':
        return 'rgb(194, 105, 95)';
      default:
        return 'rgb(78, 26, 235)';
    }
  };

  render() {
    const {
      sortedTasks, taskListRef, title,
    } = this.props;

    const sortIconColor = this.sortIconColor();

    const tasksToDisplay = sortedTasks.map(
      task => (
        <TaskItem
          key={task.id}
          status={task.status}
          priority={task.priority}
          priorityForSorting={['Low', 'Medium', 'High'].indexOf(task.priority)}
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
          <SortList
            storageKey={window.location.pathname + title}
            sortIconColor={sortIconColor}
            fields={[
              {
                key: 'taskName',
                text: 'Name',
              },
              {
                key: 'priorityForSorting',
                text: 'Priority',
              },
            ]}
          >
            {tasksToDisplay.reverse()}
          </SortList>
        </Container>
      </div>
    );
  }
}
