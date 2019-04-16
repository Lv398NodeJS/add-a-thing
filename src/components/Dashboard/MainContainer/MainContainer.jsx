import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './MainContainer.scss';
import ToDo from '../TasksColumns/ToDo';
import InProgress from '../TasksColumns/InProgress';
import Done from '../TasksColumns/Done';
import db from '../../../fire';
import MainInput from '../MainInput/MainInput';

export default class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      taskList: [],
      dashboardID: null,
    };
    this.storeTaskInDB = this.storeTaskInDB.bind(this);
  }

  componentDidMount() {
    const dashboardID = document.URL.split('/').pop();
    const taskListRef = db.database().ref(`dashboards/${dashboardID}/taskList`);
    taskListRef.on('value', (snapshot) => {
      const taskListSnap = snapshot.val();
      const newState = [];

      Object.keys(taskListSnap).forEach(task => (
        newState.push({
          id: task,
          name: taskListSnap[task].name,
          description: taskListSnap[task].description,
          status: taskListSnap[task].status,
          // subTaskList: taskListSnap[task].subTaskList,
          key: task,
        })));

      this.setState(({
        dashboardID,
        taskList: newState,
      }));
    });
  }

  addNewTask = (inputData = '') => {
    if (inputData.length === 0) return;
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
    const { taskList } = this.state;

    const ToDoTasks = taskList.filter(task => (task.status === 'To Do'));
    const InProgressTasks = taskList.filter(task => (task.status === 'In Progress'));
    const DoneTasks = taskList.filter(task => (task.status === 'Done'));

    return (
      <Container className="mainContainer">
        <MainInput addNewTask={this.addNewTask} />
        <Container className="tasksColumn">
          <ToDo
            sortedTasks={ToDoTasks}
          />
        </Container>
        <Container className="tasksColumn">
          <InProgress
            sortedTasks={InProgressTasks}
          />
        </Container>
        <Container className="tasksColumn">
          <Done
            sortedTasks={DoneTasks}
          />
        </Container>
      </Container>
    );
  }
}
