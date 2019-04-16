import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import ToDo from '../TasksColumns/ToDo';
import InProgress from '../TasksColumns/InProgress';
import Done from '../TasksColumns/Done';
import db from '../../../fire';

export default class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      taskList: [],
      dashboardID: null,
    };
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

  render() {
    const mainContainerStyle = {
      display: 'flex',
      flex: '0 0 auto',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      flexWrap: 'wrap',
      minHeight: '100vh',
      minWidth: '100vw',
      backgroundColor: 'rgb(247, 247, 247)',
    };

    const tasksColumnStyle = {
      overflow: 'hidden',
      width: '400px',
      padding: '5px',
      background: '#FFFFFF',
    };

    const { taskList } = this.state;

    const ToDoTasks = taskList.filter(task => (task.status === 'To Do'));
    const InProgressTasks = taskList.filter(task => (task.status === 'In Progress'));
    const DoneTasks = taskList.filter(task => (task.status === 'Done'));

    return (
      <Container className="mainContainer" style={mainContainerStyle}>
        <Container className="tasksColumn" style={tasksColumnStyle}>
          <ToDo
            sortedTasks={ToDoTasks}
          />
        </Container>
        <Container className="tasksColumn" style={tasksColumnStyle}>
          <InProgress
            sortedTasks={InProgressTasks}
          />
        </Container>
        <Container className="tasksColumn" style={tasksColumnStyle}>
          <Done
            sortedTasks={DoneTasks}
          />
        </Container>
      </Container>
    );
  }
}
