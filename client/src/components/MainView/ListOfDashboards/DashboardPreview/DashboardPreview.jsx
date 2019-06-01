import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ModalDelete from './ModalToDelete/ModalToDelete';
import './DashboardPreview.scss';
import wallpaper from '../../../assets/wallpaper.svg';

class DashboardPreview extends Component {
  constructor() {
    super();
    this.state = {
      showComponent: false,
    };
  }

  handleDeleteBtn = () => {
    this.setState({
      showComponent: true,
    });
  }

  toggleModal = () => {
    const { showComponent } = this.state;
    this.setState({
      showComponent: !showComponent,
    });
  }

  render() {
    const { name, description, id } = this.props;
    const { showComponent } = this.state;
    return (
      <>
        <Card key={id}>
          <Card.Body>
            <Card.Title className="dash-name">
              {name}
            </Card.Title>
            <img
              src={wallpaper}
              alt={wallpaper}
              className="wallpaper"
            />
            <Card.Text className="dash-description">
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
        <ModalDelete
          show={showComponent}
          toggleModal={this.toggleModal}
          id={id}
        />
      </>
    );
  }
}

export default DashboardPreview;
