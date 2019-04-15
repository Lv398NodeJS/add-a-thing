import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import TaskItem from '../TaskItem/TaskItem';

export default class InProgress extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const taskColumnInProgressStyle = {
      textAlign: 'center',
      margin: '25px auto 30px',
      fontSize: '1.8rem',
      color: 'rgb(118, 183, 192)',
      borderBottom: '3px solid rgb(116, 154, 159)',
    };

    return (
      <Container className="taskColumnContainer">
        <h1 className="taskColumnInProgressStyle" style={taskColumnInProgressStyle}>In progress</h1>
        {/* {taskItem} */}
      </Container>
    );
  }
}
