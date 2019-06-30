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
      alertText: '',
    };
  }

  registration = (event) => {
    const {
      name,
      email,
      phone,
      password,
      confirmPassword,
    } = this.state;
	  event.preventDefault();
	  const { loginationActions: { registerUser } } = this.props;
    const newUserData = {
      name: name,
      email: email,
      password: phone,
      phone: password,
    };
      if (name && email && phone && password && confirmPassword) {
          if(password === confirmPassword) {
            registerUser(newUserData);
          } else {
            this.setState({
              alertText: 'Please check your password',
              showAlertSignup: true,
            });
          }
    } else {
        this.setState({
          alertText: 'All fields must be filled in',
          showAlertSignup: true,
        });
    }
  };

  handleSave = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      showAlertSignup: false,
    });
  };

  componentWillReceiveProps(store) {
    if (store.userDataError.msg) {
      this.setState({
        alertText: 'User already exists',
        showAlertSignup: true,
      });
    } else {
        this.setState({redirect: true});
    }
  };

  render() {
    const {
      redirect,
      showAlertSignup,
      alertText,
    } = this.state;

    if (redirect === true) {
      return <Redirect to="/login" />;
    }
    const alertModule = showAlertSignup ? (<Alert className="mt-2" variant='danger'>
      { alertText }
      </Alert>): <></>;

    return (
      <>
        <Container className="App">
          <Row>
            <Col md={{ span: 4, offset: 4 }}>

              <h3>Create an Add a Thing Account</h3>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Your Name"
                  name="name"
                  value={this.state.value}
                  onChange={this.handleSave}
                />

                <Form.Label>Email or Login</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="user@mail.com"
                  name="email"
                  value={this.state.value}
                  onChange={this.handleSave}
                />

                <Form.Label>Phone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="+380965742187"
                  name="phone"
                  value={this.state.value}
                  onChange={this.handleSave}
                />

                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="password"
                  name="password"
                  value={this.state.value}
                  onChange={this.handleSave}
                />
              <Form.Label>Confirm password</Form.Label>
              <Form.Control
              type="password"
              placeholder="password"
              name="confirmPassword"
              value={this.state.value}
              onChange={this.handleSave}
              />

              <>{alertModule}</>
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

const mapStateToProps = state => ({
  userData: state.loginationReducer.userData,
  userDataError: state.loginationReducer.userDataError,
});

const mapDispatchToProps = dispatch => ({
  loginationActions: bindActionCreators(loginActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Signup);
