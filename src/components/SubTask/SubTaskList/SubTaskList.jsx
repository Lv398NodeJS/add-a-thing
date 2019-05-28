import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SubTaskItem from '../SubTaskItem/SubTaskItem';
import * as subTaskActions from '../../../actions/subTaskActions';
import { subtaskFilterTypes } from '../subTaskFilterTypes';

class SubTaskList extends Component {
  constructor(props) {
    super(props);
    const {
      taskRef,
      subTaskListActions: { fetchInfoForSubTaskList },
    } = this.props;
    fetchInfoForSubTaskList(taskRef);
  }

  getVisibleSubTasks = (subtaskList, currentFilter) => {
    switch (currentFilter) {
      case subtaskFilterTypes.SHOW_ALL:
        return subtaskList;
      case subtaskFilterTypes.SHOW_COMPLETED:
        return subtaskList.filter(subtask => subtask.completed);
      case subtaskFilterTypes.SHOW_ACTIVE:
        return subtaskList.filter(subtask => !subtask.completed);
      default:
        throw new Error(`Unknown filter: ${currentFilter}`);
    }
  }

  render() {
    const {
      taskRef, taskStatus, subtaskList = {}, currentFilter,
    } = this.props;
    const subTaskItems = this.getVisibleSubTasks(subtaskList, currentFilter).map(subtask => (
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

const mapStateToProps = ({ subTaskReducer: { taskStatus, subtaskList, currentFilter } }) => ({
  taskStatus,
  subtaskList,
  currentFilter,
});

const mapDispatchToProps = dispatch => ({
  subTaskListActions: bindActionCreators(subTaskActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubTaskList);
