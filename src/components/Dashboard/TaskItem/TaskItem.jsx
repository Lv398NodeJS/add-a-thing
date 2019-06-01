import React, { Component } from 'react';
import {
  Container,
  Row,
  Button,
  Col,
  Badge,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import TaskDetailsModal from '../../TaskDetails/TaskDetailsModal';
import './TaskItem.scss';
import del from '../../assets/delete.svg';
import accept from '../../assets/accept.svg';
import {
  getTaskRef,
  getTaskStyleByPriority,
  getTaskStyleByStatus,
  dragStart,
  dragEnd,
} from './TaskItemUtils';

class TaskItem extends Component {
  constructor() {
    super();
    this.state = {
      modalShow: false,
      isDeleted: false,
    };
  }

  closeTaskDetails = () => {
    this.setState({ modalShow: false });
  };

  deleteTaskHandle = (event) => {
    const { isDeleted } = this.state;
    const { taskListRef, id } = this.props;

    if (!isDeleted) {
      this.setState({ isDeleted: true });
    } else {
      getTaskRef(taskListRef, id).remove();
    }

    event.stopPropagation();
  }

  render() {
    const {
      taskListRef,
      id,
      taskName,
      status,
      priority,
    } = this.props;

    const {
      isDeleted,
      modalShow: modalOpen,
    } = this.state;

    return (
      <Container
        className="p-0"
        fluid="true"
      >
        <Container
          id={id}
          fluid="false"
          data-test="taskContainer"
          draggable="true"
          className={getTaskStyleByPriority(priority)}
          onClick={() => this.setState({ modalShow: !modalOpen })}
          onDragStart={e => dragStart(e)}
          onDragEnd={e => dragEnd(e)}
        >
          <Col xs={11}>
            <Row>
              <Container
                className={getTaskStyleByStatus(status)}
                data-test="taskName"
              >
                <span>
                  {taskName}
                </span>
              </Container>
            </Row>
            <Row>
              <Container>
                <Badge variant="secondary">0 / 0</Badge>
              </Container>
            </Row>
          </Col>
          <Col
            xs={1}
            className="d-flex align-items-center m-0 p-0"
          >
            <Button
              variant="light"
              className="delete-button"
              size="sm"
              onClick={this.deleteTaskHandle}
              onMouseLeave={() => this.setState({ isDeleted: false })}
            >
              {!isDeleted
                ? <img src={del} alt={del} className="delete-icon" draggable="false" />
                : <img src={accept} alt={accept} className="accept-icon" draggable="false" />}
            </Button>
          </Col>
        </Container>
        <Container>
          <TaskDetailsModal
            data-test="taskDetails"
            taskRef={getTaskRef(taskListRef, id)}
            show={modalOpen}
            onClose={() => { this.closeTaskDetails(); }}
          />
        </Container>
      </Container>
    );
  }
}

const mapStateToProps = ({ mainContainerReducer: { taskListRef } }) => ({
  taskListRef,
});

export { TaskItem as TaskItemComponent };
export default connect(mapStateToProps)(TaskItem);
