import React, { Component } from 'react';
import SubtaskItem from './SubtaskItem';
import SubtaskEdit from './SubtaskEdit';

export class SubtaskListContainer extends Component {
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
      id, text, completed, taskStatus, taskRef,
    } = this.props;
    const { isEditMode } = this.state;
    return (
      isEditMode
        ? (
          <SubtaskEdit
            taskRef={taskRef}
            id={id}
            text={text}
          />
        )
        : (
          <SubtaskItem
            id={id}
            text={text}
            completed={completed}
            taskStatus={taskStatus}
            taskRef={taskRef}
            toggleEditMode={this.toggleEditMode}
          />
        )
    );
  }
}

export default SubtaskListContainer;
