import React, { Component } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';

export default class DashboardPreview extends Component {
  constructor() {
    super();
    this.handleDeleteBtn = this.handleDeleteBtn.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleConfirmDelete = this.handleConfirmDelete.bind(this);
    this.state = {
      show: false,
    };
  }

  handleDeleteBtn() {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  }

  handleConfirmDelete() {
    const { show } = this.state;
    const { deleteDashboard, id } = this.props;
    deleteDashboard({ id });
    this.setState({
      show: !show,
    });
  }

  handleClose() {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  }

  render() {
    const { name, description, id } = this.props;
    const { show } = this.state;
    return (
      <>
        <Card style={{ width: '18rem' }} key={id}>
          <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
              {description}
            </Card.Text>
            <Button style={{ marginRight: 5 }} variant="primary">Jump to this dash</Button>
            <Button
              style={{ marginLeft: 5 }}
              variant="outline-danger"
              onClick={this.handleDeleteBtn}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
        <Modal show={show} onHide={this.handleClose}>
          <Modal.Dialog style={{
            margin: 0,
          }}
          >
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={this.handleClose}>Cancel</Button>
              <Button variant="outline-danger" onClick={this.handleConfirmDelete}>Delete this dashboard</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal>
      </>
    );
  }
}
