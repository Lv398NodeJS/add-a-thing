/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './SubTaskList.scss';
import db from '../../fire';

import SubTaskItem from './SubTaskItem';
import SubTaskAdd from './SubTaskAdd';
import SubTaskProgressBar from './SubTaskProgressBar';

const addSubTask = (subTaskText) => {
  subTaskText = subTaskText.trim();
  if (subTaskText.length > 0) {
    const subTasksRef = db
      .database()
      .ref(
        'dashboards/-LcMVAgWXrLBbfgW1v54/taskList/idForTaskList/task1/idForTask1/subtaskList/idForSubtaskList/',
      );
    const subtask = {
      text: subTaskText,
      completed: false,
    };
    subTasksRef.push(subtask);
  }
};

const changeSubTaskStatus = (subTaskId) => {
  const subTaskRef = db
    .database()
    .ref(
      `dashboards/-LcMVAgWXrLBbfgW1v54/taskList/idForTaskList/task1/idForTask1/subtaskList/idForSubtaskList/${subTaskId}`,
    );

  subTaskRef.once('value', (snapshot) => {
    subTaskRef.set({
      text: snapshot.val().text,
      completed: !snapshot.val().completed,
    });
  });
};

const deleteSubTask = (subTaskId) => {
  const subTaskRef = db
    .database()
    .ref(
      `dashboards/-LcMVAgWXrLBbfgW1v54/taskList/idForTaskList/task1/idForTask1/subtaskList/idForSubtaskList/${subTaskId}`,
    );
  subTaskRef.remove();
};

export default class SubTaskList extends Component {
  constructor(props) {
    super(props);

    const { taskId, updateData } = this.props;
    this.state = { subTasks: [] };
    this.taskId = taskId;
    this.updateData = updateData;
  }

  componentDidMount() {
    const subtasksRef = db
      .database()
      .ref(
        'dashboards/-LcMVAgWXrLBbfgW1v54/taskList/idForTaskList/task1/idForTask1/subtaskList/idForSubtaskList',
      );
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

  render() {
    const { subTasks } = this.state;
    const subTaskItems = subTasks.map(subTask => (
      <SubTaskItem
        key={subTask.key}
        subTask={subTask}
        changeSubTaskStatus={changeSubTaskStatus}
        deleteSubTask={deleteSubTask}
      />
    ));

    return (
      <Container>
        <SubTaskProgressBar subTasks={subTasks} />
        {subTaskItems}
        <Row className="justify-content-sm-center">
          <Col>
            <SubTaskAdd addSubTask={addSubTask} />
          </Col>
        </Row>
      </Container>
    );
  }
}
