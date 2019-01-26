open Belt;

type t = {
  todos: list(Todo.t),
  sequenceId: int,
};

let make = () => {todos: [], sequenceId: 0};
let size = model => model.todos |> List.size;
let toList = model => model.todos;
let newTodo = (title, model) => {
  todos:
    model.todos @ [Todo.make(~id=model.sequenceId, ~title, ~completed=false)],
  sequenceId: model.sequenceId + 1,
};
let toggleTodo = (todo, model) => {
  ...model,
  todos: List.map(model.todos, t => t == todo ? Todo.toggle(t) : t),
};
let toggleAll = (completed, model) => {
  ...model,
  todos: List.map(model.todos, t => t |> Todo.setCompleted(completed)),
};