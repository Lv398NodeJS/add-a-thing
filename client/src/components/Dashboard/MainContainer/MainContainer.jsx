import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import * as mainContainer from '@actions/mainContainerActions';
import * as taskActions from '@actions/taskDetailsActions';
import TasksColumn from '@Dashboard/TasksColumn/TasksColumn';
import MainInput from '@Dashboard/MainInput/MainInput';
import { deleteDragByEvent, handleDeleteDropCSS } from './MainContainerUtils';
import './MainContainer.scss';
import trash from '@assets/trash.svg';
import { Redirect } from "react-router-dom";

class MainContainer extends Component {
  componentWillMount() {
    const dashboardId = document.URL.split('/').pop();
    const { mainContainerActions } = this.props;
    mainContainerActions.fetchTaskList(dashboardId);
  }

  handleTaskDrop = (taskID, newStatus) => {
    const { taskList, taskDetailsActions } = this.props;
    const [taskData] = taskList.filter(task => task._id === taskID);
    if (taskData && taskData.status !== newStatus) {
      const updatedTask = {
        _id: taskID,
        name: taskData.name,
        status: newStatus,
        priority: taskData.priority || 'Medium',
        description: taskData.description || '',
      };
      taskDetailsActions.updateTaskDetails(updatedTask);
      document.getElementsByClassName('dragged-task')[0].remove();
    }
  };

  deleteDrop = (event) => {
    event.preventDefault();

    const { taskDetailsActions: { deleteTaskDetails } } = this.props;
    const dropTaskID = event.dataTransfer.getData('taskID');
    deleteTaskDetails(dropTaskID);

    handleDeleteDropCSS();
  };

  render() {
    if (!localStorage.getItem('token')) {
      return <Redirect to="/" />;
    }

    const { taskList, dashboardName } = this.props;

    const ToDoTasks = taskList.filter(task => (task.status === 'To Do'));
    const InProgressTasks = taskList.filter(task => (task.status === 'In Progress'));
    const DoneTasks = taskList.filter(task => (task.status === 'Done'));

    return (
      <Container fluid="true">
        <section className="dashboard-name">{dashboardName}</section>
        <Row className="mt-3 justify-content-center">
          <Col md={10}>
            <MainInput />
          </Col>
        </Row>
        <Row className="mt-3 mb-3 mx-md-4 mx-lg-5" data-test="columnsRow">
          <Col md={4}>
            <TasksColumn
              title="To Do"
              filteredTasks={ToDoTasks}
              handleTaskDrop={this.handleTaskDrop}
            />
          </Col>
          <Col md={4}>
            <TasksColumn
              title="In Progress"
              filteredTasks={InProgressTasks}
              handleTaskDrop={this.handleTaskDrop}
            />
          </Col>
          <Col md={4}>
            <TasksColumn
              title="Done"
              filteredTasks={DoneTasks}
              handleTaskDrop={this.handleTaskDrop}
            />
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col
            className="delete-zone"
            id="delete-zone"
            xs={10}
            md={3}
            onDrop={e => this.deleteDrop(e)}
            onDragOver={e => deleteDragByEvent(e, 'over')}
            onDragLeave={e => deleteDragByEvent(e, 'leave')}
            onDragEnter={e => e.preventDefault()}
          >
            <img
              src={trash}
              alt="Delete"
              id="delete-can"
              className="delete-can"
              draggable="false"
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const mapStateToProps = ({ mainContainerReducer: { taskList, taskListRef, dashboardName } }) => ({
  taskList,
  taskListRef,
  dashboardName,
});

const mapDispatchToProps = dispatch => ({
  mainContainerActions: bindActionCreators(mainContainer, dispatch),
  taskDetailsActions: bindActionCreators(taskActions, dispatch),
});

export { MainContainer as MainContainerComponent };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MainContainer);
