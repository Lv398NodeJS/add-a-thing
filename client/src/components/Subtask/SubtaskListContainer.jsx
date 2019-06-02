import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import SubtaskProgressBar from './SubtaskProgressBar/SubtaskProgressBar';
import SubtaskList from './SubtaskList/SubtaskList';
import SubtaskFilterContainer from './SubtaskFilter/SubtaskFilterContainer';
import SubtaskAdd from './SubtaskAdd/SubtaskAdd';

export class SubtaskListContainer extends Component {
  render() {
    const {
      taskId,
      taskStatus,
      subtaskList = {},
      currentFilter,
    } = this.props;
    return (
      <Container fluid className="my-0 mx-0">
        <Row>
          <Col className="col-4">
            <h5>Subtasks:</h5>
          </Col>
          <Col className="col-8 text-right">
            <SubtaskFilterContainer />
          </Col>
        </Row>
        <SubtaskProgressBar subtaskList={subtaskList} />
        <SubtaskList
          taskId={taskId}
          taskStatus={taskStatus}
          subtaskList={subtaskList}
          currentFilter={currentFilter}
        />
        <SubtaskAdd taskId={taskId} taskStatus={taskStatus} />
      </Container>
    );
  }
}

const mapStateToProps = (
  {
    subtaskReducer: { subtaskList, currentFilter },
    taskDetailsReducer: { taskDetails: { _id: taskId, status: taskStatus } },
  },
) => ({
  subtaskList, currentFilter, taskId, taskStatus,
});

export { SubtaskListContainer as SubtaskListContainerComponent };
export default connect(
  mapStateToProps,
  null,
)(SubtaskListContainer);
