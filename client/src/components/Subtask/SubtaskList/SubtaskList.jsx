import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SubtaskItem from '../SubtaskItem/SubtaskItem';
import * as importedSubtaskActions from '@actions/subtaskActions';
import { getVisibleSubtasks } from '../subtaskUtils';

class SubtaskList extends Component {
  render() {
    const {
      taskRef, taskStatus, subtaskList = {}, currentFilter,
    } = this.props;
    const subtaskItems = getVisibleSubtasks(subtaskList, currentFilter).map(subtask => (
      <SubtaskItem
        key={subtask._id}
        _id={subtask._id}
        name={subtask.name}
        completed={subtask.completed}
        taskStatus={taskStatus}
        taskRef={taskRef}
      />
    ));

    return (subtaskItems);
  }
}

const mapStateToProps = state => ({
  taskStatus: state.subtaskReducer.taskStatus,
  subtaskList: state.subtaskReducer.subtaskList,
  currentFilter: state.subtaskReducer.currentFilter,
  taskDetails: state.taskDetailsReducer.taskDetails,
});

const mapDispatchToProps = dispatch => ({
  subtaskActions: bindActionCreators(importedSubtaskActions, dispatch),
});

export { SubtaskList as SubtaskListComponent };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubtaskList);
