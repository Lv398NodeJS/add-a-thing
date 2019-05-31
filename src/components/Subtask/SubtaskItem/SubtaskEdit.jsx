import React, { Component } from 'react';
import {
  Form, Row, Col, InputGroup, Button,
} from 'react-bootstrap';
import './SubtaskItem.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import accept from '../../assets/accept.svg';
import * as subtaskActions from '../../../actions/subtaskActions';

class SubtaskEdit extends Component {
  handleSubmit = (event) => {
    const {
      taskRef,
      id,
      toggleEditMode,
      subtaskActions: { editSubtaskText },
    } = this.props;
    event.preventDefault();
    event.stopPropagation();
    const text = this.input.value.trim().replace(/\s+/g, ' ');
    if (this.form.checkValidity() === false) {
      this.form.classList.add('was-validated');
    } else {
      this.form.classList.remove('was-validated');
      editSubtaskText(taskRef, id, text);
      toggleEditMode();
    }
  };

  render() {
    const {
      text,
      id,
    } = this.props;

    return (
      <Row className="subtask-row my-0 mx-0 px-2 rounded">
        <Col className="px-0">
          <Form
            id={id}
            className="needs-validation"
            method="POST"
            noValidate
            onSubmit={event => this.handleSubmit(event)}
            ref={(form) => {
              this.form = form;
            }}
          >
            <InputGroup>
              <Form.Control
                className="new-subtask-text was-validated"
                size="sm"
                minLength={1}
                maxLength={40}
                defaultValue={text}
                placeholder="Enter subtask text here..."
                required
                ref={(input) => {
                  this.input = input;
                }}
                onChange={(event) => {
                  if (!event.target.value.trim().length) event.target.value = '';
                }}
              />
              <InputGroup.Append>
                <Button
                  className="add-subtask-button"
                  variant="outline-primary"
                  size="sm"
                  type="submit"
                  value={<img src={accept} alt={accept} className="accept-icon" />}
                >
                  <img src={accept} alt={accept} className="inputicon" />
                </Button>
              </InputGroup.Append>
              <div className="valid-feedback">Looks good!</div>
              <div className="invalid-feedback">Please provide subtask text.</div>
            </InputGroup>
          </Form>
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  subtaskActions: bindActionCreators(subtaskActions, dispatch),
});
export { SubtaskEdit as SubtaskEditComponent };
export default connect(
  null,
  mapDispatchToProps,
)(SubtaskEdit);
