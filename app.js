const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const routes = require('./routes/contacts');
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());

// Use Express Router
app.use('/', routes);

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
