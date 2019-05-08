import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './MainContainer.scss';
import { getTaskListAsArray } from './utils';
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
        taskList: getTaskListAsArray(taskListSnap),
      }));
    });
  }

  handleDroppedTaskStatusChange = (taskStatusRef, taskID, newStatus) => {
    const { taskList } = this.state;

    const updatedTaskList = taskList.map((task) => {
      if (task.id === taskID) {
        task.status = newStatus;
      } return task;
    });

    taskStatusRef.set(newStatus);

    this.setState(() => ({
      taskList: updatedTaskList,
    }));

    console.log(`This is drop`)
  };

  addNewTask = (inputData = '') => {
    if (!inputData.trim().length) return;
    this.setState(prevState => (
      {
        taskList: [...prevState.taskList, {
          name: inputData, description: '', status: 'To Do', priority: 'Low',
        }],
      }
    ));
    this.storeTaskInDB(inputData);
  };

  storeTaskInDB = (inputData) => {
    const { dashboardID } = this.state;
    const addTaskRef = db.database().ref(`dashboards/${dashboardID}/taskList`);
    const newTask = {
      name: inputData, description: '', status: 'To Do', priority: 'Low',
    };
    addTaskRef.push(newTask);
  };

  render() {
    const { taskList, taskListRef } = this.state;

    const ToDoTasks = taskList.filter(task => (task.status === 'To Do'));
    const InProgressTasks = taskList.filter(task => (task.status === 'In Progress'));
    const DoneTasks = taskList.filter(task => (task.status === 'Done'));

    return (
      <Container fluid>
        <Row className="mt-3 justify-content-center" onDragEnter={e => e.preventDefault()}>
          <Col md={10}>
            <MainInput addNewTask={this.addNewTask} />
          </Col>
        </Row>
        <Row className="mt-3 mb-3 mx-md-4 mx-lg-5" data-test="columnsRow">
          <Col md={4}>
            <TasksColumn
              title="To Do"
              sortedTasks={ToDoTasks}
              taskListRef={taskListRef}
              handleDroppedTaskStatusChange={this.handleDroppedTaskStatusChange}
            />
          </Col>
          <Col md={4}>
            <TasksColumn
              title="In Progress"
              sortedTasks={InProgressTasks}
              taskListRef={taskListRef}
              handleDroppedTaskStatusChange={this.handleDroppedTaskStatusChange}
            />
          </Col>
          <Col md={4}>
            <TasksColumn
              title="Done"
              sortedTasks={DoneTasks}
              taskListRef={taskListRef}
              handleDroppedTaskStatusChange={this.handleDroppedTaskStatusChange}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
