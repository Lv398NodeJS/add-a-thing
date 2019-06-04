const express = require('express');
const router = express.Router();

const User = require('../models/User');

// @route  POST api/users
// @desc   Register user
// @access Public


	router.post('/registerUser', async (req, res) => {
		console.log("registerUser");
		// console.log(req.body);


		const { email } = req.body;
		let users = await User.findOne({email});
		if(users==null){
			console.log('New User');
				const newUser = new User({
					name: req.body.name,
					email: req.body.email,
					password: req.body.password,
					phone: req.body.phone,
				});
			await newUser.save();
			await res.status(200).send('Registration Ok');

		} else {
			console.log('User already exists');
			await res.status(400).send('User already exists');
		}
	});

router.get('/loginUser/:email', (req, res) => {
	User.find({ email: req.params.email })
		.then(user => res.json(user));

	console.log("loginUser");
	// const { email } = req.body;
	// let userLog =  User.findOne({ user: req.body.email }).populate();
	// 	console.log(userLog);
	// if(user==null){
	// 	console.log('You are not registered');
	// 	await res.status(400).send('You are not registered');
	// } else {
	// 	console.log('User already exists');
	//
	// 	let getUser = User
	// 	 .findOne({email: req.param(email)}).populate('users',['email','name','password','phone']);
	//
	// 		console.log(getUser);
	// }

});


// router.get('/', (req, res) => {
// 	try {
//
// 	}catch (e) {
// 		console.error(e.message)
// 		res.status(500).status('server error')
// 	}
//
// });


// router.post('/',[
// 	check('name','Name is require')
// 	.not()
// 	.isEmpty(),
// 	check('email', 'Please include a valid email').isEmail(),
// 	check('password', 'Please enter a password with 6 or more characters')
// 	.isLength({ min: 6 })
// ],(req, res)=>{
// 	const errors = validationResult(req);
// 	if(!errors.isEmpty()){
// 		return res.status(400).json({errors: errors.array()});
// 	}
// 	res.send('User route');
//
// });


module.exports = router;
