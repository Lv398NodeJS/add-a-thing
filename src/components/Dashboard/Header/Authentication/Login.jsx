import React, { Component } from 'react';
import {
  Form, Button, ButtonGroup, ToggleButton, Container, Row, Col, Alert,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import NavBar from '../Header';
import * as authAction from '../../../../actions/authAction';

class Login extends Component {
  loginWithEmailPassword = (event) => {
    event.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const { authWithEmailPassword } = this.props;
    authWithEmailPassword({ email, password });
  }

  render() {
    const { redirect, user } = this.props;
    console.log('Do redirect', redirect, user);
    if (user) {
      return <Redirect to="/" />;
    }
    return (
      <>
        <NavBar isLoggedIn={redirect} />
        <Container className="App">
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <Form
                onSubmit={this.loginWithEmailPassword}
                ref={(form) => {
                  this.loginForm = form;
                }}
              >
                <h3>Log in to Add a Thing</h3>
                <Form.Text className="text-muted">
                  <Alert variant="secondary">
                    <Alert.Heading>NOTE</Alert.Heading>
                    <p>
                      If you do not have an account yet, this form will create an account for you.
                    </p>
                  </Alert>
                </Form.Text>
                <Form.Group controlId="formBasicEmail">
                  <Form.Control
                    type="email"
                    placeholder="email or username"
                    ref={(input) => {
                      this.emailInput = input;
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="password"
                    ref={(input) => {
                      this.passwordInput = input;
                    }}
                  />
                </Form.Group>
                <Button variant="primary" size="md" block type="submit" valur="Log In">Log in</Button>
              </Form>

              <div className="d-flex flex-column">
                <ButtonGroup toggle className="mt-2">
                  <ToggleButton
                    type="radio"
                    name="radio"
                    defaultChecked
                    value="1"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('button pressed');
                      const { authWithGoogle } = this.props;
                      authWithGoogle();
                    }}
                  >

                    Log in with Google
                  </ToggleButton>
                  <ToggleButton
                    type="radio"
                    name="radio"
                    value="2"
                    onClick={(e) => {
                      e.preventDefault();
                      console.log('button pressed');
                      const { authWithFacebook } = this.props;
                      authWithFacebook();
                    }}
                  >

                    Log in with Facebook
                  </ToggleButton>
                </ButtonGroup>
              </div>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  console.log('map store to props', state);
  return {
    redirect: state.authReducer.redirect,
    user: state.authReducer.user,
  };
};

const mapDispatchToProps = dispatch => ({
  authWithFacebook: () => {
    console.log('dispatch binded');
    dispatch(authAction.authWithFacebook);
  },
  authWithGoogle: () => {
    console.log('dispatch binded');
    dispatch(authAction.authWithGoogle);
  },
  authWithEmailPassword: (cred) => {
    console.log('dispatch binded');
    dispatch(authAction.authWithEmailPassword(cred));
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(Login);
