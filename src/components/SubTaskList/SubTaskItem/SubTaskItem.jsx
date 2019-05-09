import React, { Component } from 'react';
import {
  Form, Row, Col, Dropdown,
} from 'react-bootstrap';
import './SubTaskItem.scss';
import threedots from '../../assets/three-dots.svg';

export default class SubTaskItem extends Component {
  render() {
    const {
      text,
      completed,
      id,
      taskStatus,
      changeSubTaskStatus,
      deleteSubTask,
      convertToTask,
    } = this.props;

    return (
      <Row className="subtask-row mb-0 mt-0 mx-1 rounded px-2 py-1">
        <Col
          className="d-flex justify-content-sm-start col-sm-11 px-0"
          onClick={() => taskStatus !== 'Done' && changeSubTaskStatus(id)}
        >
          <Form.Check type="checkbox" custom id={id}>
            <Form.Check.Input
              type="checkbox"
              checked={completed}
              disabled={taskStatus === 'Done'}
              onChange={() => changeSubTaskStatus(id)}
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
              <Dropdown.Item onClick={() => deleteSubTask(id)}>Delete</Dropdown.Item>
              <Dropdown.Item onClick={() => convertToTask(id, text)}>Convert to Task</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
      </Row>
    );
  }
}
