import React, { Component } from 'react';
import Redirect from 'react-router-dom/es/Redirect';
import { Spinner } from '@blueprintjs/core';
import { db } from '../../../../fire';

export default class Logout extends Component {
  constructor() {
    super()
    this.state = {
      redirect: false,
    };
  }

  componentWillMount() {
    db.auth().signOut().then((user) => {
      this.setState({ redirect: true});
    });
  }

  render() {
    const { redirect } = this.state;
    if (redirect === true) {
      return <Redirect to="/" />;
    }

    return (
      <content className="App">
        <h3> Logging Out</h3>
        <Spinner />
      </content>
    );
  }
}
