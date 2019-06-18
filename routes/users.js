const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/User');

// @route  POST api/users
// @desc   Register user
	router.post('/registerUser', (req, res) => {
		const { email } = req.body;
		let users = User.findOne({email});
		if(users.email==null){
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					password: req.body.password,
					phone: req.body.phone,
				});
			 newUser.save();
			 res.status(200).send('Registration Ok');

		} else {
			 res.status(400).send('User already exists');
		}
	});

// @route  POST api/users
// @desc   login user
router.post('/loginUser', (req, res) => {
			const { email , password } = req.body;

		 User.findOne({ email: email })
		.then(function (user){
			if(user.password === password){
					const loginData = {
							id: user.id,
							name: user.name,
					};
					const token = jwt.sign(
					loginData,
					"add-a-thing-token",
					{expiresIn: 3600},
					);
				const decoded = jwt.decode(token);

					const userData = {
						id: decoded.id,
						name: decoded.name,
					};

					const body = {
						token: token,
						userData: userData,
					};
					return res.json(body);

			} else {return res.status(400).send({ msg: 'Wrong password' });}
			}
			);
});

// @route  POST api/users
router.post('/loggedIn', (req, res) => {
	const { token } = req.body;
	const decoded = jwt.decode(token);
	User.findOne({ _id: decoded.id })
	.then(function (user){
		if(user.name === decoded.name){
			const userData = {
				id: decoded.id,
				name: decoded.name,
			};
			const body = {
				token: token,
				userData: userData,
			};
			return res.json(body);
		} else {return res.status(400).send({ msg: 'Wrong user data' });}
	}
	);
});

module.exports = router;
