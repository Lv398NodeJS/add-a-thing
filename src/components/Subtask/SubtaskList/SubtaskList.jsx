import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SubtaskItem from '../SubtaskItem/SubtaskItem';
import * as subtaskActions from '../../../actions/subtaskActions';
import { getVisibleSubtasks } from '../subtaskUtils';

class SubtaskList extends Component {
  constructor(props) {
    super(props);
    const {
      taskRef,
      subtaskListActions: { fetchInfoForSubtaskList },
    } = this.props;
    fetchInfoForSubtaskList(taskRef);
  }

  render() {
    const {
      taskRef, taskStatus, subtaskList = {}, currentFilter,
    } = this.props;
    const subtaskItems = getVisibleSubtasks(subtaskList, currentFilter).map(subtask => (
      <SubtaskItem
        key={subtask.id}
        id={subtask.id}
        text={subtask.text}
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
  subtaskListActions: bindActionCreators(subtaskActions, dispatch),
});

export { SubtaskList as SubtaskListComponent };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubtaskList);
