import React, { Component } from 'react';
import {
  Button, Form, Row, Col,
} from 'react-bootstrap';
import './index.scss';

class Subtask extends Component {
  render() {
    const {
      subTask: { id, completed, text },
      changeSubTaskStatus,
      deleteSubTask,
    } = this.props;
    return (
      <Row className="mb-1">
        <Col className="d-flex justify-content-sm-start col-sm-11">
          <Form.Check type="checkbox" custom id={id}>
            <Form.Check.Input
              type="checkbox"
              checked={completed}
              onChange={() => changeSubTaskStatus(id)}
            />
            <Form.Check.Label className={completed && 'task-completed'}>{text}</Form.Check.Label>
          </Form.Check>
        </Col>
        <Col className="d-flex justify-content-sm-end col-sm-1">
          <Button variant="outline-danger" size="sm" onClick={() => deleteSubTask(id)}>
            x
          </Button>
        </Col>
      </Row>
    );
  }
}

export default Subtask;
