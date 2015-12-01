var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');

var app = express();
var PORT = process.env.PORT || 3000;
var todos = [];
var todoNextid = 1;

app.use(bodyParser.json());

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

app.get('/todos', function (req, res) {
	res.json(todos);
});

// Get todos/id using express
app.get('/todos/:id', function (req, res) {
	var todoId = parseInt(req.params.id, 10);
	var matchedTodo = _.findWhere(todos, {id: todoId})

	/* 
	var matchedTodo;

	todos.forEach(function (todo) {
		if (todoId === todo.id) {
			matchedTodo = todo;
		}
	}); 
	*/

	if (matchedTodo) {
		res.json(matchedTodo);
	} else {
		res.status(404).send();
	}

	res.send('Asking for todo with id of ' + req.params.id);
});

app.post('/todos', function (req, res) {
	var body = _.pick(req.body, 'description', 'completed');

	if (!_.isBoolean(body.completed) || !_.isString(body.description) || body.description.trim().length === 0) {
		return res.status(400).send();
	}

	body.description = body.description.trim();

	// Add id field
	body.id = todoNextid++;

	// Push body into array
	todos.push(body);

	res.json(body);
});

app.listen(PORT, function () {
	console.log('Express listening on port: ' + PORT);
});