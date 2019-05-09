import React, { Component } from 'react';
import {
  Form, Button, ButtonGroup, ToggleButton, Container, Row, Col,
} from 'react-bootstrap';
import { Redirect } from 'react-router-dom';
import { Toaster, Intent } from '@blueprintjs/core';
import Header from '../Header';
import {db, facebookProvider} from '../../../../fire';

class Login extends Component {
  constructor(props) {
    super(props);
    this.authWithFacebook = this.authWithFacebook.bind(this);
    this.authWithGoogle = this.authWithGoogle.bind(this);
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this);
    this.state = {
      redirect: false,
    };
  }

  authWithFacebook() {
    db.auth().signInWithPopup(facebookProvider)
      .then((result, error) => {
        if (error) {
          this.toaster.show({
            intent: Intent.DANGER, message: 'Unable tp sing in with Facebook',
          });
        } else {
          this.setState({redirect: true});
        }
      });
  }

  authWithGoogle() {
    console.log(this.passwordInput.value);
  }

  authWithEmailPassword(event) {
    event.preventDefault();
    console.log('authed with email');
    console.table([{
      email: this.emailInput.value,
      password: this.passwordInput.value,
    }]);
  }

  render() {
    const {redirect} = this.state;
    if (redirect === true) {
      return <Redirect to="/" />;
    }

    return (
      <>
        <Header />
        <Toaster ref={(element) => {
          this.toaster = element;
        }}
        />
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
                <Form.Text className="text-muted">If you do not have an account already, this form will be create your
                  account.
                </Form.Text>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>Email (or username)</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="username@mail.com"
                    ref={(input) => {
                      this.emailInput = input;
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="••••••••••••"
                    ref={(input) => {
                      this.passwordInput = input;
                    }}
                  />
                </Form.Group>
                <Button variant="primary" type="submit" valur="Log In">Log in</Button>
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

export default Login;
