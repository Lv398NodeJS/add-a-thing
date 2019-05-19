import React, { Component } from 'react';
import { Row, Col, Container } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as subTaskActions from '../../actions/subTaskListActions';

import SubTaskItem from './SubTaskItem/SubTaskItem';
import SubTaskAdd from './SubTaskAdd/SubTaskAdd';
import SubTaskProgressBar from './SubTaskProgressBar/SubTaskProgressBar';


export class SubTaskList extends Component {
  constructor(props) {
    super(props);
    const { taskRef, subTaskListActions } = this.props;
    subTaskListActions.fetchTaskStatus(taskRef);
    subTaskListActions.fetchSubTaskList(taskRef);
  }
  componentWillReceiveProps() {
    console.log("props received");
  }

  componentDidUpdate() {
    console.log("component did update");
  }

  render() {
    const { taskRef, taskStatus, subtaskList = {} } = this.props;
    const subTaskItems = subtaskList.map(subTask => (
      <SubTaskItem
        key={subTask.id}
        id={subTask.id}
        text={subTask.text}
        completed={subTask.completed}
        taskStatus={taskStatus}
        taskRef={taskRef}
      />
    ));
    return (
      <Container fluid className="my-0 mx-0">
        <Row>
          <Col>
            <h5>Subtasks:</h5>
          </Col>
        </Row>
        <SubTaskProgressBar subtaskList={subtaskList} />
        {subTaskItems}
        <SubTaskAdd taskStatus={taskStatus} taskRef={taskRef} />
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  taskStatus: state.subTaskListReducer.taskStatus,
  subtaskList: state.subTaskListReducer.subtaskList,
});

const mapDispatchToProps = dispatch => ({
  subTaskListActions: bindActionCreators(subTaskActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubTaskList);
