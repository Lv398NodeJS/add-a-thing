import React, { Component } from 'react';
import {
  Row, Col, InputGroup, Button, Form,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as importedSubtaskActions from '../../../actions/subtaskActions';

class SubtaskAdd extends Component {
  handleSubmit = (event) => {
    const { subtaskListActions: { addSubtask }, taskId } = this.props;
    event.preventDefault();
    event.stopPropagation();
    const name = this.input.value.trim().replace(/\s+/g, ' ');
    if (this.form.checkValidity() === false) {
      this.form.classList.add('was-validated');
    } else {
      this.form.classList.remove('was-validated');
      addSubtask({ name, completed: false }, taskId);
      this.input.value = '';
    }
  };

  render() {
    const { taskStatus } = this.props;

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
                  className="subtask-save-button"
                  variant="outline-primary"
                  size="sm"
                  as="input"
                  type="submit"
                  value="+"
                  disabled={taskStatus === 'Done'}
                />
              </InputGroup.Prepend>
              <Form.Control
                className="new-subtask-name was-validated"
                size="sm"
                minLength={1}
                maxLength={40}
                placeholder="Enter subtask name here..."
                disabled={taskStatus === 'Done'}
                required
                ref={(input) => {
                  this.input = input;
                }}
                onChange={(event) => {
                  if (!event.target.value.trim().length) event.target.value = '';
                }}
              />
              <div className="valid-feedback">Looks good!</div>
              <div className="invalid-feedback">Please provide subtask name.</div>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  subtaskListActions: bindActionCreators(importedSubtaskActions, dispatch),
});
export { SubtaskAdd as SubtaskAddComponent };
export default connect(
  null,
  mapDispatchToProps,
)(SubtaskAdd);
