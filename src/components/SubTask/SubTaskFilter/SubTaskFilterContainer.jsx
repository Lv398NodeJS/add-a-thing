import React, { Component } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { subtaskFilterTypes } from '../subTaskFilterTypes';
import SubTaskFilterButton from './SubTaskFilterButton';

class SubTaskFilterContainer extends Component {
  render() {
    const { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } = subtaskFilterTypes;
    return (
      <>
        <span>Show: </span>
        <ButtonGroup>
          <SubTaskFilterButton filterType={SHOW_ALL} />
          <SubTaskFilterButton filterType={SHOW_ACTIVE} />
          <SubTaskFilterButton filterType={SHOW_COMPLETED} />
        </ButtonGroup>
      </>
    );
  }
}


export default SubTaskFilterContainer;
