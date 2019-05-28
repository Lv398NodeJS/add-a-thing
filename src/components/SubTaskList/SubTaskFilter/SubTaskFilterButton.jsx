import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as subTaskListActions from '../../../actions/subTaskListActions';
import { subtaskFilterTypes } from '../subTaskFilterTypes';

class SubTaskFilterButton extends Component {
  getTitle = () => {
    const { filter } = this.props;
    switch (filter) {
      case subtaskFilterTypes.SHOW_ACTIVE:
        return 'Active';
      case subtaskFilterTypes.SHOW_COMPLETED:
        return 'Completed';
      default:
        return 'All';
    }
  };

  render() {
    const { filter, subTaskListActions: { setSubTaskFilter } } = this.props;
    return (
      <Button size="sm" onClick={() => setSubTaskFilter(filter)}>{this.getTitle()}</Button>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  subTaskListActions: bindActionCreators(subTaskListActions, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(SubTaskFilterButton);
