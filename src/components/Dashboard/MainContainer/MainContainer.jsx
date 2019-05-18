import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { getTaskRef } from '../TaskItem/utils';
import * as mainContainer from '../../../actions/mainContainerActions';
import TasksColumn from '../TasksColumn/TasksColumn';
import MainInput from '../MainInput/MainInput';
import './MainContainer.scss';
import db from '../../../fire';

export class MainContainer extends Component {
  componentDidMount() {
    const { mainContainerActions } = this.props;

    const dashboardID = document.URL.split('/').pop();
    const taskListRef = db.database().ref(`dashboards/${dashboardID}/taskList`);

    mainContainerActions.setTaskListRef(taskListRef);
    mainContainerActions.fetchTaskList(taskListRef);
  }

  handleTaskDrop = (taskID, newStatus) => {
    const { taskList, taskListRef } = this.props;
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

  addNewTask = (newData = '', newPriority = '') => {
    const { taskListRef } = this.props;
    const newTask = {
      name: newData, description: '', status: 'To Do', priority: newPriority,
    };
    taskListRef.push(newTask);
  };

  render() {
    const { taskList } = this.props;

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
              sortedTasks={ToDoTasks}
              handleTaskDrop={this.handleTaskDrop}
            />
          </Col>
          <Col md={4}>
            <TasksColumn
              title="In Progress"
              sortedTasks={InProgressTasks}
              handleTaskDrop={this.handleTaskDrop}
            />
          </Col>
          <Col md={4}>
            <TasksColumn
              title="Done"
              sortedTasks={DoneTasks}
              handleTaskDrop={this.handleTaskDrop}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  taskList: state.mainContainerReducer.taskList,
  taskListRef: state.mainContainerReducer.taskListRef,
});

const mapDispatchToProps = dispatch => ({
  mainContainerActions: bindActionCreators(mainContainer, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainContainer);
