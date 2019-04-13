import React, { Component } from 'react';
import { InputGroup, Button, FormControl } from 'react-bootstrap';

class SubTaskAdd extends Component {
  render() {
    const { addSubTask } = this.props;
    return (
      <InputGroup className="mb-3">
        <InputGroup.Prepend>
          <Button
            variant="outline-success"
            size="sm"
            onClick={() => {
              addSubTask(this.input.value);
              this.input.value = '';
            }}
          >
            +
          </Button>
        </InputGroup.Prepend>
        <FormControl
          size="sm"
          maxLength={40}
          ref={(input) => {
            this.input = input;
          }}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              addSubTask(this.input.value);
              this.input.value = '';
            }
          }}
        />
      </InputGroup>
    );
  }
}

export default SubTaskAdd;
