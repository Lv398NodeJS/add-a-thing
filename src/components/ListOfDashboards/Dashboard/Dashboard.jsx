import React, { Component } from 'react';
import { Button, Card } from 'react-bootstrap';

export default class Dashboard extends Component {
  render() {
    const { name, description } = this.props;
    return (
      <Card style={{ width: '18rem' }} key={new Date()}>
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {description}
          </Card.Text>
          <Button variant="primary">Jump to this dash</Button>
        </Card.Body>
      </Card>
    );
  }
}
