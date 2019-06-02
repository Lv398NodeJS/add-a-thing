const mongoose = require('mongoose');
const { Schema } = mongoose;

const UserModel = new Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	}
});

module.exports = User = mongoose.model('user', UserModel);