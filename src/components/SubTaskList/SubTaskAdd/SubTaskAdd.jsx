import React, { Component } from 'react';
import {
  Row, Col, InputGroup, Button, Form,
} from 'react-bootstrap';

export default class SubTaskAdd extends Component {
  constructor(props) {
    super(props);
    const { taskStatus, addSubTask } = this.props;
    this.taskStatus = taskStatus;
    this.addSubTask = addSubTask;
  }

  handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const allTrimmedText = this.input.value.trim().replace(/\s+/g, ' ');
    if (this.form.checkValidity() === false) {
      this.form.classList.add('was-validated');
    } else {
      this.form.classList.remove('was-validated');
      this.addSubTask(allTrimmedText);
      this.input.value = '';
    }
  };

  render() {
    return (
      <Row className="mb-0 mt-3 mx-0">
        <Col className="px-0">
          <Form
            className="needs-validation"
            method="POST"
            noValidate
            onSubmit={event => this.handleSubmit(event)}
            ref={(form) => {
              this.form = form;
            }}
          >
            <InputGroup>
              <InputGroup.Prepend>
                <Button
                  className="add-subtask-button"
                  variant="outline-success"
                  size="sm"
                  as="input"
                  type="submit"
                  value="+"
                  disabled={this.taskStatus === 'Done'}
                />
              </InputGroup.Prepend>
              <Form.Control
                className="new-subtask-text was-validated"
                size="sm"
                minLength={1}
                maxLength={40}
                placeholder="Enter subtask text here..."
                disabled={this.taskStatus === 'Done'}
                required
                ref={(input) => {
                  this.input = input;
                }}
                onChange={(event) => {
                  if (!event.target.value.trim().length) event.target.value = '';
                }}
              />
              <div className="valid-feedback">Looks good!</div>
              <div className="invalid-feedback">Please provide subtask text.</div>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    );
  }
}
