import React, { Component } from 'react';
import {
  Button, Form, Row, Col,
} from 'react-bootstrap';
import './index.scss';

export default class Subtask extends Component {
  render() {
    const {
      subTask: { text, completed, key },
      changeSubTaskStatus,
      deleteSubTask,
    } = this.props;
    return (
      <Row className="mb-1">
        <Col className="d-flex justify-content-sm-start col-sm-11">
          <Form.Check type="checkbox" custom id={key}>
            <Form.Check.Input
              type="checkbox"
              checked={completed}
              onChange={() => changeSubTaskStatus(key)}
            />
            <Form.Check.Label className={completed && 'task-completed'}>{text}</Form.Check.Label>
          </Form.Check>
        </Col>
        <Col className="d-flex justify-content-sm-end col-sm-1">
          <Button
            variant="outline-danger"
            size="sm"
            as="input"
            value="x"
            onClick={() => deleteSubTask(key)}
          />
        </Col>
      </Row>
    );
  }
}
