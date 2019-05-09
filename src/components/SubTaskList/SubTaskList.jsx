import React, { Component } from 'react';
import { Row, Col } from 'react-bootstrap';

import SubTaskItem from './SubTaskItem/SubTaskItem';
import SubTaskAdd from './SubTaskAdd/SubTaskAdd';
import SubTaskProgressBar from './SubTaskProgressBar/SubTaskProgressBar';

import getSubtaskListAsArray from './getSubtaskListAsArray';

export default class SubTaskList extends Component {
  constructor(props) {
    super(props);
    this.taskRef = props.taskRef;
    this.state = {
      taskStatus: '',
      subtaskList: [],
    };
  }

  componentDidMount() {
    this.isComponentMounted = true;
    if (!this.taskRef) return;
    this.taskRef.on('value', (snapshot) => {
      const { status, subtaskList = {} } = snapshot.val() || {};
      if (this.isComponentMounted) {
        this.setState({
          taskStatus: status,
          subtaskList: getSubtaskListAsArray(subtaskList),
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

  convertToTask = (subtaskId, text) => {
    const subtaskRef = this.taskRef.child(`/subtaskList/${subtaskId}`);
    subtaskRef.remove().then(
      this.taskRef.parent.push({
        name: text,
        description: '',
        status: 'To Do',
        priority: 'Low',
      }),
    );
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
    const { taskStatus, subtaskList } = this.state;
    const subTaskItems = subtaskList.map(subTask => (
      <SubTaskItem
        key={subTask.id}
        id={subTask.id}
        text={subTask.text}
        completed={subTask.completed}
        taskStatus={taskStatus}
        changeSubTaskStatus={this.changeSubTaskStatus}
        deleteSubTask={this.deleteSubTask}
        convertToTask={this.convertToTask}
      />
    ));

    return (
      <>
        <SubTaskProgressBar subtaskList={subtaskList} />
        {subTaskItems}
        <Row className="justify-content-sm-center">
          <Col>
            <SubTaskAdd taskStatus={taskStatus} addSubTask={this.addSubTask} />
          </Col>
        </Row>
      </>
    );
  }
}
