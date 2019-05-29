import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import SubTaskProgressBar from './SubTaskProgressBar/SubTaskProgressBar';
import SubTaskList from './SubTaskList/SubTaskList';
import SubTaskFilterContainer from './SubTaskFilter/SubTaskFilterContainer';
import SubTaskAdd from './SubTaskAdd/SubTaskAdd';

export class SubTaskListContainer extends Component {
  render() {
    const { taskRef, taskStatus, subtaskList = {} } = this.props;
    return (
      <Container fluid className="my-0 mx-0">
        <Row>
          <Col className="col-4">
            <h5>Subtasks:</h5>
          </Col>
          <Col className="col-8 text-right">
            <SubTaskFilterContainer />
          </Col>
        </Row>
        <SubTaskProgressBar subtaskList={subtaskList} />
        <SubTaskList taskRef={taskRef} />
        <SubTaskAdd taskStatus={taskStatus} taskRef={taskRef} />
      </Container>
    );
  }
}

const mapStateToProps = ({ subTaskReducer: { taskStatus, subtaskList } }) => ({
  taskStatus,
  subtaskList,
});

export { SubTaskListContainer as SubTaskListContainerComponent };
export default connect(
  mapStateToProps,
  null,
)(SubTaskListContainer);
