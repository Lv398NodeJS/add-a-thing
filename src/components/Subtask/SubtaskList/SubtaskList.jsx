import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SubtaskItemContainer from '../SubtaskItem/SubtaskItemContainer';
import * as subtaskActions from '../../../actions/subtaskActions';
import { getVisibleSubtasks } from '../subtaskUtils';

class SubtaskList extends Component {
  constructor(props) {
    super(props);
    const {
      taskRef,
      subtaskActions: { fetchInfoForSubtaskList },
    } = this.props;
    fetchInfoForSubtaskList(taskRef);
  }

  render() {
    const {
      taskRef, taskStatus, subtaskList = {}, currentFilter,
    } = this.props;
    const subtaskItems = getVisibleSubtasks(subtaskList, currentFilter).map(subtask => (
      <SubtaskItemContainer
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
  subtaskActions: bindActionCreators(subtaskActions, dispatch),
});

export { SubtaskList as SubtaskListComponent };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubtaskList);
