import React, { Component } from 'react';
import {
  Form, Button, Container, Row, Col, Alert,
} from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as loginActions from '@actions/loginationActions';
import Header from '../Header';


export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      showAlertLogin: false,
    };
  }

  logination = async () => {
    const { loginationActions: { loginUser } } = this.props;
    const { email, password } = this.state;
    // eslint-disable-next-line no-restricted-globals
    event.preventDefault();
    const loginUserData = {
      email: email,
      password: password,
    };
    if(email && password) {
        loginUser(loginUserData);
    } else {this.setState({showAlertLogin: true});}
  };

  componentWillReceiveProps(userData) {
    if (userData) {
      this.setState({redirect: true});
    }
  };

  handleSave = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
    });
  };

  render() {
    const { redirect,showAlertLogin, email, password } = this.state;
    if (redirect === true) {
      return <Redirect to="/" />;
    }

    const alertLogin = showAlertLogin ? (<Alert variant='danger'>
      Wrong email or password
    </Alert>): <></>;

    return (
      <>
        <Header />
        <Container className="App">
          <Row>
            <Col md={{ span: 4, offset: 4 }}>
              <h3>Log in to Add a Thing</h3>
              <Form.Text className="text-muted">
                <Alert variant="secondary">
                  <Alert.Heading>NOTE</Alert.Heading>
                  <p>
                      If you do not have an account yet, please click on Signup.
                  </p>
                </Alert>
              </Form.Text>
              <Form.Group controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="email or username"
                  name="email"
                  value={email}
                  onChange={this.handleSave}
                />
              </Form.Group>

              <Form.Group controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="password"
                  name="password"
                  value={password}
                  onChange={this.handleSave}
                />
              </Form.Group>
              <>{alertLogin}</>
              <Button
                variant="primary"
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
  token: state.loginationReducer.token,
  userData: state.loginationReducer.userData,
  loginedData: state.loginationReducer.loginedData,
});

const mapDispatchToProps = dispatch => ({
  loginationActions: bindActionCreators(loginActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Login);
