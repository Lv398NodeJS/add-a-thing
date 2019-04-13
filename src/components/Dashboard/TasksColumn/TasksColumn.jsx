import React, { Component } from 'react';
import TaskItem from '../TaskItem/TaskItem';
import { Container } from 'react-bootstrap';

export default class TasksColumn extends Component {
  constructor(props) {
    super(props);
    const { taskList, columnType } = this.props;
    this.state = {
      taskList: taskList,
      columnType
    };
    this.updateTaskList = this.updateTaskList.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  updateTaskList = (updatedTaskList) => {
    const { updateTaskList } = this.props;
    updateTaskList(updatedTaskList);
  }

  deleteTask = (deletedTaskID) => {
    const { deleteTask } = this.props;
    deleteTask(deletedTaskID);
  }

  render() {
    const { columnType, taskList } = this.state;

    console.log(`In TaskColumn ${this.state.taskList}`);

    const taskColumnTitleStyle = {
      textAlign: 'center',
      margin: '25px auto 30px',
      fontSize: '1.8rem',
      borderBottom: '1px solid rgb(246, 246, 246)',
    };

    let taskColumnTitleText = '';
    let taskColumnTitleUnderline;

    switch (columnType) {
      case '0':
        taskColumnTitleText = 'TO DO';
        taskColumnTitleStyle.color = 'rgb(103, 102, 106)';
        taskColumnTitleUnderline = { borderBottom: '3px solid rgb(103, 102, 106)' };
        break;
      case '1':
        taskColumnTitleText = 'IN PROGRESS';
        taskColumnTitleStyle.color = 'rgb(118, 183, 192)';
        taskColumnTitleUnderline = { borderBottom: '3px solid rgb(116, 154, 159)' };
        break;
      case '2':
        taskColumnTitleText = 'DONE';
        taskColumnTitleStyle.color = 'rgb(194, 105, 95)';
        taskColumnTitleUnderline = { borderBottom: '3px solid rgb(191, 134, 123)' };
        break;
      default:
        break;
    }

    const taskItem = taskList.map(
      task => (task.status === +columnType
        && (
          <TaskItem
            key={task.id}
            currentTaskData={task}
            deleteTask={this.deleteTask}
            updateTaskList={this.updateTaskList}
          />
        )
      ),
    );
    return (
      <Container className="taskColumnContainer">
        <h1 className="taskColumnTitleStyle" style={taskColumnTitleStyle}>
          <span style={taskColumnTitleUnderline}>
            {taskColumnTitleText}
          </span>
        </h1>
        {taskItem}
      </Container>
    );
  }
}
