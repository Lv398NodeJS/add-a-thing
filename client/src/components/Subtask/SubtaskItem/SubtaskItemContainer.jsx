import React, { Component } from 'react';
import SubtaskItem from './SubtaskItem';

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
      id,
      name,
      completed,
      taskStatus,
      taskRef,
    } = this.props;
    const { isEditMode } = this.state;
    return (
      isEditMode
        ? null
        : (
          <SubtaskItem
            id={id}
            name={name}
            completed={completed}
            taskStatus={taskStatus}
            taskRef={taskRef}
          />
        )
    );
  }
}

export default SubtaskItemContainer;
