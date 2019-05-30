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
import '../assets/crossicon.svg';
import del from '../assets/delete.svg';

export class TaskDetails extends React.Component {
  constructor(...args) {
    super(...args);
    this.state = {
      editName: false,
      editDescription: false,
    };
  }

  componentDidMount() {
    const { taskRef, taskDetailsActions: { fetchTaskDetails } } = this.props;
    if (!taskRef) return;
    fetchTaskDetails(taskRef);
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

    handleSaveTaskDetails = (updatedName, updatedDescription, updatedStatus, updatedPriority) => {
      const { taskRef, taskDetailsActions: { updateTaskDetails }, taskDetails } = this.props;
      const updatedTaskDetails = {
        name: updatedName || taskDetails.name || {},
        description: updatedDescription || taskDetails.description,
        status: updatedStatus || taskDetails.status,
        priority: updatedPriority || taskDetails.priority,
        subtaskList: taskDetails.subtaskList || {},
      };
      updateTaskDetails(updatedTaskDetails);
      taskRef.set(updatedTaskDetails);
    };

    render() {
      const { editName, editDescription } = this.state;
      const {
        closeTaskDetails, taskDetails = {},
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
            {taskDetails.name || 'Name'}
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
            <img src={del} alt="close" className="delete-icon" />
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

const mapStateToProps = ({ taskDetailsReducer: { taskDetails } }) => ({ taskDetails });

const mapDispatchToProps = dispatch => ({
  taskDetailsActions: bindActionCreators(taskActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TaskDetails);
