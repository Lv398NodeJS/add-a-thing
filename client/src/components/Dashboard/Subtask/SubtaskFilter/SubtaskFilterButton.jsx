import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as subtaskActions from '@actions/subtaskActions';
import { SHOW_ACTIVE, SHOW_COMPLETED } from '../subtaskFilterTypes';

class SubtaskFilterButton extends Component {
  getTitle = () => {
    const { filterType } = this.props;

    switch (filterType) {
      case SHOW_ACTIVE:
        return 'Active';
      case SHOW_COMPLETED:
        return 'Completed';
      default:
        return 'All';
    }
  };

  isActive = () => {
    const { filterType, currentFilter } = this.props;
    return filterType === currentFilter;
  }

  render() {
    const { filterType, subtaskActions: { setSubtaskFilter } } = this.props;
    return (
      <Button size="sm" onClick={() => setSubtaskFilter(filterType)} active={this.isActive()}>{this.getTitle()}</Button>
    );
  }
}
const mapStateToProps = ({ subtaskReducer: { currentFilter } }) => ({
  currentFilter,
});
const mapDispatchToProps = dispatch => ({
  subtaskActions: bindActionCreators(subtaskActions, dispatch),
});

export { SubtaskFilterButton as SubtaskFilterButtonComponent };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubtaskFilterButton);
