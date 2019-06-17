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
    if(this.userEmail.value && this.userPassword.value && this.userName.value && this.phoneNum.value) {
    registerUser(newUserData);
    this.setState({ redirect: true });
    } else {this.setState({showAlertSignup: true});}
  };

  render() {
    const {
      redirect,
      showAlertSignup,
    } = this.state;

    if (redirect === true) {
      return <Redirect to="/login" />;
    }

    const alertSignup = showAlertSignup ? (<Alert variant='danger'>
      Wrong input
      </Alert>): <></>;

    return (
      <>
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
              <>{alertSignup}</>
              <Button
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
