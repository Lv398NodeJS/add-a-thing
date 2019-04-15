import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import TaskItem from '../TaskItem/TaskItem';

export default class ToDo extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    const taskColumnToDoStyle = {
      textAlign: 'center',
      margin: '25px auto 30px',
      fontSize: '1.8rem',
      // borderBottom: '1px solid rgb(246, 246, 246)',
      color: 'rgb(103, 102, 106)',
      borderBottom: '3px solid rgb(103, 102, 106)',
    };

    const { ToDoTasks } = this.props;

    const tasksToDisply = ToDoTasks.map(
      task => (
        <TaskItem
          key={task.id}
          currentTaskData={task}
          deleteTask={this.deleteTask}
          updateTaskList={this.updateTaskList}
        />
      ),
    );

    return (
      <Container className="taskColumnContainer">
        <h1 className="taskColumnToDoStyle" style={taskColumnToDoStyle}>To Do</h1>
        {tasksToDisply}
      </Container>
    );
  }
}
