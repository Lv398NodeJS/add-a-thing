import React, { Component } from 'react';
import {
  Form, Button, ButtonGroup, ToggleButton, Container, Row, Col, Alert,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Toaster, Intent } from '@blueprintjs/core';
import db, { facebookProvider, googleProvider } from '../../../../fire';
import NavBar from '../Header';

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  authWithFacebook = () => {
    db.auth().signInWithPopup(facebookProvider)
      .then((result, error) => {
        if (error) {
          this.toaster.show({
            intent: Intent.DANGER, message: 'Unable to sing in with Facebook',
          });
        } else {
          this.setState({ redirect: true });
        }
      });
  }

  authWithGoogle = () => {
    db.auth().signInWithPopup(googleProvider)
      .then((result, error) => {
        if (error) {
          this.toaster.show({
            intent: Intent.DANGER, message: 'Unable to sing in with Google',
          });
        } else {
          this.setState({ redirect: true });
        }
      });
  }

  authWithEmailPassword = (event) => {
    event.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    console.log(event);
    db.auth().fetchProvidersForEmail(email)
      .then((providers) => {
        console.log(providers);
        if (providers.length === 0) {
          // catch user
          return db.auth().createUserWithEmailAndPassword(email, password);
        } if (providers.indexOf('password') === -1) {
          // they used facebook
          this.loginForm.reset();
          this.toaster.show({ intent: Intent.WARNING, message: 'Try alternative login.' });
        } else {
          // sing user in
          return db.auth().signInWithEmailAndPassword(email, password);
        }
      })
      .then((user) => {
        if (user.user && user.user.email) {
          this.loginForm.reset();
          this.setState({ redirect: true });
        }
      })
      .catch((error) => {
        this.toaster.show({ intent: Intent.DANGER, message: error.message });
      });
  }

  render() {
    const { redirect, isLoggedIn } = this.state;
    if (redirect === true) {
      return <Redirect to="/" />;
    }

    return (
      <>
        <Toaster ref={(element) => {
          this.toaster = element;
        }}
        />
        <NavBar isLoggedIn={isLoggedIn} />
        <Container className="App">
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <Form
                onSubmit={(event) => {
                  this.authWithEmailPassword(event);
                }}
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
                    onClick={() => {
                      this.authWithGoogle();
                    }}
                  >

                    Log in with Google
                  </ToggleButton>
                  <ToggleButton
                    type="radio"
                    name="radio"
                    value="2"
                    onClick={() => {
                      this.authWithFacebook();
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
