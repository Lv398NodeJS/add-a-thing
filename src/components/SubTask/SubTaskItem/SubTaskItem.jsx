import React, { Component } from 'react';
import {
  Form, Row, Col, Dropdown,
} from 'react-bootstrap';
import './SubTaskItem.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as importedSubTaskActions from '../../../actions/subTaskActions';
import threedots from '../../assets/three-dots.svg';

class SubTaskItem extends Component {
  constructor(props) {
    super(props);
    const { taskRef, subTaskActions: { changeSubTaskStatus, deleteSubTask, convertToTask } } = this.props;
    this.taskRef = taskRef;
    this.changeSubTaskStatus = changeSubTaskStatus;
    this.deleteSubTask = deleteSubTask;
    this.convertToTask = convertToTask;
  }

  render() {
    const {
      text,
      completed,
      id,
      taskStatus,
    } = this.props;

    return (
      <Row className="subtask-row my-0 mx-0 px-2 rounded">
        <Col
          className="d-flex justify-content-sm-start col-sm-11 px-0 my-1"
          onClick={() => taskStatus !== 'Done' && this.changeSubTaskStatus(this.taskRef, id)}
        >
          <Form.Check type="checkbox" custom id={id}>
            <Form.Check.Input
              type="checkbox"
              checked={completed}
              disabled={taskStatus === 'Done'}
              onChange={() => this.changeSubTaskStatus(this.taskRef, id)}
            />
            <Form.Check.Label>{text}</Form.Check.Label>
          </Form.Check>
        </Col>
        <Col className="d-flex justify-content-sm-end col-sm-1 px-0">
          <Dropdown>
            <Dropdown.Toggle
              variant="light"
              size="sm"
              className="subtask-dropdown-toggle"
              disabled={taskStatus === 'Done'}
            >
              <img src={threedots} alt={threedots} className="threedots-icon" />
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => this.deleteSubTask(this.taskRef, id)}>
                Delete
              </Dropdown.Item>
              <Dropdown.Item onClick={() => this.convertToTask(this.taskRef, id, text)}>
                Convert to Task
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  subTaskActions: bindActionCreators(importedSubTaskActions, dispatch),
});
export { SubTaskItem as SubTaskItemComponent };
export default connect(
  null,
  mapDispatchToProps,
)(SubTaskItem);