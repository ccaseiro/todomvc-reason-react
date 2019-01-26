type todoId;
type t;

let make: unit => t;
let size: t => int;
let toList: t => list(Todo.t(todoId));
let newTodo: (string, t) => t;
let toggleTodo: (Todo.t(todoId), t) => t;
let toggleAll: (bool, t) => t;
let updateTodo: (Todo.t(todoId), t) => t;