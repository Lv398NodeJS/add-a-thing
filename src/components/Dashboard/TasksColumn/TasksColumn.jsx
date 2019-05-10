import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './TasksColumn.scss';
import { columnTitleClass, getSortIconColor } from './utils';
import TaskItem from '../TaskItem/TaskItem';
import SortList from '../SortList/SortList';

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
          priorityForSorting={['Low', 'Medium', 'High'].indexOf(task.priority)}
          id={task.id}
          taskName={task.name}
          taskListRef={taskListRef}
        />
      ),
    );
    const sortIconColor = getSortIconColor(title);

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
