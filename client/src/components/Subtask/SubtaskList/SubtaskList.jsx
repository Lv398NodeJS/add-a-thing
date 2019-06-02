import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SubtaskItemContainer from '../SubtaskItem/SubtaskItemContainer';
import * as subtaskActions from '../../../actions/subtaskActions';
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

const mapDispatchToProps = dispatch => ({
  subtaskActions: bindActionCreators(subtaskActions, dispatch),
});

export { SubtaskList as SubtaskListComponent };
export default connect(
  null,
  mapDispatchToProps,
)(SubtaskList);
