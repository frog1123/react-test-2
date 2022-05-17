const Joi = require('joi');
const express = require('express');
var cors = require('cors');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({ origin: '*', credentials: true }), express.json());

const users = [
	{ id: 1, name: 'user1' },
	{ id: 2, name: 'user2' },
	{ id: 3, name: 'user3' }
];

app.get('/', (req, res) => {
	res.send('Hello World');
});

app.get('/api/users', (req, res) => {
	res.send(users);
});

app.get('/api/users/:id', (req, res) => {
	const user = users.find(user => user.id === parseInt(req.params.id));

	if (!user) return res.status(404).send('User with given id was not found'); // 404 Not found
	res.send(user);
	// res.send(req.params.id);
});

app.post('/api/users', (req, res) => {
	const { error } = validateItem(req.body); // result.error

	if (error) return res.status(400).send(error.details[0].message); // 400 Bad request

	const user = {
		id: users.length + 1,
		name: req.body.name
	};

	users.push(user);

	res.send(user);
});

app.put('/api/users/:id', (req, res) => {
	// Look for item, if not existing, return 404 Not found
	const user = users.find(user => user.id === parseInt(req.params.id));

	if (!user) return res.status(404).send('User with given id was not found'); // 404 Not found

	// Try to validate, if invalid, return 400 Bad request
	const { error } = validateItem(req.body); // result.error

	if (error) return res.status(400).send(error.details[0].message); // 400 Bad request

	// Update user, return updated item

	user.name = req.body.name;
	res.send(user);
});

app.delete('/api/users/:id', (req, res) => {
	//Look for item, if it doesn't exit, return 404 Not found
	const user = users.find(user => user.id === parseInt(req.params.id));
	if (!user) return res.status(404).send('User with given id was not found'); // 404 Not found

	// Delete
	const index = users.indexOf(user);
	users.splice(index, 1);

	res.send(user);
});

function validateItem(user) {
	// latest joi is diff than tutorial
	// joi replaces validation checking like this (!req.body.name || req.body.name.length < 3)

	const schema = Joi.object({
		name: Joi.string().min(3).required()
	});

	return schema.validate(user);
}

app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
