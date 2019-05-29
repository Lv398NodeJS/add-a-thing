import React, { Component } from 'react';
import { ButtonGroup } from 'react-bootstrap';
import { SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED } from '../subTaskFilterTypes';
import SubTaskFilterButton from './SubTaskFilterButton';

class SubTaskFilterContainer extends Component {
  render() {
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
