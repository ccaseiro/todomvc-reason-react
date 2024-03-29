type todoId;
type t;

let make: unit => t;
let size: t => int;
let newTodo: (string, t) => t;
let toggleTodo: (Todo.t(todoId), t) => t;
let toggleAll: (bool, t) => t;
let updateTodo: (Todo.t(todoId), t) => t;
let todos: t => list(Todo.t(todoId));
let activeTodos: t => list(Todo.t(todoId));
let completedTodos: t => list(Todo.t(todoId));
let deleteTodo: (Todo.t(todoId), t) => t;
let deleteCompleted: t => t;