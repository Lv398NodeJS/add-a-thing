import React, { Component } from 'react';
import {
  Dropdown,
  ButtonGroup,
  Button,
} from 'react-bootstrap';
import storage from './storage';
import './SortList.scss';
import { ReactComponent as SortIcon } from './sort.svg';
import { ReactComponent as SortIconAsc } from './sort-asc.svg';
import { ReactComponent as SortIconDesc } from './sort-desc.svg';

export default class SortList extends Component {
  constructor(props) {
    super(props);
    const { storageKey } = this.props;
    let savedState = storage.get(storageKey);
    this.state = { ...savedState = {} };
  }

  onClickCallback = (field, direction) => {
    const { storageKey } = this.props;
    const { currentField, currentDirection } = this.state;

    let newDirection = direction;
    if (currentField === field && currentDirection === direction) {
      newDirection = 'NONE';
    }
    this.setState({ currentField: field, currentDirection: newDirection });
    if (storageKey) {
      storage.set(storageKey, { currentField: field, currentDirection: direction });
    }
  };

  render() {
    const { children, sortIconColor, fields } = this.props;
    const { currentField, currentDirection } = this.state;

    const sortVariantsList = fields.map((field) => {
      const isActive = currentField === field.key;
      const isAsc = currentDirection === 'ASC';
      const isDesc = currentDirection === 'DESC';
      return (
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
              {field.text}
            </Button>
            <Button
              variant="light"
              active={isActive && isAsc}
              className="rounded-0 btn-no-outline flex-grow-0"
              onClick={() => this.onClickCallback(field.key, 'ASC')}
            >
              <SortIconAsc />
            </Button>
            <Button
              variant="light"
              active={isActive && isDesc}
              className="rounded-0 btn-no-outline flex-grow-0"
              onClick={() => this.onClickCallback(field.key, 'DESC')}
            >
              <SortIconDesc />
            </Button>
          </ButtonGroup>
        </Dropdown.Item>
      );
    });

    // Copied children array for immutability.
    const sortedChildrenList = [...children].sort((a, b) => {
      if (currentDirection === 'NONE') {
        return 0;
      }

      const direction = currentDirection === 'ASC' ? 1 : -1;
      const invertedDirection = direction * -1;

      const compareA = a.props[currentField];
      const compareB = b.props[currentField];
      if (compareA > compareB) {
        return direction;
      }
      if (compareA < compareB) {
        return invertedDirection;
      }
      return 0;
    });

    return (
      <>
        <Dropdown
          className="dropdown-pull-up"
        >
          <Dropdown.Toggle
            className="btn-no-outline"
            size="sm"
            variant="none"
          >
            <SortIcon fill={sortIconColor} />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {sortVariantsList}
          </Dropdown.Menu>
        </Dropdown>

        <div>
          {sortedChildrenList}
        </div>
      </>
    );
  }
}
