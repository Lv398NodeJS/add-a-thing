import React, { Component } from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import getProgressBarVariant from './getProgressBarVariant';

class SubTaskProgressBar extends Component {
  render() {
    const { subtaskList = [] } = this.props;
    const completedSubTasks = subtaskList.filter(subTask => subTask.completed);
    const completedSubTasksPercent = (completedSubTasks.length / subtaskList.length) * 100;
    return (
      <Row className="justify-content-sm-center">
        <Col>
          <ProgressBar
            className="subtask-progressbar mb-3"
            animated
            now={completedSubTasksPercent}
            variant={getProgressBarVariant(completedSubTasksPercent)}
          />
        </Col>
      </Row>
    );
  }
}

export default SubTaskProgressBar;
