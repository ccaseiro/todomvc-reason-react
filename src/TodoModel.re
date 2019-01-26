open Belt;

/* Todo.t doesn't need to know the type of its id. This way we can use
   an incremental int or an uuid, or ... */
type todoId = int;

type t = {
  todos: list(Todo.t(todoId)),
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
  todos:
    List.map(model.todos, t =>
      Todo.id(t) == Todo.id(todo) ? Todo.toggle(t) : t
    ),
};
let toggleAll = (completed, model) => {
  ...model,
  todos: List.map(model.todos, t => t |> Todo.setCompleted(completed)),
};
let updateTodo = (todo, model) => {
  ...model,
  todos: List.map(model.todos, t => Todo.id(t) == Todo.id(todo) ? todo : t),
};

let deleteTodo = (todo, model) => {
  ...model,
  todos: List.keep(model.todos, t => Todo.id(t) != Todo.id(todo)),
};