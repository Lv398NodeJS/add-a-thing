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
  storageKey = 'null';

  constructor(props) {
    super(props);
    const { storageKey: key } = this.props;
    this.storageKey = key;

    const stateDefaults = {
      currentField: null,
      currentDirection: 0,
    };
    const savedState = this.storageKey ? storage.get(this.storageKey) : {};
    this.state = { ...stateDefaults, ...savedState };
  }

  onClickCallback = (field, direction) => {
    this.setState({ currentField: field, currentDirection: direction });
    if (this.storageKey) {
      storage.set(this.storageKey, { currentField: field, currentDirection: direction });
    }
  };

  render() {
    const { fields, children, sortIconColor } = this.props;
    const { currentField, currentDirection } = this.state;

    const fieldsButtonGroup = fields.map((field) => {
      const isHighlighted = field.key === currentField && currentDirection !== 0;
      const isAsc = isHighlighted && currentDirection === 1;
      const isDesc = isHighlighted && currentDirection === -1;

      return (
        <Dropdown.Item
          className="btn-group btn-group-vertical dont-highlight p-0"
          key={field.key}
        >
          <ButtonGroup
            size="sm"
            variant={isHighlighted ? 'light' : ''}
          >
            <Button
              variant=""
              className="rounded-0 text-left disabled btn-no-outline"
            >
              {field.text}
            </Button>
            <Button
              variant="light"
              active={isAsc}
              className="rounded-0 btn-no-outline flex-grow-0"
              onClick={() => this.onClickCallback(field.key, 1)}
            >
              <SortIconAsc />
            </Button>
            <Button
              variant="light"
              active={isDesc}
              className="rounded-0 btn-no-outline flex-grow-0"
              onClick={() => this.onClickCallback(field.key, -1)}
            >
              <SortIconDesc />
            </Button>
          </ButtonGroup>
        </Dropdown.Item>
      );
    });

    // Copied children array for immutability.
    const sortedChildrenList = [...children].sort((a, b) => {
      const { currentDirection: direction, currentField: key } = this.state;
      const invertedDirection = direction === 1 ? -1 : 1;

      if (direction === 0) {
        return 0;
      }
      const compareA = a.props[key];
      const compareB = b.props[key];
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
            { fieldsButtonGroup }
          </Dropdown.Menu>
        </Dropdown>

        <div>
          { sortedChildrenList }
        </div>
      </>
    );
  }
}
