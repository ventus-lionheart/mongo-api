const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());

// Require the contact model
Contact = require('./models/contact');

// Create database variable outside of the connection
var db;

// Connect to mongoose (Change the URI and localhost path for mongodb as needed)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/contacts', {
	useMongoClient: true
}, function(err) {

	// Exit process if unable to connect to db
	if (err) {
		console.log(err);
		process.exit(1);
	}

	// Save databse object
	db = mongoose.connection;
	console.log("Database connection ready");

	// Serve the app
	var server = app.listen(process.env.PORT || 8080, function() {
		var port = server.address().port;
		console.log("App now running on port", port);
	});
});

// API home
app.get('/', function(req, res) {
	res.send('Use /api/contacts, or /api/contacts/:id');
});

// API router to GET all contacts
app.get('/api/contacts', function(req, res) {
	Contact.getContacts(function(err, contacts) {
		if (err) {
			throw err;
		}
		res.json(contacts);
	});
});

// API router to GET one contact by id
app.get('/api/contacts/:_id', function(req, res) {
	Contact.getContactById(req.params._id, function(err, contact) {
		if (err) {
			throw err;
		}
		res.status(200).json(contact);
	});
});

// API router to POST a contact
app.post('/api/contacts', function(req, res) {
	var newContact = req.body;
	Contact.addContact(newContact, function(err, newContact) {
		if (err) {
			throw err;
		}
		res.status(200).json(newContact);
	});
});

// API router to PUT a contact
app.put('/api/contacts/:_id', function(req, res) {
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
app.delete('/api/contacts/:_id', function(req, res) {
	var id = req.params._id;
	Contact.deleteContactById(id, function(err, updateContact) {
		if (err) {
			throw err;
		}
		res.status(200).json(req.params._id);
	});
});
