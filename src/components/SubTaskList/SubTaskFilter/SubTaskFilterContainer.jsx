import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as subTaskListActions from '../../../actions/subTaskListActions';
import { subtaskFilterTypes } from '../subTaskFilterTypes';
import SubTaskFilterButton from './SubTaskFilterButton';

class SubTaskFilterContainer extends Component {
  render() {
    return (
      <div>
        <span>Show: </span>
        <SubTaskFilterButton filter={subtaskFilterTypes.SHOW_ALL}>All</SubTaskFilterButton>
        <SubTaskFilterButton filter={subtaskFilterTypes.SHOW_ACTIVE}>Active</SubTaskFilterButton>
        <SubTaskFilterButton filter={subtaskFilterTypes.SHOW_COMPLETED}>Completed</SubTaskFilterButton>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  subTaskListActions: bindActionCreators(subTaskListActions, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(SubTaskFilterContainer);
