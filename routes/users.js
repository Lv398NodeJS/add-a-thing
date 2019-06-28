const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/User');

// @route  POST api/users
// @desc   Register user
	router.post('/registerUser', async (req, res) => {
		const { name, email, password, phone} = req.body;
		User.findOne({ email: email })
		.then(async function (user) {
		if(user==null){
				const salt = await bcrypt.genSalt(10);
				const userPass = await bcrypt.hash(password, salt);
				const newUser = await new User({
					name: name,
					email: email,
					password: userPass,
					phone: phone,
				});
			 newUser.save();
			 res.status(200).send({ msg: 'Registration Ok' });
		} else {
			 res.status(400).send({ msg: 'User already exists' });
		}
	});
	});

// @route  POST api/users
// @desc   login user
router.post('/loginUser', (req, res) => {
			const { email , password } = req.body;
		 User.findOne({ email: email })
		.then(function (user) {
			if(user==null){
				return res.status(400).send({ msg: 'Wrong_password' });
			}
			bcrypt.compare(password, user.password, (err, response) => {
				if (response) {
					const loginData = {
						id: user.id,
						name: user.name,
					};
					const token = jwt.sign(
					loginData,
					"add-a-thing-token-secret",
					{expiresIn: 3600},
					);
					const decoded = jwt.decode(token);

					const userData = {
						id: decoded.id,
						name: decoded.name,
						email: user.email,
						phone: user.phone,
					};

					const body = {
						token: token,
						userData: userData,
					};
					return res.json(body);
				} else {
					return res.status(400).send({ msg: 'Wrong_password' });
				}
			});
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
				email: user.email,
				phone: user.phone,
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
