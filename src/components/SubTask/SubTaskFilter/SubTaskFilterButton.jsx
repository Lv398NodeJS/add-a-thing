import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as subTaskActions from '../../../actions/subTaskActions';
import { subtaskFilterTypes } from '../subTaskFilterTypes';

class SubTaskFilterButton extends Component {
  getTitle = () => {
    const { filterType } = this.props;
    const { SHOW_ACTIVE, SHOW_COMPLETED } = subtaskFilterTypes;

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
    const { filterType, subTaskActions: { setSubTaskFilter } } = this.props;
    return (
      <Button size="sm" onClick={() => setSubTaskFilter(filterType)} active={this.isActive()}>{this.getTitle()}</Button>
    );
  }
}
const mapStateToProps = ({ subTaskReducer: { currentFilter } }) => ({
  currentFilter,
});
const mapDispatchToProps = dispatch => ({
  subTaskActions: bindActionCreators(subTaskActions, dispatch),
});

export { SubTaskFilterButton as SubTaskFilterButtonComponent };
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SubTaskFilterButton);
