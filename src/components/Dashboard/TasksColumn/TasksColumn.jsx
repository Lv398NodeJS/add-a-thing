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
      <div className="tasksColumn rounded mb-3">
        <h1 className={this.columnTitleClass()}>
          {title}
        </h1>
        <Container className="taskItemsContainer">
          <SortList
            storageKey={title}
            fields={[
              {
                key: 'taskName',
                text: 'alphabet',
              },
              {
                key: 'id',
                text: 'id',
              },
              {
                key: 'priority',
                text: 'priority',
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
