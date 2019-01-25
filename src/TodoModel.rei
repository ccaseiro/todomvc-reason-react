type t;

let make: list(Todo.t) => t;
let size: t => int;
let toList: t => list(Todo.t);
let addTodo: (Todo.t, t) => t;
let toggleTodo: (Todo.t, t) => t;
let toggleAll: (bool, t) => t;