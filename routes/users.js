const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/User');

// @route  POST api/users
// @desc   Register user
	router.post('/registerUser', async (req, res) => {
		const { email } = req.body;
		let users = User.findOne({email});
		if(users.email==null){
				const salt = await bcrypt.genSalt(10);
				const userPass = await bcrypt.hash(req.body.password, salt);
				const newUser = await new User({
					name: req.body.name,
					email: req.body.email,
					password: userPass,
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
		.then(function (user) {
			bcrypt.compare(password, user.password, (err, response) => {
				if (response) {
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
						email: user.email,
						phone: user.phone,
					};

					const body = {
						token: token,
						userData: userData,
					};
					return res.json(body);
				} else {
					return res.status(400).send({ msg: 'Wrong password' });
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

router.post('/updateProfile', (req, res) => {
	console.log(req.body);
	User.findOne({ _id: req.body.id })
	.then(function (user){
		try{
				user.name = req.body.name;
				user.email = req.body.email;
				user.phone = req.body.phone;
			return res.json(user);
		} catch (e) {
			return res.status(400).send({ msg: 'Wrong user data' });
		}
	}
	);
});

module.exports = router;
