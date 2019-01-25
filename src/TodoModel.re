open Belt;

type t = list(Todo.t);

let make = lst => lst;
let size = List.size;
let toList = model => model;
let addTodo = (todo, model) => model @ [todo];
let toggleTodo = (todo, model) =>
  List.map(model, t => t == todo ? Todo.toggle(t) : t);
let toggleAll = (completed, model) =>
  List.map(model, t => t |> Todo.setCompleted(completed));