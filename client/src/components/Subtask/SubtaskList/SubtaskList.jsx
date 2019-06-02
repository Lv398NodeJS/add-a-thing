import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
<<<<<<< HEAD
import SubtaskItem from '../SubtaskItem/SubtaskItem';
import * as importedSubtaskActions from '@actions/subtaskActions';
=======
import SubtaskItemContainer from '../SubtaskItem/SubtaskItemContainer';
import * as subtaskActions from '../../../actions/subtaskActions';
>>>>>>> f95a6eeb6e030b06c6a9f8275312d4231af10c95
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
