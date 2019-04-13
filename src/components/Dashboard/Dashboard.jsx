import React, { Component } from 'react';
import './App.scss';
import NavBar from './components/Dashboard/Main/Header';
import Json from './data';
import ColumnsContainer from './components/Dashboard/ColumnsContainer/ColumnsContainer';

export default class Dashboard extends Component {
  constructor(props) {
    super();
    this.state = {
      tasks: [],
    };
    this.updateTaskList = this.updateTaskList.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  updateTaskList = (updatedTask) => {
    this.setState(prevState => (
      prevState.map(task => {
        if (task.id === updatedTask.id) {
          return updatedTask;
        } return task;
      })
    ))
  };
  
  deleteTask = (deletedTaskID) => {
    this.setState(prevState => (
      {
        taskList: prevState.taskList.filter(task => task.id !== deletedTaskID),
      }
    ));
  };

  render() {
    console.log(`In Dashboard ${this.state.taskList}`);
    return (
      <div>
        <NavBar />
        <ColumnsContainer 
          deleteTask={this.deleteTask}
          updateTaskList={this.updateTaskList}
          taskList={this.state.taskList}
        />
      </div>
    );
  }
}
