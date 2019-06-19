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
    const {
      userName,
      email,
      phone,
      password,
      confirmPassword,
    } = this.state;
    // eslint-disable-next-line no-restricted-globals
	  event.preventDefault();
	  const { loginationActions: { registerUser } } = this.props;
    const newUserData = {
      name: userName,
      email: email,
      password: phone,
      phone: password,
    };
      if (userName && email && phone && password && confirmPassword) {
        if(password === confirmPassword) {
          registerUser(newUserData);
        this.setState({redirect: true});
      } else {
        this.setState({showAlertPassword: true});
      }
    } else {
        this.setState({showAlertSignup: true});
    }
  };

  handleSave = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const {
      redirect,
      showAlertSignup,
      showAlertPassword,
      userName,
      email,
      phone,
      password,
      confirmPassword,
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
                  name="userName"
                  value={userName}
                  onChange={this.handleSave}
                />

                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="user@mail.com"
                  name="email"
                  value={email}
                  onChange={this.handleSave}
                />

                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="+380965742187"
                  name="phone"
                  value={phone}
                  onChange={this.handleSave}
                />

                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  name="password"
                  value={password}
                  onChange={this.handleSave}
                />

                <Form.Label>Confirm password</Form.Label>
                <Form.Control
                type="password"
                placeholder="Confirm password"
                name="confirmPassword"
                value={confirmPassword}
                onChange={this.handleSave}
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
