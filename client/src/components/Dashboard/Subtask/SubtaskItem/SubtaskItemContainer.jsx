import React, { Component } from 'react';
import SubtaskItem from './SubtaskItem';
import SubtaskEdit from './SubtaskEdit';

export class SubtaskItemContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
    };
  }

  toggleEditMode = () => {
    this.setState(prevState => ({
      isEditMode: !prevState.isEditMode,
    }));
  }

  render() {
    const {
      _id,
      name,
      completed,
      taskStatus,
    } = this.props;
    const { isEditMode } = this.state;
    return (
      isEditMode
        ? (
          <SubtaskEdit
            _id={_id}
            name={name}
            toggleEditMode={this.toggleEditMode}
          />
        )
        : (
          <SubtaskItem
            _id={_id}
            name={name}
            completed={completed}
            taskStatus={taskStatus}
            toggleEditMode={this.toggleEditMode}
          />
        )
    );
  }
}

export default SubtaskItemContainer;
