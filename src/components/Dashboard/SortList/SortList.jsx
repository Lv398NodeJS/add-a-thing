import React, { Component } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

export default class SortList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentField: null,
      currentDirection: 0,
    };
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
          variant={isHighlighted ? 'dark' : 'outline-secondary'}
          size="sm"
          onClick={() => this.onClickCallback(field)}
          key={field.key}
        >
          {field.text}
          {arrow}
        </Button>
      );
    });

    // Copied array for immutability children array.
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
        <ButtonGroup className="w-100 p-1">
          { fieldsButtonGroup }
        </ButtonGroup>
        <div>
          { sortedChildrenList }
        </div>
      </>
    );
  }
}
