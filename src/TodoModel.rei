type t;

let make: unit => t;
let size: t => int;
let toList: t => list(Todo.t);
let newTodo: (string, t) => t;
let toggleTodo: (Todo.t, t) => t;
let toggleAll: (bool, t) => t;