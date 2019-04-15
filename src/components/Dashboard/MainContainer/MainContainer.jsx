/* eslint-disable guard-for-in */
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
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
      dashboardId: null,
    };
    this.addNewTask = this.addNewTask.bind(this);
  }

  componentDidMount() {
    const id = document.URL.split('/').pop();
    const taskListRef = db.database().ref(`dashboards/${id}/taskList`);
    taskListRef.on('value', (snapshot) => {
      const taskListSnap = snapshot.val();
      const newState = [];
      // eslint-disable-next-line no-restricted-syntax
      for (const task in taskListSnap) {
        newState.push({
          id: task,
          name: taskListSnap[task].name,
          description: taskListSnap[task].description,
          status: taskListSnap[task].status,
          // subTaskList: taskListSnap[task].subTaskList,
          key: task,
        });
      }
      this.setState(({
        dashboardId: id,
        taskList: newState,
      }));
    });
  }

  addNewTask = (inputData) => {
    if (inputData.length > 0) {
      this.setState(prevState => (
        {
          taskList: [...prevState.taskList, {
            name: inputData, description: '', status: 'To Do',
          }],
        }
      ));

      const id = document.URL.split('/').pop();
      const addTaskRef = db.database().ref(`dashboards/${id}/taskList`);
      const addTask = {
        name: inputData, description: '', status: 'To Do',
      };
      addTaskRef.push(addTask);
    }
  };

  render() {
    const ColumnsContainerStyle = {
      minHeight: '100vh',
      minWidth: '100vw',
      backgroundColor: 'rgb(247, 247, 247)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
    };

    const taskColumnStyle = {
      width: '400px',
      minHeight: '450px',
      color: 'rgb(194, 105, 95)',
      background: '#FFFFFF',
    };

    const { taskList } = this.state;

    const ToDoTasks = taskList.filter(task => (task.status === 'To Do'));
    const InProgressTasks = taskList.filter(task => (task.status === 'In Progress'));
    const DoneTasks = taskList.filter(task => (task.status === 'Done'));

    return (
      <Container className="ColumnsContainer" style={ColumnsContainerStyle}>
        <MainInput addNewTask={this.addNewTask} />
        <Container className="taskColumnContainer" style={taskColumnStyle}>
          <ToDo
            sortedTasks={ToDoTasks}
            taskList={taskList}
          />
        </Container>
        <Container className="taskColumnContainer" style={taskColumnStyle}>
          <InProgress
            sortedTasks={InProgressTasks}
            taskList={taskList}
          />
        </Container>
        <Container className="taskColumnContainer" style={taskColumnStyle}>
          <Done
            sortedTasks={DoneTasks}
            taskList={taskList}
          />
        </Container>
      </Container>
    );
  }
}
