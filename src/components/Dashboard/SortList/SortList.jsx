import React, { Component } from 'react';
import {
  Dropdown,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import { storage } from './utils';
import './SortList.scss';
import { ReactComponent as SortIcon } from './sort.svg';
import { ReactComponent as SortIconAsc } from './sort-asc.svg';
import { ReactComponent as SortIconDesc } from './sort-desc.svg';

export default class SortList extends Component {
  constructor(props) {
    super(props);
    const { storageKey } = this.props;
    const savedState = storage.get(storageKey);
    this.state = savedState || {};
  }

  onClickCallback = (field, direction) => {
    const { storageKey, onUpdate } = this.props;
    const { currentField, currentDirection } = this.state;

    let newDirection = direction;
    if (currentField === field && currentDirection === direction) {
      newDirection = 'NONE';
    }
    this.setState({ currentField: field, currentDirection: newDirection });
    if (storageKey) {
      storage.set(storageKey, { currentField: field, currentDirection: newDirection });
    }
    onUpdate(field, newDirection);
  };

  render() {
    const { color } = this.props;
    const { currentField, currentDirection } = this.state;

    return (
      <Dropdown
        alignRight
        className="dropdown-pull-up"
      >
        <Dropdown.Toggle
          className="btn-no-outline no-arrow"
          size="sm"
          variant="none"
        >
          <SortIcon fill={color} />
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item
            className="btn-group btn-group-vertical dont-highlight p-0"
            key="taskName"
          >
            <ButtonGroup
              size="sm"
            >
              <Button
                variant=""
                className="rounded-0 text-left disabled btn-no-outline"
              >
                Name
              </Button>
              <Button
                variant="light"
                active={currentField === 'taskName' && currentDirection === 'ASC'}
                className="rounded-0 btn-no-outline flex-grow-0"
                onClick={() => this.onClickCallback('taskName', 'ASC')}
              >
                <SortIconAsc />
              </Button>
              <Button
                variant="light"
                active={currentField === 'taskName' && currentDirection === 'DESC'}
                className="rounded-0 btn-no-outline flex-grow-0"
                onClick={() => this.onClickCallback('taskName', 'DESC')}
              >
                <SortIconDesc />
              </Button>
            </ButtonGroup>
          </Dropdown.Item>
          <Dropdown.Item
            className="btn-group btn-group-vertical dont-highlight p-0"
            key="priorityForSorting"
          >
            <ButtonGroup
              size="sm"
            >
              <Button
                variant=""
                className="rounded-0 text-left disabled btn-no-outline"
              >
                Priority
              </Button>
              <Button
                variant="light"
                active={currentField === 'priorityForSorting' && currentDirection === 'ASC'}
                className="rounded-0 btn-no-outline flex-grow-0"
                onClick={() => this.onClickCallback('priorityForSorting', 'ASC')}
              >
                <SortIconAsc />
              </Button>
              <Button
                variant="light"
                active={currentField === 'priorityForSorting' && currentDirection === 'DESC'}
                className="rounded-0 btn-no-outline flex-grow-0"
                onClick={() => this.onClickCallback('priorityForSorting', 'DESC')}
              >
                <SortIconDesc />
              </Button>
            </ButtonGroup>
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
