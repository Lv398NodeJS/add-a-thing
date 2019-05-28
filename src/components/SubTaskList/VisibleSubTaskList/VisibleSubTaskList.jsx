import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SubTaskItem from '../SubTaskItem/SubTaskItem';
import * as subTaskListActions from '../../../actions/subTaskListActions';
import { subtaskFilterTypes } from '../subTaskFilterTypes';

class VisibleSubTaskList extends Component {
  constructor(props) {
    super(props);
    const {
      taskRef,
      subTaskListActions: { fetchInfoForSubTaskList },
    } = this.props;
    fetchInfoForSubTaskList(taskRef);
  }

  getVisibleSubTasks = (subtaskList, filter) => {
    switch (filter) {
      case subtaskFilterTypes.SHOW_ALL:
        return subtaskList;
      case subtaskFilterTypes.SHOW_COMPLETED:
        return subtaskList.filter(subtask => subtask.completed);
      case subtaskFilterTypes.SHOW_ACTIVE:
        return subtaskList.filter(subtask => !subtask.completed);
      default:
        throw new Error(`Unknown filter: ${filter}`);
    }
  }

  render() {
    const {
      taskRef, taskStatus, subtaskList = {}, filter,
    } = this.props;
    const subTaskItems = this.getVisibleSubTasks(subtaskList, filter).map(subtask => (
      <SubTaskItem
        key={subtask.id}
        id={subtask.id}
        text={subtask.text}
        completed={subtask.completed}
        taskStatus={taskStatus}
        taskRef={taskRef}
      />
    ));

    return (subTaskItems);
  }
}

const mapStateToProps = ({ subTaskListReducer: { taskStatus, subtaskList, filter } }) => ({
  taskStatus,
  subtaskList,
  filter,
});

const mapDispatchToProps = dispatch => ({
  subTaskListActions: bindActionCreators(subTaskListActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VisibleSubTaskList);
