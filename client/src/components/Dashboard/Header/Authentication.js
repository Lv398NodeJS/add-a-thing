// eslint-disable-next-line no-tabs

import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Container from 'react-bootstrap/Container';
import * as loginActions from '../../../actions/loginationActions';

export class Authentication extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showLogin: props.showLogin,
	    loginState: false,
    };
  }

	registration = () => {
		const { loginationActions: { registerUser }, closeModal } = this.props;
		// eslint-disable-next-line no-restricted-globals
	  event.preventDefault();
	  const newUserData = {
	  	name: this.userName.value,
	    email: this.userEmail.value,
	    password: this.userPassword.value,
	    phone: this.phoneNum.value,
	  };
	  registerUser(newUserData);
		closeModal();
	};

	logination = () => {
		const { loginationActions: { loginUser }, closeModal } = this.props;
		// eslint-disable-next-line no-restricted-globals
		event.preventDefault();
		const loginUserData = {
			email: this.userEmail.value,
			password: this.userPassword.value,
		};
		loginUser(loginUserData);
		closeModal();
	};

	// catchResponse = (res) => {
	//   const { closeModal } = this.props;
	// 	event.preventDefault();
	// 	if (res.status === 200) {
	//     alert('Login Ok');
	//     closeModal();
	//   } else {
	//     alert('Login Error');
	//   }
	// };

	closeModal = () => {
	  const { showLogin, closeModal } = this.props;
	  this.setState({
		  // eslint-disable-next-line react/no-unused-state
		  showLogin: !showLogin,
	  });
		closeModal();
		this.setState({
			loginState: false,
		});
	};

	handleTogleRegOrLogin = () => {
		const { loginState } = this.state;
		this.setState({
			loginState: !loginState,
		});
	};

	render() {
	  const { showLogin } = this.props;
		const { loginState } = this.state;


		const loginationContext = loginState
		? (
		<Form>
			<Form.Label>Name</Form.Label>
			<Form.Control
			type="text"
			placeholder="Enter your name"
			ref={(userName) => {
				this.userName = userName;
			}}
			/>
			<Form.Label>Email address</Form.Label>
			<Form.Control
			type="email"
			placeholder="Enter email"
			ref={(userEmail) => {
				this.userEmail = userEmail;
			}}
			/>
			<Form.Text className="text-muted">
			</Form.Text>
			<Form.Label>Password</Form.Label>
			<Form.Control
			type="password"
			placeholder="Password"
			ref={(userPassword) => {
				this.userPassword = userPassword;
			}}
			/>
			<Form.Label>Phone</Form.Label>
			<Form.Control
			type="text"
			placeholder="phone number"
			ref={(phoneNum) => {
				this.phoneNum = phoneNum;
			}}
			/>
			<Button
			variant="primary"
			type="submit"
			onClick={this.registration}
			>
				{ 'Registrate' }
			</Button>
			<Button
			variant="primary"
			onClick={this.closeModal}
			>
				{ 'Close' }
			</Button>
		</Form>
		) : (
		<Form>
			<Form.Label>Email address</Form.Label>
			<Form.Control
			type="email"
			placeholder="Enter email"
			ref={(userEmail) => {
				this.userEmail = userEmail;
			}}
			/>
			<Form.Text className="text-muted">
			</Form.Text>
			<Form.Label>Password</Form.Label>
			<Form.Control
			type="password"
			placeholder="Password"
			ref={(userPassword) => {
				this.userPassword = userPassword;
			}}
			/>
			<Button
			variant="primary"
			type="submit"
			onClick={this.logination}
			>
				{ 'Log in' }
			</Button>
			<Button
			variant="primary"
			onClick={this.closeModal}
			>
				{ 'Close' }
			</Button>
			<Button variant="link"
			        onClick={this.handleTogleRegOrLogin}
			>Registration</Button>
		</Form>
		);

	  return (
  <Modal
    show={showLogin}
    onHide={this.closeModal}
    aria-labelledby="contained-modal-title-center"
    centered
		>
    <Modal.Body>
      <Container>
	      {loginationContext}
      </Container>
    </Modal.Body>
  </Modal>
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
)(Authentication);
