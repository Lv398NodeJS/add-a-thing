const express = require('express');
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

router.get('/loginUser/:email', (req, res) => {
	User.find({ email: req.params.email })
		.then(user => res.json(user));
});

module.exports = router;
