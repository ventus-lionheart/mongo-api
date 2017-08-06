const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');

// Require the contact model
Contact = require('../models/contact');

// Use body-parser middleware
router.use(bodyParser.json());

// API home
router.get('/', function(req, res) {
	res.send('Use /api/contacts, or /api/contacts/:id');
});

// API router to GET all contacts
router.get('/api/contacts', function(req, res) {
	Contact.getContacts(function(err, contacts) {
		if (err) {
			throw err;
		}
		res.json(contacts);
	});
});

// API router to GET one contact by id
router.get('/api/contacts/:_id', function(req, res) {
	Contact.getContactById(req.params._id, function(err, contact) {
		if (err) {
			throw err;
		}
		res.status(200).json(contact);
	});
});

// API router to POST a contact
router.post('/api/contacts', function(req, res) {
	var newContact = req.body;
	Contact.addContact(newContact, function(err, newContact) {
		if (err) {
			throw err;
		}
		res.status(200).json(newContact);
	});
});

// API router to PUT a contact
router.put('/api/contacts/:_id', function(req, res) {
	var id = req.params._id;
	var updateContact = req.body;
	Contact.updateContactById(id, updateContact, {}, function(err, updateContact) {
		if (err) {
			throw err;
		}
		res.status(200).json(updateContact);
	});
});

// API router to DELETE a contact
router.delete('/api/contacts/:_id', function(req, res) {
	var id = req.params._id;
	Contact.deleteContactById(id, function(err, updateContact) {
		if (err) {
			throw err;
		}
		res.status(200).json(req.params._id);
	});
});

module.exports = router;
