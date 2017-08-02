const mongoose = require('mongoose');

// Contact Schema
var contactSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	phone: {
		type: {
			mobile: {
				type: String
			},
			work: {
				type: String
			}
		}
	}
});

var Contact = module.exports = mongoose.model('Contact', contactSchema);

// READ Contacts
module.exports.getContacts = function(callback) {
	Contact.find(callback);
}

// READ Contact
module.exports.getContactById = function(id, callback) {
	Contact.findById(id, callback);
}

// CREATE Contact
module.exports.addContact = function(contact, callback) {
	Contact.create(contact, callback);
}

// UPDATE Contact
module.exports.updateContactById = function(id, contact, options, callback) {
	var query = {
		_id: id
	};
	var update = {
		name: contact.name,
		email: contact.email,
		phone: {
			mobile: contact.phone.mobile,
			work: contact.phone.work
		}
	}
	Contact.findOneAndUpdate(query, contact, options, callback);
}

// DELETE Contact
module.exports.deleteContactById = function(id, callback) {
	var query = {
		_id: id
	};
	Contact.remove(query, callback);
}
