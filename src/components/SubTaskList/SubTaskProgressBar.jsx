import React, { Component } from 'react';
import { Row, Col, ProgressBar } from 'react-bootstrap';

class SubTaskAdd extends Component {
  render() {
    const { subtaskList } = this.props;
    const completedSubTasks = subtaskList.filter(subTask => subTask.completed);
    const completedSubTasksPercent = (completedSubTasks.length / subtaskList.length) * 100;
    const progressBarVariant = (percent) => {
      switch (true) {
        case percent === 100:
          return 'success';
        case percent > 50:
          return 'info';
        case percent > 30:
          return 'warning';
        default:
          return 'secondary';
      }
    };
    return (
      <Row className="justify-content-sm-center">
        <Col>
          <ProgressBar
            className="mb-3"
            animated
            now={completedSubTasksPercent}
            variant={progressBarVariant(completedSubTasksPercent)}
          />
        </Col>
      </Row>
    );
  }
}

export default SubTaskAdd;
