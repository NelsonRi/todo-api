var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var todos = [{
	id: 1,
	description: 'Call Mom',
	completed: false,
	type: 'string'
}, {
	id: 2,
	description: 'Go grocery shopping',
	completed: false,
	type: 'string'
}];

app.get('/', function (req, res) {
	res.send('Todo API Root');
});

app.get('/todos', function (req, res) {
	res.send('Todo page is live!');
});

app.listen(PORT, function () {
	console.log('Express listening on port: ' + PORT);
});