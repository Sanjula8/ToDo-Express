$(document).ready(function () {
	$.getJSON('/api/todos').then(addTodos);

	$('#todoInput').keypress(function (event) {
		if (event.which == 13) {
			createTodo();
		}
	});

	$('.list').on('click', 'span', function () {
		removeTodo($(this).parent());
	});
});

function addTodos(todos) {
	//add todos to page
	todos.forEach(function (todo) {
		addTodo(todo);
	});
}

function addTodo(todo) {
	var newTodo = $(
		'<li class="task">' + todo.name + '<span class="icon">X</span></li>'
	);
	newTodo.data('id', todo._id);
	if (todo.completed) {
		newTodo.addClass('done');
	}
	$('.list').append(newTodo);
}

function createTodo() {
	//send request to create new todo
	var userInput = $('#todoInput').val();
	// console.log(userInput);
	$.post('/api/todos', { name: userInput })
		.then(function (newTodo) {
			// console.log(newTodo);
			$('#todoInput').val('');
			addTodo(newTodo);
		})
		.catch(function (err) {
			console.log(err);
		});
}

function removeTodo(todo) {
	var clickedId = todo.data('id');
	var deleteUrl = 'api/todos/' + clickedId;
	$.ajax({
		method: 'DELETE',
		url: deleteUrl,
	})
		.then(function (data) {
			todo.remove();
		})
		.catch(function (err) {
			console.log(err);
		});
}
