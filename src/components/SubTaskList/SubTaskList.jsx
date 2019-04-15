/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './SubTaskList.scss';

import SubTaskItem from './SubTaskItem';
import SubTaskAdd from './SubTaskAdd';
import SubTaskProgressBar from './SubTaskProgressBar';

export default class SubTaskList extends Component {
  constructor(props) {
    super(props);

    const { taskRef } = this.props;
    this.state = { subTasks: [] };
    this.taskRef = taskRef;
    this.addSubTask = this.addSubTask.bind(this);
    this.deleteSubTask = this.deleteSubTask.bind(this);
    this.changeSubTaskStatus = this.changeSubTaskStatus.bind(this);
  }

  componentDidMount() {
    const subtasksRef = this.taskRef.child('/subtaskList');
    subtasksRef.on('value', (snapshot) => {
      const subtasksSnap = snapshot.val();
      const newState = [];
      for (const subtask in subtasksSnap) {
        newState.push({
          text: subtasksSnap[subtask].text,
          completed: subtasksSnap[subtask].completed,
          key: subtask,
        });
      }
      this.setState({
        subTasks: newState,
      });
    });
  }

  addSubTask(subTaskText) {
    if (subTaskText.trim().length > 0) {
      const subtasksRef = this.taskRef.child('/subtaskList');
      const subtask = {
        text: subTaskText.trim(),
        completed: false,
      };
      subtasksRef.push(subtask);
    }
  }

  deleteSubTask(subTaskId) {
    const subtasksRef = this.taskRef.child(`/subtaskList/${subTaskId}`);
    subtasksRef.remove();
  }

  changeSubTaskStatus(subTaskId) {
    const subtasksRef = this.taskRef.child(`/subtaskList/${subTaskId}`);
    subtasksRef.once('value', (snapshot) => {
      subtasksRef.set({
        text: snapshot.val().text,
        completed: !snapshot.val().completed,
      });
    });
  }

  render() {
    const { subTasks } = this.state;
    const subTaskItems = subTasks.map(subTask => (
      <SubTaskItem
        key={subTask.key}
        subTask={subTask}
        changeSubTaskStatus={this.changeSubTaskStatus}
        deleteSubTask={this.deleteSubTask}
      />
    ));

    return (
      <Container>
        <SubTaskProgressBar subTasks={subTasks} />
        {subTaskItems}
        <Row className="justify-content-sm-center">
          <Col>
            <SubTaskAdd addSubTask={this.addSubTask} />
          </Col>
        </Row>
      </Container>
    );
  }
}
