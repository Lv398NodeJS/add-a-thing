import React, { Component } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { db } from '../../../../fire';
import './DashboardPreview.scss';
import wallpaper from '../../../assets/wallpaper.svg';

class DashboardPreview extends Component {
  constructor() {
    super();
    this.state = {
      show: false,
    };
  }

  handleDeleteBtn = () => {
    const { show } = this.state;
    this.setState({
      show: !show,
    });
  }

  handleConfirmDelete = () => {
    const { show } = this.state;
    const { deleteDashboard, id } = this.props;
    deleteDashboard({ id });
    const dashboardRef = db.database().ref(`/dashboards/${id}`);
    dashboardRef.remove();
    this.setState({
      show: !show,
    });
  }

  handleClose = () => {
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
        <Card key={id}>
          <Card.Body>
            <Card.Title>
              {name}
            </Card.Title>
            <img src={wallpaper} alt={wallpaper} className="wallpaper" />
            <Card.Text>
              {description}
            </Card.Text>
            <Link to={`${id}`}>
              <Button style={{ marginRight: 5 }} variant="primary">

                Open
              </Button>
            </Link>
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
              <Modal.Title>Are you sure you want to delete this dashboard?</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>This action cannot be undone.</p>
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

export default DashboardPreview;
