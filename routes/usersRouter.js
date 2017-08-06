const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// Require the contact model
User = require('../models/user');

// Use body-parser middleware
router.use(bodyParser.json());

// API router to GET all users
router.get('/', function(req, res) {
	User.getUsers(function(err, users) {
		if (err) {
			throw err;
		}
		res.json(users)
	});
});

// API router to GET one user by id
router.get('/:_id', function(req, res) {
	User.getUserById(req.params._id, function(err, user) {
		if (err) {
			throw err;
		}
		res.status(200).json(user);
	});
});

// API router to POST a user
router.post('/', function(req, res) {
	var newUser = req.body;
	if (!newUser.name || !newUser.email || !newUser.password) {
		res.status(400).json({
			"error": "Missing required paramaters"
		});
	} else {
		User.addUser(newUser, function(err, newUser) {
			if (err) {
				throw err;
			}
			res.status(200).json(newUser);
		});
	}
});

// API router to PUT a user
router.put('/:_id', function(req, res) {
	var id = req.params._id;
	var updateUser = req.body;
	if (!updateUser.name || !updateUser.email || !updateUser.password) {
		res.status(400).json({
			"error": "Missing required paramaters"
		});
	} else {
		User.updateUserById(id, updateUser, {}, function(err, updateUser) {
			if (err) {
				throw err;
			}
			res.status(200).json(updateUser);
		});
	}
});

// API router to DELETE a user
router.delete('/:_id', function(req, res) {
	var id = req.params._id;
	User.deleteUsertById(id, function(err, updateUser) {
		if (err) {
			throw err;
		}
		res.status(200).json(req.params._id);
	});
});

module.exports = router;
