import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as subTaskActions from '../../../actions/subTaskActions';
import { subtaskFilterTypes } from '../subTaskFilterTypes';

class SubTaskFilterButton extends Component {
  getTitle = () => {
    const { type } = this.props;
    switch (type) {
      case subtaskFilterTypes.SHOW_ACTIVE:
        return 'Active';
      case subtaskFilterTypes.SHOW_COMPLETED:
        return 'Completed';
      default:
        return 'All';
    }
  };

  isActive = () => {
    const { type, currentFilter } = this.props;
    if (type === currentFilter) return true;
    return false;
  }

  render() {
    const { type, subTaskActions: { setSubTaskFilter } } = this.props;
    return (
      <Button size="sm" onClick={() => setSubTaskFilter(type)} active={this.isActive()}>{this.getTitle()}</Button>
    );
  }
}
const mapStateToProps = ({ subTaskListReducer: { currentFilter } }) => ({
  currentFilter,
});
const mapDispatchToProps = dispatch => ({
  subTaskActions: bindActionCreators(subTaskActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubTaskFilterButton);
