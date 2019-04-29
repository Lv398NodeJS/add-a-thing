import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import SubTaskItem from './SubTaskItem/SubTaskItem';
import SubTaskAdd from './SubTaskAdd/SubTaskAdd';
import SubTaskProgressBar from './SubTaskProgressBar/SubTaskProgressBar';

export default class SubTaskList extends Component {
  constructor(props) {
    super(props);

    const { taskRef } = this.props;
    this.state = { subtaskList: [] };
    this.taskRef = taskRef;
  }

  componentDidMount() {
    this.isComponentMounted = true;
    const subtaskListRef = this.taskRef.child('/subtaskList');
    subtaskListRef.on('value', (snapshot) => {
      const subtaskListSnap = snapshot.val() ? snapshot.val() : {};
      if (this.isComponentMounted) {
        this.setState({
          subtaskList: this.getSubtaskListAsArray(subtaskListSnap),
        });
      }
    });
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

  getSubtaskListAsArray = (snapValue) => {
    const subtaskList = [];
    Object.keys(snapValue).forEach((subtask) => {
      const { text, completed } = snapValue[subtask];
      subtaskList.push({
        text,
        completed,
        key: subtask,
      });
    });
    return subtaskList;
  };

  addSubTask = (subTaskText) => {
    if (!subTaskText.trim().length) return;
    const subtaskListRef = this.taskRef.child('/subtaskList');
    subtaskListRef.push({ text: subTaskText.trim(), completed: false });
  };

  deleteSubTask = (subtaskId) => {
    const subtaskRef = this.taskRef.child(`/subtaskList/${subtaskId}`);
    subtaskRef.remove();
  };

  changeSubTaskStatus = (subtaskId) => {
    const subtaskRef = this.taskRef.child(`/subtaskList/${subtaskId}`);
    subtaskRef.once('value', (snapshot) => {
      subtaskRef.set({
        text: snapshot.val().text,
        completed: !snapshot.val().completed,
      });
    });
  };

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
