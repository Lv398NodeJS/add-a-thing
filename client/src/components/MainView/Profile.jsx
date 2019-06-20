import React, {Component} from 'react';
import Header from '@MainView/Header/Header';
import { Redirect } from 'react-router-dom';
import {Button, Col, Form, Row, Container} from "react-bootstrap";
import avatar from '@assets/avatar.svg';
import './Profile.css';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import * as loginActions from '@actions/loginationActions';

export class Profile extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showEdit: true,
		};
	}

	handleEdit = () => {
		this.setState({
			showEdit: false,
		});
	};

	handleSaveProfile = () => {
		const { updateName, updateEmail, updatePhone } = this.state;
		const { userData, loginationActions: { updateProfile } } = this.props;
		const updateUser = {
			id: userData.id,
			name: updateName,
			email: updateEmail,
			phone: updatePhone,
		};
		if(updateName && updateEmail && updatePhone) {
			updateProfile(updateUser);

			this.setState({
				showEdit: true,
			});
		}
	};

	handleSave = (event) => {
		const { name, value } = event.target;
		this.setState({
			[name]: value,
		});
	};

	render() {
		const { showEdit, updateName, updateEmail, updatePhone } = this.state;
		const { userData } = this.props;
		if(!localStorage.getItem('token')){
			return <Redirect to="/" />;
		}

		const content = showEdit ? (<Row>
			<Col md={{ span: 4, offset: 4 }}>
				<h1>Profile</h1>
				<Row>
					<Col className="m-1">
						<img src={avatar} alt="avatar" className="add-avatar" />
					</Col>
				</Row>
				<Form.Label>Name</Form.Label>
					<Container className="profile-container">
						{ updateName }
					</Container>
				<Form.Label>Email</Form.Label>
					<Container className="profile-container">
						{ updateEmail }
					</Container>
				<Form.Label>Phone</Form.Label>
					<Container className="profile-container">
						{ updatePhone }
					</Container>

				<Button
				className="mt-2"
				variant="primary"
				size="md"
				type="submit"
				valur="Create New Account"
				onClick={this.handleEdit}
				>
					Update profile
				</Button>
			</Col>
		</Row>) : (<Row>
			<Col md={{ span: 4, offset: 4 }}>
				<h1>Profile</h1>
				<Row>
					<Col className="m-1">
						<img src={avatar} alt="avatar" className="add-avatar" />
						<Row className="m-1">
							<Button
							className="avatar-btn"
							variant="primary"
							size="sm"
							>
								Change avatar
							</Button>
						</Row>
					</Col>
				</Row>
				<Form.Label>Name</Form.Label>
				<Form.Control
				placeholder="Your Name"
				defaultValue={userData.name}
				name="updateName"
				value={updateName}
				onChange={this.handleSave}
				/>

				<Form.Label>Email</Form.Label>
				<Form.Control
				type="email"
				placeholder="user@mail.com"
				defaultValue={userData.email}
				name="updateEmail"
				value={updateEmail}
				onChange={this.handleSave}
				/>

				<Form.Label>Phone</Form.Label>
				<Form.Control
				type="text"
				placeholder="+380965742187"
				defaultValue={userData.phone}
				name="updatePhone"
				value={updatePhone}
				onChange={this.handleSave}
				/>
				<Button
				className="mt-2"
				variant="primary"
				size="md"
				type="submit"
				valur="Create New Account"
				onClick={this.handleSaveProfile}
				>
					Save profile
				</Button>
			</Col>
		</Row>);
		return (
		<>
			<Header />
			{content}
		</>
		);
	}
}

const mapStateToProps = state => ({
	userData: state.loginationReducer.userData,
});

const mapDispatchToProps = dispatch => ({
	loginationActions: bindActionCreators(loginActions, dispatch),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(Profile);