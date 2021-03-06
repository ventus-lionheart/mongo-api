const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// Require the contact model
Contact = require('../models/contact');

// Use body-parser middleware
router.use(bodyParser.json());

// API router to GET all contacts
router.get('/', function(req, res) {
	Contact.getContacts(function(err, contacts) {
		if (err) {
			throw err;
		}
		res.json(contacts);
	});
});

// API router to GET one contact by id
router.get('/:_id', function(req, res) {
	Contact.getContactById(req.params._id, function(err, contact) {
		if (err) {
			throw err;
		}
		res.status(200).json(contact);
	});
});

// API router to POST a contact
router.post('/', function(req, res) {
	var newContact = req.body;
	if (!newContact.name || !newContact.email) {
		res.status(400).json({
			"error": "Missing required paramaters"
		});
	} else {
		Contact.addContact(newContact, function(err, newContact) {
			if (err) {
				throw err;
			}
			res.status(200).json(newContact);
		});
	}
});

// API router to PUT a contact
router.put('/:_id', function(req, res) {
	var id = req.params._id;
	var updateContact = req.body;
	if (!updateContact.name || !updateContact.email) {
		res.status(400).json({
			"error": "Missing required paramaters"
		});
	} else {
		Contact.updateContactById(id, updateContact, {}, function(err, updateContact) {
			if (err) {
				throw err;
			}
			res.status(200).json(updateContact);
		});
	}
});

// API router to DELETE a contact
router.delete('/:_id', function(req, res) {
	var id = req.params._id;
	Contact.deleteContactById(id, function(err, updateContact) {
		if (err) {
			throw err;
		}
		res.status(200).json(req.params._id);
	});
});

module.exports = router;
