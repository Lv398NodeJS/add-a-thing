import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SubtaskItemContainer from '../SubtaskItem/SubtaskItemContainer';
import * as importedSubtaskActions from '../../../actions/subtaskActions';
import { getVisibleSubtasks } from '../subtaskUtils';

class SubtaskList extends Component {
  render() {
    const {
      taskRef, taskStatus, subtaskList = {}, currentFilter,
    } = this.props;
    const subtaskItems = getVisibleSubtasks(subtaskList, currentFilter).map(subtask => (
      <SubtaskItemContainer
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

const mapStateToProps = ({ subtaskReducer: { taskStatus, subtaskList, currentFilter } }) => ({
  taskStatus,
  subtaskList,
  currentFilter,
});

const mapDispatchToProps = dispatch => ({
  subtaskActions: bindActionCreators(importedSubtaskActions, dispatch),
});

export { SubtaskList as SubtaskListComponent };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubtaskList);
