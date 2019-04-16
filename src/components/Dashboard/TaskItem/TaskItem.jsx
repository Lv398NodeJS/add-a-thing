import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
// import firebase and TaskDetails here

export default class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const taskItemStyle = {
      padding: '7px',
      margin: '18px auto',
      width: '100%',
      minHeight: '38px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      color: 'rgb(117, 116, 119)',
      fontSize: '1rem',
      borderRadius: '2px',
      background: 'linear-gradient(to right, #ececec, #f6f6f6)',
      cursor: 'pointer',
    };

    const { taskName } = this.props; // should also receive 'id' to make it work

    return (
      <Container
        className="taskItem"
        style={taskItemStyle}
      >
        {taskName}
      </Container>
    );
  }
}
