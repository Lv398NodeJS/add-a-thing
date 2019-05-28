import React, { Component } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { subtaskFilterTypes } from '../subTaskFilterTypes';
import SubTaskFilterButton from './SubTaskFilterButton';

class SubTaskFilterContainer extends Component {
  render() {
    return (
      <>
        <span>Show: </span>
        <ButtonGroup>
          <SubTaskFilterButton type={subtaskFilterTypes.SHOW_ALL} />
          <SubTaskFilterButton type={subtaskFilterTypes.SHOW_ACTIVE} />
          <SubTaskFilterButton type={subtaskFilterTypes.SHOW_COMPLETED} />
        </ButtonGroup>
      </>
    );
  }
}


export default SubTaskFilterContainer;
