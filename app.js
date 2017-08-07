const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const contactRoutes = require('./routes/contactsRouter');
const userRoutes = require('./routes/usersRouter');
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());

// Use Express Router
app.use('/api/contacts', contactRoutes);
app.use('/api/users', userRoutes);

// Create database variable outside of the connection
var db;

// Connect to mongoose (Change the URI or localhost path for mongodb as needed)
mongoose.connect(process.env.MONGODB_URI || 'mongodb://achowdhury2015:absolute2895@ds025263.mlab.com:25263/achowdhury-mean-contact', {
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
	res.send('Use /api/contacts, or /api/users');
});
