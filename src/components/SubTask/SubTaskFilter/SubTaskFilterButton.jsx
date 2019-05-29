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
    return type === currentFilter;
  }

  render() {
    const { type, subTaskActions: { setSubTaskFilter } } = this.props;
    return (
      <Button size="sm" onClick={() => setSubTaskFilter(type)} active={this.isActive()}>{this.getTitle()}</Button>
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
