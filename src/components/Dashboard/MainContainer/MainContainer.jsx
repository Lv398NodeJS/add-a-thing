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
      loading: true,
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
        loading: false,
      }));
    });
  }

  handleDroppedTask = (taskStatusRef, taskID, newStatus) => {
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
  };

  deleteTask = (taskRef) => {
    taskRef.remove();
  }

  addNewTask = (inputData = '', newPriority = '') => {
    this.setState(prevState => (
      {
        taskList: [...prevState.taskList, {
          name: inputData, description: '', status: 'To Do', priority: newPriority,
        }],
      }
    ));
    this.storeTaskInDB(inputData, newPriority);
  };

  storeTaskInDB = (newData, newPriority) => {
    const { dashboardID } = this.state;
    const addTaskRef = db.database().ref(`dashboards/${dashboardID}/taskList`);
    const newTask = {
      name: newData, description: '', status: 'To Do', priority: newPriority,
    };
    addTaskRef.push(newTask);
  };

  render() {
    const { taskList, taskListRef, loading } = this.state;

    const ToDoTasks = taskList.filter(task => (task.status === 'To Do'));
    const InProgressTasks = taskList.filter(task => (task.status === 'In Progress'));
    const DoneTasks = taskList.filter(task => (task.status === 'Done'));

    return (
      <Container fluid="true">
        <Row className="mt-3 justify-content-center">
          <Col md={10}>
            <MainInput addNewTask={this.addNewTask} />
          </Col>
        </Row>
        <Row className="mt-3 mb-3 mx-md-4 mx-lg-5" data-test="columnsRow">
          <Col md={4}>
            <TasksColumn
              title="To Do"
              loading={loading}
              sortedTasks={ToDoTasks}
              taskListRef={taskListRef}
              deleteTask={this.deleteTask}
              handleDroppedTask={this.handleDroppedTask}
            />
          </Col>
          <Col md={4}>
            <TasksColumn
              loading={loading}
              title="In Progress"
              taskListRef={taskListRef}
              deleteTask={this.deleteTask}
              sortedTasks={InProgressTasks}
              handleDroppedTask={this.handleDroppedTask}
            />
          </Col>
          <Col md={4}>
            <TasksColumn
              title="Done"
              loading={loading}
              sortedTasks={DoneTasks}
              taskListRef={taskListRef}
              deleteTask={this.deleteTask}
              handleDroppedTask={this.handleDroppedTask}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
