import React, { Component } from 'react';
import { connect } from 'react-redux';
import SubtaskItemContainer from '../SubtaskItem/SubtaskItemContainer';
import { getVisibleSubtasks } from '../subtaskUtils';

class SubtaskList extends Component {
  render() {
    const { taskStatus, subtaskList = {}, currentFilter } = this.props;
    const subtaskItems = getVisibleSubtasks(subtaskList, currentFilter).map(subtask => (
      <SubtaskItemContainer
        key={subtask._id}
        _id={subtask._id}
        name={subtask.name}
        completed={subtask.completed}
        taskStatus={taskStatus}
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

export { SubtaskList as SubtaskListComponent };
export default connect(
  mapStateToProps,
  null,
)(SubtaskList);
