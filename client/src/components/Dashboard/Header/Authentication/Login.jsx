import React, { Component } from 'react';
import {
  Form, Button, Container, Row, Col, Alert,
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as loginActions from '../../../../actions/loginationActions';
import NavBar from '../Header';


export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      isLoggedIn: false,
    };
  }

  // authWithFacebook = () => {
  //   db.auth().signInWithPopup(facebookProvider)
  //     .then((result, error) => {
  //       if (error) {
  //         this.toaster.show({
  //           intent: Intent.DANGER, message: 'Unable to sign in with Facebook',
  //         });
  //       } else {
  //         this.setState({ redirect: true });
  //       }
  //     });
  // }
  //
  // authWithGoogle = () => {
  //   db.auth().signInWithPopup(googleProvider)
  //     .then((result, error) => {
  //       if (error) {
  //         this.toaster.show({
  //           intent: Intent.DANGER, message: 'Unable to sign in with Google',
  //         });
  //       } else {
  //         this.setState({ redirect: true });
  //       }
  //     });
  // }
  //
  // authWithEmailPassword = (event) => {
  //   event.preventDefault();
  //   const email = this.emailInput.value;
  //   const password = this.passwordInput.value;
  //   console.log(event);
  //   db.auth().fetchProvidersForEmail(email)
  //     .then((providers) => {
  //       console.log(providers);
  //       if (providers.length === 0) {
  //         // catch user
  //         return db.auth().createUserWithEmailAndPassword(email, password);
  //       } if (providers.indexOf('password') === -1) {
  //         // they used facebook
  //         this.loginForm.reset();
  //         this.toaster.show({ intent: Intent.WARNING, message: 'Try alternative login.' });
  //       } else {
  //         // sign user in
  //         return db.auth().signInWithEmailAndPassword(email, password);
  //       }
  //     })
  //     .then((user) => {
  //       if (user.user && user.user.email) {
  //         this.loginForm.reset();
  //         this.setState({ redirect: true });
  //       }
  //     })
  //     .catch((error) => {
  //       this.toaster.show({ intent: Intent.DANGER, message: error.message });
  //     });
  // }

  logination = () => {
    const { loginationActions: { loginUser, lodinedUser } } = this.props;
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    const loginUserData = {
      email: this.userEmail.value,
      password: this.userPassword.value,
    };
    loginUser(loginUserData);
    this.setState({ redirect: true, isLoggedIn: true });
    lodinedUser();
  };

  render() {
    const { redirect, isLoggedIn } = this.state;
    if (redirect === true) {
      return <Redirect to="/" />;
    }

    return (
      <>
        <NavBar isLoggedIn={isLoggedIn} />
        <Container className="App">
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
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
                      this.userEmail = input;
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="password"
                    ref={(input) => {
                      this.userPassword = input;
                    }}
                  />
                </Form.Group>
                <Button variant="primary"
                        size="md"
                        type="submit"
                        valur="Create New Account"
                        onClick={this.logination}
                >
                  Log in
                </Button>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapStateToProps = state => ({
  userData: state.loginationReducer.userDate,
});

const mapDispatchToProps = dispatch => ({
  loginationActions: bindActionCreators(loginActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
