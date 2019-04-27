import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ModalToDelete from './ModalToDelete/ModalToDelete';
import deleteLocallyAndRemotely from './deleteLocallyAndRemotely';
import './DashboardPreview.scss';
import wallpaper from '../../../assets/wallpaper.svg';

class DashboardPreview extends Component {
  constructor() {
    super();
    this.state = {
      showDeleteWindow: false,
    };
  }

  handleDeleteBtn = () => {
    this.setState({
      showDeleteWindow: true,
    });
  }

  handleConfirmDelete = () => {
    const { showDeleteWindow } = this.state;
    const { deleteDashboard, id } = this.props;
    deleteLocallyAndRemotely(id, deleteDashboard);
    this.setState({
      showDeleteWindow: !showDeleteWindow,
    });
  }

  toggleModal = () => {
    const { showDeleteWindow } = this.state;
    this.setState({
      showDeleteWindow: !showDeleteWindow,
    });
  }

  render() {
    const { name, description, id } = this.props;
    const { showDeleteWindow } = this.state;
    return (
      <>
        <Card key={id}>
          <Card.Body>
            <Card.Title>
              {name}
            </Card.Title>
            <img
              src={wallpaper}
              alt={wallpaper}
              className="wallpaper"
            />
            <Card.Text>
              {description}
            </Card.Text>
            <Link to={`${id}`}>
              <Button
                className="open-btn"
                variant="primary"
              >
                Open
              </Button>
            </Link>
            <Button
              className="delete-btn"
              variant="outline-danger"
              onClick={this.toggleModal}
            >
              Delete
            </Button>
          </Card.Body>
        </Card>
        <ModalToDelete
          show={showDeleteWindow}
          onHide={this.toggleModal}
          confirmDelete={this.handleConfirmDelete}
        />
      </>
    );
  }
}

export default DashboardPreview;
