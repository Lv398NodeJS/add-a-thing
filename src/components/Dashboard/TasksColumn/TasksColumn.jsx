import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './TasksColumn.scss';
import { getTaskRef } from '../TaskItem/utils';
import { columnTitleClass } from './utils';
import TaskItem from '../TaskItem/TaskItem';
import SortList from '../SortList/SortList';

export default class TasksColumn extends Component {
  constructor() {
    super();
    this.state = {};
  }

  dragOverHandler = (event) => {
    event.preventDefault();
    // console.log(`I'm dragin over ${title}`);
  }

  dropHandler = (event) => {
    event.preventDefault();

    const { taskListRef, handleDroppedTask } = this.props;

    const taskID = event.dataTransfer.getData('text');
    const newStatus = event.currentTarget.dataset.status;
    const taskStatusRef = getTaskRef(taskListRef, taskID).child('status');

    handleDroppedTask(taskStatusRef, taskID, newStatus);

    // console.log(`2. Moved into ${task.currentTarget.dataset.status}`);
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
          className="task-items-container"
          data-test="taskItemsContainer"
        >
          <SortList
            storageKey={window.location.pathname + title}
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
