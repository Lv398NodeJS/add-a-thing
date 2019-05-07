import React, { Component } from 'react';
import {
  Button, Form, Row, Col,
} from 'react-bootstrap';
import './SubTaskItem.scss';

export default class SubTaskItem extends Component {
  render() {
    const {
      text, completed, id, taskStatus, changeSubTaskStatus, deleteSubTask,
    } = this.props;

    return (
      <Row className="mb-1">
        <Col className="d-flex justify-content-sm-start col-sm-11">
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
        <Col className="d-flex justify-content-sm-end col-sm-1">
          <Button
            variant="outline-danger"
            size="sm"
            as="input"
            value="x"
            disabled={taskStatus === 'Done'}
            onClick={() => deleteSubTask(id)}
          />
        </Col>
      </Row>
    );
  }
}
