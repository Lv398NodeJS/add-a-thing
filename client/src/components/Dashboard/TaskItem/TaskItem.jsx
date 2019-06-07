import React, { Component } from 'react';
import {
  Container,
  Row,
  Button,
  Col,
} from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TaskDetailsModal from '@TaskDetails/TaskDetailsModal';
import * as taskActions from '@actions/taskDetailsActions';
import * as subtaskActions from '@actions/subtaskActions';
import './TaskItem.scss';
import del from '@assets/delete.svg';
import accept from '@assets/accept.svg';
import {
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

  openTaskDetails = () => {
    const {
      id,
      modalOpen,
      taskDetailsActions: { fetchTaskDetails },
      subtaskListActions: { fetchSubtaskList },
    } = this.props;
    fetchTaskDetails(id);
    fetchSubtaskList(id);
    this.setState({ modalShow: !modalOpen });
  }

  closeTaskDetails = () => {
    this.setState({ modalShow: false });
  };

  deleteTaskHandle = (event) => {
    const { isDeleted } = this.state;
    const { taskDetailsActions: { deleteTaskDetails }, id } = this.props;

    if (!isDeleted) {
      this.setState({ isDeleted: true });
    } else {
      deleteTaskDetails(id);
    }

    event.stopPropagation();
  }

  render() {
    const {
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
          onClick={this.openTaskDetails}
          onDragStart={e => dragStart(e)}
          onDragEnd={e => dragEnd(e)}
        >
          <Col
            lg={11}
            md={10}
          >
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
          </Col>
          <Col
            lg={1}
            md={2}
            className="d-flex justify-content-end align-items-center m-0 p-0"
          >
            <Button
              variant="light"
              className="delete-button"
              size="sm"
              onClick={this.deleteTaskHandle}
              onMouseLeave={() => this.setState({ isDeleted: false })}
            >
              {!isDeleted
                ? <img src={del} alt="Delete" className="delete-icon" draggable="false" />
                : <img src={accept} alt="Accept" className="accept-icon" draggable="false" />}
            </Button>
          </Col>
        </Container>
        <Container>
          <TaskDetailsModal
            data-test="taskDetails"
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

const mapDispatchToProps = dispatch => ({
  taskDetailsActions: bindActionCreators(taskActions, dispatch),
  subtaskListActions: bindActionCreators(subtaskActions, dispatch),
});

export { TaskItem as TaskItemComponent };
export default connect(mapStateToProps, mapDispatchToProps)(TaskItem);
