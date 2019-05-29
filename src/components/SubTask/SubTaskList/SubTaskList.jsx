import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import SubTaskItem from '../SubTaskItem/SubTaskItem';
import * as subTaskActions from '../../../actions/subTaskActions';
import { getVisibleSubTasks } from '../subTaskUtils';

class SubTaskList extends Component {
  constructor(props) {
    super(props);
    const {
      taskRef,
      subTaskListActions: { fetchInfoForSubTaskList },
    } = this.props;
    fetchInfoForSubTaskList(taskRef);
  }

  render() {
    const {
      taskRef, taskStatus, subtaskList = {}, currentFilter,
    } = this.props;
    const subTaskItems = getVisibleSubTasks(subtaskList, currentFilter).map(subtask => (
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

export { SubTaskList as SubTaskListComponent };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubTaskList);
