import React, { Component } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as viewActions from '@actions/dashboardActions';
import './ModalToDelete.scss';

export class ModalToDelete extends Component {
  constructor(props) {
    super(props);

    this.state = { show: props.show };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ show: nextProps.show });
  }

  handleClose = () => {
    const { toggleModal } = this.props;
    toggleModal();
    this.setState({ show: false });
  }

  handleConfirmDelete = () => {
    const { showComponent } = this.state;
    const { dashboardActions, id } = this.props;
    dashboardActions.deleteDashboard(id);
    this.setState({
      showComponent: !showComponent,
    });
  }

  render() {
    const { show } = this.state;
    return (
      <Modal
        onHide={this.handleClose}
        show={show}
        className="confirm-delete-modal"
      >
        <Modal.Dialog className="delete-message">
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete this dashboard?</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <p>This action cannot be undone.</p>
          </Modal.Body>

          <Modal.Footer>
            <Button
              className="cancel-btn"
              variant="secondary"
              onClick={this.handleClose}
            >
            Cancel
            </Button>
            <Button
              variant="outline-danger"
              onClick={this.handleConfirmDelete}
            >
              Delete this dashboard
            </Button>
          </Modal.Footer>
        </Modal.Dialog>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  dashboards: state.mainViewReducer.dashboards,
});

const mapDispatchToProps = dispatch => ({
  dashboardActions: bindActionCreators(viewActions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ModalToDelete);
