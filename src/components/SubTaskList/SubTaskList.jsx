import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';

import SubTaskItem from './SubTaskItem/SubTaskItem';
import SubTaskAdd from './SubTaskAdd/SubTaskAdd';
import SubTaskProgressBar from './SubTaskProgressBar/SubTaskProgressBar';

import getSubtaskListAsArray from './getSubtaskListAsArray';

export default class SubTaskList extends Component {
  constructor(props) {
    super(props);
    this.taskRef = props.taskRef;
    this.state = {
      subtaskList: [],
    };
  }

  componentDidMount() {
    this.isComponentMounted = true;
    if (!this.taskRef) return;
    const subtaskListRef = this.taskRef.child('/subtaskList');
    subtaskListRef.on('value', (snapshot) => {
      const subtaskListSnap = snapshot.val() ? snapshot.val() : {};
      if (this.isComponentMounted) {
        this.setState({
          subtaskList: getSubtaskListAsArray(subtaskListSnap),
        });
      }
    });
  }

  componentWillUnmount() {
    this.isComponentMounted = false;
  }

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
        key={subTask.id}
        id={subTask.id}
        text={subTask.text}
        completed={subTask.completed}
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
