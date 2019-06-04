import React, { Component } from 'react';
import {
  Form, Button, Container, Row, Col,
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as loginActions from '../../../../actions/loginationActions';
// import { Toaster, Intent } from '@blueprintjs/core';
import NavBar from '../Header';

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
    };
  }

  registration = () => {
	  // eslint-disable-next-line no-restricted-globals
	  event.preventDefault();
	  const { loginationActions: { registerUser } } = this.props;
    const newUserData = {
      name: this.userName.value,
      email: this.userEmail.value,
      password: this.userPassword.value,
      phone: this.phoneNum.value,
    };
    registerUser(newUserData);
    this.setState({ redirect: true });
  };

  // validate = () => {
  //   const name = this.nameInput.value;
  //   const email = this.emailInput.value;
  //   const password = this.passwordInput.value;
  //   const confirmPassword = this.confirmPasswordInput.value;
  //   let valid = true;
  //   if (!name) {
  //     this.triggerValidation(this.nameInput, 'Name is required.')
  //     valid = false;
  //   } else if (!email) {
  //     this.triggerValidation(this.emailInput, 'Email is required.')
  //     valid = false;
  //   } else if (password.length < 6) {
  //     this.triggerValidation(this.passwordInput, 'Password must be 6 characters and longer.')
  //     valid = false;
  //   } else if (password !== confirmPassword) {
  //     this.triggerValidation(this.confirmPasswordInput, 'Password does not match.')
  //     valid = false;
  //   }
  //   return valid;
  // }

  // triggerValidation = (input, message) => {
  //   input.setCustomValidity(message);
  //   input.reportValidity();
  // }

  // onChange = (event) => {
  //   event.target.setCustomValidity('');
  // }

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
        {/* <Toaster ref={(element) => { */}
        {/*  this.toaster = element; */}
        {/* }} */}
	      {/* /> */}
        <NavBar isLoggedIn={isLoggedIn} />
        <Container className="App">
          <Row>
            <Col md={{ span: 4, offset: 4 }}>

                <h3>Create an Add a Thing Account</h3>
                <Form.Group controlId="formBasicEmail">
                  <Form.Label>NAME</Form.Label>
                  <Form.Control
                    placeholder="User Name"
                    ref={(input) => {
                      this.userName = input;
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
                      this.userEmail = input;
                    }}
                    onChange={this.onChange}
                  />
                </Form.Group>

                <Form.Group controlId="formBasicPhone">
                  <Form.Label>PHONE</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="+380965742187"
                    ref={(input) => {
                      this.phoneNum = input;
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
                      this.userPassword = input;
                    }}
                    onChange={this.onChange}
                  />
              </Form.Group>

              {/*<Form.Group controlId="formBasicPassword">*/}
	            {/*  <Form.Label>CONFIRM PASSWORD</Form.Label>*/}
	            {/*  <Form.Control*/}
              {/*      type="password"*/}
              {/*      placeholder="password"*/}
              {/*      ref={(input) => {*/}
              {/*        this.confirmPasswordInput = input;*/}
              {/*      }}*/}
              {/*      onChange={this.onChange}*/}
              {/*    />*/}
              {/*  </Form.Group>*/}

                <Button variant="primary"
                        size="md"
                        type="submit"
                        valur="Create New Account"
                        onClick={this.registration}>
                  Create New Account
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
)(Signup);
