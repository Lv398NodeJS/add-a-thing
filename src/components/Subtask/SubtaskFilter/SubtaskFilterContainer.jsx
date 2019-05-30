import React, { Component } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../subtaskFilterTypes';
import SubtaskFilterButton from './SubtaskFilterButton';

class SubtaskFilterContainer extends Component {
  render() {
    return (
      <>
        <span>Show: </span>
        <ButtonGroup>
          <SubtaskFilterButton filterType={SHOW_ALL} />
          <SubtaskFilterButton filterType={SHOW_ACTIVE} />
          <SubtaskFilterButton filterType={SHOW_COMPLETED} />
        </ButtonGroup>
      </>
    );
  }
}


export default SubtaskFilterContainer;
