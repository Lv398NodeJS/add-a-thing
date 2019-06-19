import React from 'react';
import {
  Form, Button, Container, Row, Col, Alert,
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as loginActions from '@actions/loginationActions';

export class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      showAlertSignup: false,
      showAlertPassword: false,
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
      if (this.userEmail.value &&
          this.userPassword.value &&
          this.userName.value &&
          this.phoneNum.value &&
          this.userConfirmPassword.value) {
        if(this.userPassword.value === this.userConfirmPassword.value) {
          registerUser(newUserData);
        this.setState({redirect: true});
      } else {
        this.setState({showAlertPassword: true});
      }
    } else {
        this.setState({showAlertSignup: true});
    }
  };

  render() {
    const {
      redirect,
      showAlertSignup,
      showAlertPassword
    } = this.state;

    if (redirect === true) {
      return <Redirect to="/login" />;
    }

    const alertSignup = showAlertSignup ? (<Alert className="mt-2" variant='danger'>
      Wrong input
      </Alert>): <></>;

    const alertPassword = showAlertPassword ? (<Alert className="mt-2" variant='danger'>
      Wrong password
    </Alert>): <></>;

    return (
      <>
        <Container className="App">
          <Row>
            <Col md={{ span: 4, offset: 4 }}>

              <h3>Create an Add a Thing Account</h3>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  placeholder="Your Name"
                  ref={(input) => {
                    this.userName = input;
                  }}
                />

                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="user@mail.com"
                  ref={(input) => {
                    this.userEmail = input;
                  }}
                />

                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="+380965742187"
                  ref={(input) => {
                    this.phoneNum = input;
                  }}
                />

                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  ref={(input) => {
                    this.userConfirmPassword = input;
                  }}
                />

                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Confirm password"
                ref={(input) => {
                  this.userPassword = input;
                }}
                />
              <>{alertSignup}</>
              <>{alertPassword}</>
              <Button
                className="mt-2"
                variant="primary"
                size="md"
                type="submit"
                valur="Create New Account"
                onClick={this.registration}
              >
                  Create New Account
              </Button>
            </Col>
          </Row>
        </Container>
      </>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  loginationActions: bindActionCreators(loginActions, dispatch),
});

export default connect(
  null,
  mapDispatchToProps,
)(Signup);
