import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import { Container } from 'react-bootstrap';
import connect from 'react-redux/es/connect/connect';
import * as authAction from '../../../../actions/authAction';

class Logout extends Component {

  componentWillMount() {
    console.log('signout_componentWillMount');
    const { signOut } = this.props;
    signOut();
  }

  render() {
    const { redirect } = this.props;
    console.log('signout_render', redirect);
    if (redirect) {
      return <Redirect to="/" />;
    }

    return (
      <Container className="App">
        <h3>Logging Out</h3>
        <Spinner />
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    redirect: state.authReducer.redirect,
  };
};

const mapDispatchToProps = dispatch => ({
  signOut: () => {
    dispatch(authAction.signOut);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Logout);
