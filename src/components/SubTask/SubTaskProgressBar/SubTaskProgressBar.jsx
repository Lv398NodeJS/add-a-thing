import React, { Component } from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import { getProgressBarVariant, getCompletedSubTasksPercent } from './subTaskProgressBarUtils';

class SubTaskProgressBar extends Component {
  render() {
    const { subtaskList = [] } = this.props;
    const completedSubTasksPercent = getCompletedSubTasksPercent(subtaskList);
    return (
      <Row className="my-2 mt-0 mx-0">
        <Col className="px-0 text-center">
          <span>{`Completed: ${completedSubTasksPercent}%`}</span>
          <ProgressBar
            className="subtask-progressbar"
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
