import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as subTaskActions from '../../actions/subTaskListActions';
import SubTaskProgressBar from './SubTaskProgressBar/SubTaskProgressBar';
import VisibleSubTaskList from './VisibleSubTaskList/VisibleSubTaskList';
import SubTaskAdd from './SubTaskAdd/SubTaskAdd';

export class SubTaskList extends Component {
  render() {
    const { taskRef, taskStatus, subtaskList = {} } = this.props;
    return (
      <Container fluid className="my-0 mx-0">
        <Row>
          <Col>
            <h5>Subtasks:</h5>
          </Col>
        </Row>
        <SubTaskProgressBar subtaskList={subtaskList} />
        <VisibleSubTaskList taskRef={taskRef} />
        <SubTaskAdd taskStatus={taskStatus} taskRef={taskRef} />
      </Container>
    );
  }
}

const mapStateToProps = ({ subTaskListReducer: { taskStatus, subtaskList } }) => ({
  taskStatus,
  subtaskList,
});

const mapDispatchToProps = dispatch => ({
  subTaskListActions: bindActionCreators(subTaskActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubTaskList);
