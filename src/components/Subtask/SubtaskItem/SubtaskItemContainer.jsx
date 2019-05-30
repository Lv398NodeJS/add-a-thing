import React, { Component } from 'react';
import SubtaskItem from './SubtaskItem';

export class SubtaskListContainer extends Component {
  // constructor(props){
  //   super(props);
  // }

  render() {
    const {
      key, id, text, completed, taskStatus, taskRef,
    } = this.props;
    return (
      <SubtaskItem
        key={key}
        id={id}
        text={text}
        completed={completed}
        taskStatus={taskStatus}
        taskRef={taskRef}
      />
    );
  }
}

export default SubtaskListContainer;
