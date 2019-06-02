import React, { Component } from 'react';
import {
  Form, Button, Container, Row, Col,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Toaster, Intent } from '@blueprintjs/core';
import db from '@src/fire';
import NavBar from '../Header';

export default class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  createAccount = (event) => {
    event.preventDefault();
    const email = this.emailInput.value;
    const password = this.passwordInput.value;

    if (this.validate(event)) {
      console.log(event);
      db.auth().fetchProvidersForEmail(email)
        .then((providers) => {
          console.log(providers);
          if (providers.length === 0) {
            // catch user
            return db.auth().createUserWithEmailAndPassword(email, password);
          } else {
            this.loginForm.reset();
            this.triggerValidation(this.emailInput, 'That email is taken. Try another.');
          }
        })
        .then((user) => {
          if (user && user.user && user.user.email) {
            this.loginForm.reset();
            this.setState({ redirect: true });
          }
        })
        .catch((error) => {
          this.toaster.show({ intent: Intent.DANGER, message: error.message });
        });
    }
  }

  validate = () => {
    const name = this.nameInput.value;
    const email = this.emailInput.value;
    const password = this.passwordInput.value;
    const confirmPassword = this.confirmPasswordInput.value;
    let valid = true;
    if (!name) {
      this.triggerValidation(this.nameInput, 'Name is required.')
      valid = false;
    } else if (!email) {
      this.triggerValidation(this.emailInput, 'Email is required.')
      valid = false;
    } else if (password.length < 6) {
      this.triggerValidation(this.passwordInput, 'Password must be 6 characters and longer.')
      valid = false;
    } else if (password !== confirmPassword) {
      this.triggerValidation(this.confirmPasswordInput, 'Password does not match.')
      valid = false;
    }
    return valid;
  }

  triggerValidation = (input, message) => {
    input.setCustomValidity(message);
    input.reportValidity();
  }

  onChange = (event) => {
    event.target.setCustomValidity('');
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
                    onChange={this.onChange}
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
                    onChange={this.onChange}
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
                    onChange={this.onChange}
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
                    onChange={this.onChange}
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
