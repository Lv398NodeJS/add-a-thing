import React from 'react';
import { Container, ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import EditName from './EditName';
import EditDescription from './EditDescription';
import TaskStatus from './TaskStatus';
import TaskPriority from './TaskPriority';
import * as taskActions from '../../actions/taskDetailsActions';
import './TaskDetailsStyle.scss';

export class TaskDetails extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      editName: false,
      editDescription: false,
    };
  }

  componentDidMount() {
    const { taskRef, taskDetailsActions } = this.props;
    if (!taskRef) return;
    taskDetailsActions.fetchTaskDetails(taskRef);
  }

  handleEditName = () => {
    const { editName } = this.state;
    this.setState({
      editName: !editName,
    });
  };

  handleEditDescription = () => {
    const { editDescription } = this.state;
    this.setState({
      editDescription: !editDescription,
    });
  };

    handleSaveTaskDetails = (taskName, taskDescription, taskStatus, taskPriority) => {
      const { taskRef, taskDetailsActions, taskDetails } = this.props;
      const updatedTaskDetails = {
        name: taskName || taskDetails.name || {},
        description: taskDescription || taskDetails.description || {},
        status: taskStatus || taskDetails.status || {},
        priority: taskPriority || taskDetails.priority || {},
      };
      taskDetailsActions.changeTaskDetails(updatedTaskDetails);
      taskRef.set(updatedTaskDetails);
    };

    render() {
      const { editName, editDescription } = this.state;
      const {
        closeTaskDetails, taskDetails,
      } = this.props;

      const nameContext = editName
        ? (
          <EditName
            name={taskDetails.name}
            editName={editName}
            closeEditNameField={this.handleEditName}
            saveName={this.handleSaveTaskDetails}
          />
        ) : (
          <Container
            className="open-edit-name"
            onClick={this.handleEditName}
          >
            {taskDetails.name}
          </Container>
        );
      const descriptionContext = editDescription
        ? (
          <EditDescription
            description={taskDetails.description}
            editDescription={editDescription}
            closeEditDescriptionField={this.handleEditDescription}
            saveDescription={this.handleSaveTaskDetails}
          />
        ) : (
          <Container
            className="open-edit-description"
            onClick={this.handleEditDescription}
          >
            {taskDetails.description || 'Some text'}
          </Container>
        );

      return (
        <Container className="task-details pl-0">
          {'Name:'}
          <Button
            className="close-task-button cancel-button float-right px-0"
            onClick={closeTaskDetails}
          >
            {'╳'}
          </Button>
          <Container className="task-details-container main-modal-for-taskN">
            {nameContext}
          </Container>
          {'Description:'}
          <Container className="task-details-container description-container main-modal-for-taskD">
            {descriptionContext}
          </Container>
          <ButtonGroup>
            <TaskStatus
              status={taskDetails.status}
              changeStatus={this.handleSaveTaskDetails}
            />
            <TaskPriority
              priority={taskDetails.priority}
              changePriority={this.handleSaveTaskDetails}
            />
          </ButtonGroup>
        </Container>
      );
    }
}

const mapStateToProps = state => ({
  taskDetails: state.taskDetailsReducer.taskDetails,
});

const mapDispatchToProps = dispatch => ({
  taskDetailsActions: bindActionCreators(taskActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskDetails);
