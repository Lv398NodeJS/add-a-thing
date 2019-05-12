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
      loading: true,
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
        loading: false,
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
              handleTaskDrop={this.handleTaskDrop}
            />
          </Col>
          <Col md={4}>
            <TasksColumn
              loading={loading}
              title="In Progress"
              taskListRef={taskListRef}
              sortedTasks={InProgressTasks}
              handleTaskDrop={this.handleTaskDrop}
            />
          </Col>
          <Col md={4}>
            <TasksColumn
              title="Done"
              loading={loading}
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
