import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';
import storage from './storage';
import './SortList.scss';

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

  onClickCallback = (fieldObject) => {
    const { currentField, currentDirection } = this.state;
    const { key: newField } = fieldObject;

    let newDirection = 1;
    if (currentField === newField) {
      switch (currentDirection) {
        case 1:
          newDirection = -1;
          break;
        case -1:
          newDirection = 0;
          break;
        case 0:
        default:
          newDirection = 1;
          break;
      }
    }

    this.setState({ currentField: newField, currentDirection: newDirection });
    if (this.storageKey) {
      storage.set(this.storageKey, { currentField: newField, currentDirection: newDirection });
    }
  };

  render() {
    const { fields, children } = this.props;
    const { currentField, currentDirection } = this.state;

    const fieldsButtonGroup = fields.map((field) => {
      const isHighlighted = field.key === currentField && currentDirection !== 0;
      let arrow = '';
      if (field.key === currentField) {
        switch (currentDirection) {
          case -1:
            arrow = ' ▼';
            break;
          case 0:
            arrow = '';
            break;
          case 1:
          default:
            arrow = ' ▲';
            break;
        }
      }
      return (
        <Button
          variant={isHighlighted ? 'light' : ''}
          className="btn-no-outline"
          onClick={() => this.onClickCallback(field)}
          key={field.key}
        >
          {field.text}
          {arrow}
        </Button>
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
        <ButtonGroup size="sm" className="w-100 py-1">
          <Button variant="" className="disabled btn-no-outline">
            {'Sort by'}
          </Button>
          { fieldsButtonGroup }
        </ButtonGroup>
        <div>
          { sortedChildrenList }
        </div>
      </>
    );
  }
}
