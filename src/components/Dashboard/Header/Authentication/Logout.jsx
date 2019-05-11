import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import { Container } from 'react-bootstrap';
import db from '../../../../fire';

export default class Logout extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false,
    };
  }

  componentWillMount() {
    db.auth().signOut().then((user) => {
      this.setState({ redirect: true });
    });
  }

  render() {
    const { redirect } = this.state;
    if (redirect === true) {
      return <Redirect to="/" />;
    }

    return (
      <Container className="App">
        <h3> Logging Out</h3>
        <Spinner />
      </Container>
    );
  }
}
