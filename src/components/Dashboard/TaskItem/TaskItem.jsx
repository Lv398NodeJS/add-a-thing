import React, { Component } from 'react';
import { Container } from 'react-bootstrap';
import './TaskItem.scss';
import TaskDetails from '../../TaskDetails/TaskDetails';

export default class TaskItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalShow: false,
    };
  }

  closeTaskDetails = () => {
    this.setState({ modalShow: false });
  };

  getTaskStyleByPriority = () => {
    const { priority, status } = this.props;
    let style = status === 'Done' ? 'taskItemDone' : 'taskItem';
    switch (priority) {
      case 'High':
        style += ' priorityH';
        break;
      case 'Medium':
        style += ' priorityM';
        break;
      case 'Low':
        style += ' priorityL';
        break;
      default:
        break;
    }
    return style;
  }

  render() {
    const { taskName, taskListRef, id } = this.props;
    const taskRef = taskListRef.child(`${id}`);
    const { modalShow: modalOpen } = this.state;

    return (
      <Container className="TaskItemContainer">
        <Container
          className={this.getTaskStyleByPriority()}
          onClick={() => this.setState({ modalShow: !modalOpen })}
        >
          {taskName}
        </Container>
        <Container>
          <TaskDetails
            taskRef={taskRef}
            show={modalOpen}
            onClose={() => { this.closeTaskDetails(); }}
          />
        </Container>
      </Container>
    );
  }
}
