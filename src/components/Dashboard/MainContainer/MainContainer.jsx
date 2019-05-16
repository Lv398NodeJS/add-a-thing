import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { getTaskListAsArray } from './utils';
import { getTaskRef } from '../TaskItem/utils';
import TasksColumn from '../TasksColumn/TasksColumn';
import MainInput from '../MainInput/MainInput';
import './MainContainer.scss';
import db from '../../../fire';

export default class MainContainer extends Component {
  constructor() {
    super();
    this.state = {
      taskList: [],
      taskListLoading: true,
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
        taskListLoading: false,
      }));
    });
  }

  handleTaskDrop = (taskListRef, taskID, newStatus) => {
    const { taskList } = this.state;
    const taskData = taskList.filter(task => task.id === taskID)[0];

    if (taskData && taskData.status !== newStatus) {
      const updatedTask = {
        name: taskData.name,
        status: newStatus,
        priority: taskData.priority || 'Medium',
        description: taskData.description || '',
      };
      getTaskRef(taskListRef, taskID).remove();
      taskListRef.push(updatedTask);
    }
  };

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
    const { taskList, taskListRef, taskListLoading } = this.state;

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
              loading={taskListLoading}
              sortedTasks={ToDoTasks}
              taskListRef={taskListRef}
              handleTaskDrop={this.handleTaskDrop}
            />
          </Col>
          <Col md={4}>
            <TasksColumn
              loading={taskListLoading}
              title="In Progress"
              taskListRef={taskListRef}
              sortedTasks={InProgressTasks}
              handleTaskDrop={this.handleTaskDrop}
            />
          </Col>
          <Col md={4}>
            <TasksColumn
              title="Done"
              loading={taskListLoading}
              sortedTasks={DoneTasks}
              taskListRef={taskListRef}
              handleTaskDrop={this.handleTaskDrop}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}
