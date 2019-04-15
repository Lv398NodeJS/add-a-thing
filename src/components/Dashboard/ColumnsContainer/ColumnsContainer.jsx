/* eslint-disable guard-for-in */
import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import ToDo from '../TasksColumns/ToDo';
import InProgress from '../TasksColumns/InProgress';
import Done from '../TasksColumns/Done';
import db from '../../../fire';

export default class ColumnsContainer extends Component {
  constructor() {
    super();
    this.state = {
      taskList: [],
      dashboardId: null,
    };
  }

  componentDidMount() {
    const partsOfURL = document.URL.split('/').pop();
    const id = partsOfURL;
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
    });
    this.setState(prevState => ({
      ...prevState,
      dashboardId: id,
    }));
  }

  render() {
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

    const { taskList } = this.state;

    const ToDoTasks = taskList.filter(task => (task.status === 'To Do'));
    const InProgressTasks = taskList.filter(task => (task.status === 'In Progress'));
    const DoneTasks = taskList.filter(task => (task.status === 'Done'));

    return (
      <Container className="ColumnsContainer" style={ColumnsContainerStyle}>
        <Container className="taskColumnContainer" style={taskColumnStyle}>
          <ToDo
            sortedTasks={ToDoTasks}
          />
        </Container>
        <Container className="taskColumnContainer" style={taskColumnStyle}>
          <InProgress
            sortedTasks={InProgressTasks}
          />
        </Container>
        <Container className="taskColumnContainer" style={taskColumnStyle}>
          <Done
            sortedTasks={DoneTasks}
          />
        </Container>
      </Container>
    );
  }
}

// this.updateTaskList = this.updateTaskList.bind(this);
// this.deleteTask = this.deleteTask.bind(this);
// updateTaskList = (updatedTask) => {
//   const { updateTaskList } = this.props;
//   updateTaskList(updatedTask);
// };

// deleteTask = (deletedTaskID) => {
//   const { deleteTask } = this.props;
//   deleteTask(deletedTaskID);
// };

/* <Container className="taskColumnContainer" style={taskColumnStyle}>
          <TasksColumn
            columnType="2" // columnType="done"
            taskList={this.state}
            // deleteTask={this.deleteTask}
            // updateTaskList={this.updateTaskList}
          />
        </Container> */
