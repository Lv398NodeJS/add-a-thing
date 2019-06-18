import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskActions from '../../../actions/taskDetailsActions';


export class DeleteTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showDelete: props.showDelete,
    };
  }

  handleDelete = () => {
    const { taskDetails, closeTaskDetails, taskDetailsActions: { deleteTaskDetails } } = this.props;
    const { showDelete } = this.state;
    deleteTaskDetails(taskDetails._id);
    this.setState({
      showDelete: !showDelete,
    });
    closeTaskDetails();
  };

  closeModal = () => {
    const { closeDeleteModal } = this.props;
    closeDeleteModal();
  };

  render() {
    const { showDelete } = this.props;
    return (
      <Modal
        show={showDelete}
        onHide={this.closeModal}
        aria-labelledby="contained-modal-title-center"
        centered
        className="delete-modal-window"

      >
        <Modal.Header>
          <Modal.Title>Delete task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure ?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="outline-primary"
            onClick={this.closeModal}
          >
            {'Cancel'}
          </Button>
          <Button
            variant="outline-danger"
            onClick={this.handleDelete}
          >
            {'Delete'}
          </Button>
        </Modal.Footer>
      </Modal>
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
)(DeleteTask);
