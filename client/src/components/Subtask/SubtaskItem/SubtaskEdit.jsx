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
      _id,
      toggleEditMode,
      subtaskActions: { updateSubtask },
    } = this.props;
    event.preventDefault();
    event.stopPropagation();
    const name = this.input.value.trim().replace(/\s+/g, ' ');
    if (this.form.checkValidity() === false) {
      this.form.classList.add('was-validated');
    } else {
      this.form.classList.remove('was-validated');
      updateSubtask({ payload: name, key: 'name' }, _id);
    }
    toggleEditMode();
  }

  render() {
    const {
      name,
      _id,
    } = this.props;

    return (
      <Row className="subtask-row my-0 mx-0 px-2 rounded">
        <Col className="px-0">
          <Form
            _id={_id}
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
                className="new-subtask-name was-validated"
                size="sm"
                minLength={1}
                maxLength={40}
                defaultValue={name}
                placeholder="Enter subtask name here..."
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
                  className="subtask-save-button"
                  variant="outline-primary"
                  size="sm"
                  type="submit"
                >
                  <img src={accept} alt="accept" />
                </Button>
              </InputGroup.Append>
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
  subtaskActions: bindActionCreators(subtaskActions, dispatch),
});
export { SubtaskEdit as SubtaskEditComponent };
export default connect(
  null,
  mapDispatchToProps,
)(SubtaskEdit);
