import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import TaskDetails from '../TaskDetails/TaskDetails';

export default class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const taskItemStyle = {
      width: '100%',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      padding: '7px',
      margin: '18px auto',
      textAlign: 'left',
      color: 'rgb(117, 116, 119)',
      fontSize: '1rem',
      borderRadius: '2px',
      background: 'linear-gradient(to right, #ececec, #f6f6f6)',
      cursor: 'pointer',
    };

    const { taskName } = this.props;

    return (
      <Container className="taskItem" style={taskItemStyle}>{taskName}</Container>
    );
  }
}
