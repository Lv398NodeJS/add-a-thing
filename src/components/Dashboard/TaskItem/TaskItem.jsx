import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import TaskDetails from '../TaskDetails/TaskDetails';

export default class TaskItem extends Component {
  constructor(props) {
    super(props);
    const { currentTaskData } = this.props;
    this.state = {
      modalShow: false,
      currentTaskData,
    };
    this.closeTaskDetails = this.closeTaskDetails.bind(this);
    this.updateTaskList = this.updateTaskList.bind(this);
    this.deleteTask = this.deleteTask.bind(this);
  }

  updateTaskList = (updatedTaskList) => {
    const { updateTaskList } = this.props;
    updateTaskList(updatedTaskList);
  }

  deleteTask = (deletedTaskID) => {
    const { deleteTask } = this.props;
    deleteTask(deletedTaskID);
  }


  closeTaskDetails() {
    this.setState({ modalShow: false });
  }

  render() {
    const { modalShow: modalOpen, currentTaskData } = this.state;

    const taskItemStyle = {
      width: '92%',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      padding: '7px',
      margin: '18px auto',
      textAlign: 'left',
      color: 'rgb(117, 116, 119)',
      fontSize: '1rem',
      borderRadius: '2px',
      background: 'linear-gradient(to right, #ececec, #f6f6f6)',
      cursor: 'pointer',
    };

    console.log(`currentTaskDataID in Item: ${currentTaskData.id}`);

    return (
        <Container className="taskItem" style={taskItemStyle} onClick={() => this.setState({ modalShow: !modalOpen })}>
          {currentTaskData.name}
          <TaskDetails
          onClose={this.closeTaskDetails}
          currentTaskData={currentTaskData}
          deleteTask={this.deleteTask}
          updateTaskList={this.updateTaskList}
          show={modalOpen}
        />
        </Container>
    );
  }
}
