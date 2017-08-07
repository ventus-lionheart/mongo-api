# mongo-api
REST api using node, express, mongodb, and mongoose. Uses a User Schema, and a Contact Schema. MongoDb Database URI must be provided in app.js. 

## API Routes
	app.use('/api/contacts', contactRoutes);
	app.use('/api/users', userRoutes);
Please refer to the corresponding .js files under `routes` for full api paths. 

## Start
To start the app, navigate to the root folder of the app and `npm install`, then lunch with `node app`. The console will show which port the app is using. MongoDb must be running to launch the app. 

## User Schema

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

## Contact Schema
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
