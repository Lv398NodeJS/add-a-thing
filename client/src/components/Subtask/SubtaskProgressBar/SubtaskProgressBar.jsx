import React, { Component } from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';
import { getProgressBarVariant, getCompletedSubtasksPercent } from './subtaskProgressBarUtils';

class SubtaskProgressBar extends Component {
  render() {
    const { subtaskList = [] } = this.props;
    const completedSubtasksPercent = getCompletedSubtasksPercent(subtaskList);
    return (
      <Row className="my-2 mt-0 mx-0">
        <Col className="px-0 text-center">
          <span>{`Completed: ${completedSubtasksPercent}%`}</span>
          <ProgressBar
            className="subtask-progressbar"
            animated
            now={completedSubtasksPercent}
            variant={getProgressBarVariant(completedSubtasksPercent)}
          />
        </Col>
      </Row>
    );
  }
}

export default SubtaskProgressBar;
