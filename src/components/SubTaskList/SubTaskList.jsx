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
    this.state = { subtaskList: [] };
    this.taskRef = taskRef;
    this.addSubTask = this.addSubTask.bind(this);
    this.deleteSubTask = this.deleteSubTask.bind(this);
    this.changeSubTaskStatus = this.changeSubTaskStatus.bind(this);
  }

  componentDidMount() {
    const subtaskListRef = this.taskRef.child('/subtaskList');
    subtaskListRef.on('value', (snapshot) => {
      const updatedSubtaskList = [];
      const subtaskListSnap = snapshot.val() ? snapshot.val() : {};
      Object.keys(subtaskListSnap).forEach(subtask => updatedSubtaskList.push({
        text: subtaskListSnap[subtask].text,
        completed: subtaskListSnap[subtask].completed,
        key: subtask,
      }));
      this.setState({
        subtaskList: updatedSubtaskList,
      });
    });
  }

  addSubTask(subTaskText) {
    if (!subTaskText.trim().length) return;
    const subtaskListRef = this.taskRef.child('/subtaskList');
    const subtask = {
      text: subTaskText.trim(),
      completed: false,
    };
    subtaskListRef.push(subtask);
  }

  deleteSubTask(subtaskId) {
    const subtaskRef = this.taskRef.child(`/subtaskList/${subtaskId}`);
    subtaskRef.remove();
  }

  changeSubTaskStatus(subtaskId) {
    const subtaskRef = this.taskRef.child(`/subtaskList/${subtaskId}`);
    subtaskRef.once('value', (snapshot) => {
      subtaskRef.set({
        text: snapshot.val().text,
        completed: !snapshot.val().completed,
      });
    });
  }

  render() {
    const { subtaskList } = this.state;
    const subTaskItems = subtaskList.map(subTask => (
      <SubTaskItem
        key={subTask.key}
        subTask={subTask}
        changeSubTaskStatus={this.changeSubTaskStatus}
        deleteSubTask={this.deleteSubTask}
      />
    ));

    return (
      <Container>
        <SubTaskProgressBar subtaskList={subtaskList} />
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
