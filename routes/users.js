const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const User = require('../models/User');

// @route  POST api/users
// @desc   Register user
	router.post('/registerUser', async (req, res) => {
		const { email } = req.body;
		let users = await User.findOne({email});
		if(users==null){
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					password: req.body.password,
					phone: req.body.phone,
				});
			await newUser.save();
			await res.status(200).send('Registration Ok');

		} else {
			await res.status(400).send('User already exists');
		}
	});

// @route  GET api/users
// @desc   login user
router.post('/loginUser', (req, res) => {
			const { email , password } = req.body;

		 User.findOne({ email: email })
		.then(function (user){
			console.log(user);
			if(user.password === password){
					const userData = {
							id: user.id,
							name: user.name,
					};
					console.log({ email: req.body.email });
					console.log(userData);
					const token = jwt.sign(
					userData,
					"add-a-thing-token",
					{expiresIn: 3600},
					);
						console.log(token);
					return res.json(token);

			} else {return res.status(400).send('Wrong password');}
			}
			);
});

module.exports = router;
