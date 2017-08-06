const mongoose = require('mongoose');

// User Schema
var userSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	contactList: {
		type: Array
	}
});

var User = module.exports = mongoose.model('User', userSchema);

// READ Users
module.exports.getUsers = function(callback) {
	User.find(callback);
}

// READ User
module.exports.getUserById = function(id, callback) {
	User.findById(id, callback);
}

// CREATE User
module.exports.addUser = function(user, callback) {
	User.create(user, callback);
}

// UPDATE User
module.exports.updateUserById = function(id, user, options, callback) {
	var query = {
		_id: id
	};
	var update = {
		name: user.name,
		email: user.email,
		password: user.password,
		contactList: user.contactList
	}
	User.findOneAndUpdate(query, user, options, callback);
}

// DELETE User
module.exports.deleteUsertById = function(id, callback) {
	var query = {
		_id: id
	};
	User.remove(query, callback);
}
