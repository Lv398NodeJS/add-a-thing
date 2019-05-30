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
          >
            <InputGroup>
              <Form.Control
                className="new-subtask-text was-validated"
                size="sm"
                value={text}
                minLength={1}
                maxLength={40}
                placeholder="Enter subtask text here..."
                required
              />
              <InputGroup.Append>
                <Button
                  className="add-subtask-button"
                  variant="outline-success"
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
