$(document).ready(function () {
	$.getJSON("/api/todos").then(addTodos);
	$("#todoInput").keypress(function (event) {
		if (event.which == 13) {
			createTodo();
		}
	});
});

function addTodos(todos) {
	//add todos to page
	todos.forEach(function (todo) {
		addTodo(todo);
	});
}

function addTodo(todo) {
	var newTodo = $('<li class="task">' + todo.name + "</li>");
	if (todo.completed) {
		newTodo.addClass("done");
	}
	$(".list").append(newTodo);
}

function createTodo() {
	//send request to create new todo
	var userInput = $("#todoInput").val();
	// console.log(userInput);
	$.post("/api/todos", { name: userInput })
		.then(function (newTodo) {
			// console.log(newTodo);
			$("#todoInput").val("");
			addTodo(newTodo);
		})
		.catch(function (err) {
			console.log(err);
		});
}
