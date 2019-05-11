import React, { Component } from 'react';
import {
  Form, Button, Container, Row, Col,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Toaster, Intent } from '@blueprintjs/core';
import db from '../../../../fire';
import NavBar from '../Header';
import './Auth.scss';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  createAccount = (event) => {
    event.preventDefault();
    const name = this.nameInput.value;
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const confirmPassword = this.confirmPasswordInput.value;

    if (!name) {
      this.toaster.show({ intent: Intent.WARNING, message: 'Name is required.' });
    } else if (password.length < 6) {
      this.toaster.show({ intent: Intent.WARNING, message: 'Pssword must be 6 characters and longer.' });
    } else if (password !== confirmPassword) {
      this.toaster.show({ intent: Intent.WARNING, message: 'Pssword does not matche.' });
    } else {
      console.log(event);
      db.auth().fetchProvidersForEmail(email)
        .then((providers) => {
          console.log(providers);
          if (providers.length === 0) {
            // catch user
            return db.auth().createUserWithEmailAndPassword(email, password);
          }
          if (providers.indexOf('password') === -1) {
            this.loginForm.reset();
            this.toaster.show({ intent: Intent.WARNING, message: 'That username is taken. Try another.' });
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
  }

  render() {
    const {
      redirect,
      isLoggedIn,
    } = this.state;

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
                  this.createAccount(event);
                }}
                ref={(form) => {
                  this.loginForm = form;
                }}
              >
                <h3>Create an Add a Thing Account</h3>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>NAME</Form.Label>
                  <Form.Control
                    placeholder="User Name"
                    ref={(input) => {
                      this.nameInput = input;
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicEmail">
                  <Form.Label>EMAIL</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="user@mail.com"
                    ref={(input) => {
                      this.emailInput = input;
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>PASSWORD</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="password"
                    ref={(input) => {
                      this.passwordInput = input;
                    }}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicPassword">
                  <Form.Label>CONFIRM PASSWORD</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="password"
                    ref={(input) => {
                      this.confirmPasswordInput = input;
                    }}
                  />
                </Form.Group>
                <Button variant="primary" size="md" block type="submit" valur="Create New Account">
                Create New Account
                </Button>
              </Form>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}
