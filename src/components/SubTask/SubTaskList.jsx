/* eslint-disable no-param-reassign */
import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './index.scss';
import uuidv1 from 'uuid/v1';
import SubTaskItem from './SubTaskItem';
import SubTaskAdd from './SubTaskAdd';
import SubTaskProgressBar from './SubTaskProgressBar';

class SubTaskList extends Component {
  constructor(props) {
    super(props);

    const { subtasks } = this.props;
    this.state = { subTasks: subtasks };

    this.changeSubTaskStatus = this.changeSubTaskStatus.bind(this);
    this.addSubTask = this.addSubTask.bind(this);
    this.deleteSubTask = this.deleteSubTask.bind(this);
  }

  changeSubTaskStatus(id) {
    this.setState((prevState) => {
      const updatedSubTasks = prevState.subTasks.map((subTask) => {
        if (subTask.id === id) subTask.completed = !subTask.completed;
        return subTask;
      });
      return { subTasks: updatedSubTasks };
    });
  }

  addSubTask(subTaskText) {
    subTaskText = subTaskText.trim();
    this.setState(prevState => ({
      subTasks: [...prevState.subTasks, { id: uuidv1(), completed: false, text: subTaskText }],
    }));
  }

  deleteSubTask(subTaskId) {
    this.setState((prevState) => {
      const updatedSubTasks = prevState.subTasks.filter(subTask => subTask.id !== subTaskId);
      return { subTasks: updatedSubTasks };
    });
  }

  render() {
    const { subTasks } = this.state;
    const subTaskItems = subTasks.map(subTask => (
      <SubTaskItem
        key={subTask.id}
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

export default SubTaskList;
