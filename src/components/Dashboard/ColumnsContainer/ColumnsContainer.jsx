import React, { Component } from 'react';
import TasksColumn from '../TasksColumn/TasksColumn';
import { Container } from 'react-bootstrap';

export default class ColumnsContainer extends Component {
  constructor(props) {
    super(props);
    const { taskList } = this.props;
    this.state = {
      taskList,
    };
    this.updateTaskList = this.updateTaskList.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  updateTaskList = (updatedTask) => {
   const { updateTaskList } = this.props;
   updateTaskList(updatedTask);
  };
  
  deleteTask = (deletedTaskID) => {
    const { deleteTask } = this.props;
    deleteTask(deletedTaskID);
  };

  // componentDidUpdate()

  render() {

    console.log(`In Container ${this.state.taskList}`);

    const ColumnsContainerStyle = {
      minHeight: '100vh',
      minWidth: '100vw',
      backgroundColor: 'rgb(247, 247, 247)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
    };

    const taskColumnStyle = {
      width: '400px',
      minHeight: '450px',
      color: 'rgb(194, 105, 95)',
      background: '#FFFFFF',
    };

    return (
      <Container className="ColumnsContainer" style={ColumnsContainerStyle}>
        <Container className="taskColumnContainer" style={taskColumnStyle}>
          <TasksColumn
            columnType="0" // columnType="to-do"
            taskList={this.state.taskList}
            deleteTask={this.deleteTask}
            updateTaskList={this.updateTaskList}
          />
        </Container>
        <Container className="taskColumnContainer" style={taskColumnStyle}>
          <TasksColumn
            columnType="1" // columnType="in-progress"
            taskList={this.state.taskList}
            deleteTask={this.deleteTask}
            updateTaskList={this.updateTaskList}
          />
        </Container>
        <Container className="taskColumnContainer" style={taskColumnStyle}>
          <TasksColumn
            columnType="2" // columnType="done"
            taskList={this.state.taskList}
            deleteTask={this.deleteTask}
            updateTaskList={this.updateTaskList}
          />
        </Container>
      </Container>
    );
  }
}
