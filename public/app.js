$(document).ready(function () {
	$.getJSON('/api/todos').then(addTodos);

	$('#todoInput').keypress(function (event) {
		if (event.which == 13) {
			createTodo();
		}
	});

	$('.list').on('click', 'li', function () {
		// console.log($(this));
		updateTodo($(this));
	});

	$('.list').on('click', 'span', function (e) {
		e.stopPropagation();
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
	newTodo.data('completed', todo.completed);
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

function updateTodo(todo) {
	var updateUrl = 'api/todos/' + todo.data('id');
	var isDone = !todo.data('completed');
	var updateData = { completed: isDone };
	// console.log(updateData);
	$.ajax({
		method: 'PUT',
		url: updateUrl,
		data: updateData,
	}).then(function (updatedTodo) {
		todo.toggleClass('done');
		todo.data('completed', isDone);
	});
}
