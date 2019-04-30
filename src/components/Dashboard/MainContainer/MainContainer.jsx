import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './MainContainer.scss';
import TasksColumn from '../TasksColumn/TasksColumn';
import db from '../../../fire';
import MainInput from '../MainInput/MainInput';

export default class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      taskList: [],
      dashboardID: null,
      taskListRef: null,
    };
  }

  componentDidMount() {
    const dashboardID = document.URL.split('/').pop();
    const taskListRef = db.database().ref(`dashboards/${dashboardID}/taskList`);

    taskListRef.on('value', (snapshot) => {
      const taskListSnap = snapshot.val() ? snapshot.val() : {};

      this.setState(({
        dashboardID,
        taskListRef,
        taskList: this.getTaskListAsArray(taskListSnap),
      }));
    });
  }

  getTaskListAsArray = (snapValue) => {
    const taskList = [];

    Object.keys(snapValue).forEach(task => (
      taskList.push({
        id: task,
        name: snapValue[task].name,
        description: snapValue[task].description,
        status: snapValue[task].status,
        key: task,
      })));

    return taskList;
  }

  addNewTask = (inputData = '') => {
    if (!inputData.trim().length) return;
    this.setState(prevState => (
      {
        taskList: [...prevState.taskList, {
          name: inputData, description: '', status: 'To Do',
        }],
      }
    ));
    this.storeTaskInDB(inputData);
  };

  storeTaskInDB = (inputData) => {
    const { dashboardID } = this.state;
    const addTaskRef = db.database().ref(`dashboards/${dashboardID}/taskList`);
    const newTask = {
      name: inputData, description: '', status: 'To Do',
    };
    addTaskRef.push(newTask);
  }

  render() {
    const { taskList, taskListRef } = this.state;

    const ToDoTasks = taskList.filter(task => (task.status === 'To Do'));
    const InProgressTasks = taskList.filter(task => (task.status === 'In Progress'));
    const DoneTasks = taskList.filter(task => (task.status === 'Done'));

    return (
      <Container className="mainContainer">
        <MainInput addNewTask={this.addNewTask} />
        <Container className="tasksColumn">
          <TasksColumn
            title="To Do"
            sortedTasks={ToDoTasks}
            taskListRef={taskListRef}
          />
        </Container>
        <Container className="tasksColumn">
          <TasksColumn
            title="In Progress"
            sortedTasks={InProgressTasks}
            taskListRef={taskListRef}
          />
        </Container>
        <Container className="tasksColumn">
          <TasksColumn
            title="Done"
            sortedTasks={DoneTasks}
            taskListRef={taskListRef}
          />
        </Container>
      </Container>
    );
  }
}
