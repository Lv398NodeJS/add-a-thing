import React, { Component } from 'react';
import {
  Row, Col, InputGroup, Button, FormControl,
} from 'react-bootstrap';

export default class SubTaskAdd extends Component {
  render() {
    const { taskStatus, addSubTask } = this.props;
    return (
      <Row className="mb-0 mt-3 mx-0">
        <Col className="px-0">
          <InputGroup>
            <InputGroup.Prepend>
              <Button
                className="add-subtask-button"
                variant="outline-success"
                size="sm"
                as="input"
                type="button"
                value="+"
                disabled={taskStatus === 'Done'}
                onClick={() => {
                  addSubTask(this.input.value);
                  this.input.value = '';
                }}
              />
            </InputGroup.Prepend>
            <FormControl
              className="new-subtask-text"
              size="sm"
              minLength={1}
              maxLength={40}
              placeholder="Enter subtask text here..."
              disabled={taskStatus === 'Done'}
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
        </Col>
      </Row>
    );
  }
}
