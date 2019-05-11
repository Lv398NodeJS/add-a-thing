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
    this.setState({ currentField: field, currentDirection: direction });
    if (storageKey) {
      storage.set(storageKey, { currentField: field, currentDirection: direction });
    }
  };

  render() {
    const { children, sortIconColor } = this.props;
    const { currentField, currentDirection } = this.state;

    // Copied children array for immutability.
    const sortedChildrenList = [...children].sort((a, b) => {
      const direction = currentDirection === 'ASC' ? 1 : -1;
      const invertedDirection = direction * -1;

      if (direction === 0) {
        return 0;
      }
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
              key="taskName"
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

        <div>
          { sortedChildrenList }
        </div>
      </>
    );
  }
}
