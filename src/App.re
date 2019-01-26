type state = {todos: TodoModel.t};

type action =
  | AddTodo(Todo.t)
  | Toggle(Todo.t)
  | ToggleAll(bool);

let component = ReasonReact.reducerComponent("App");

let onToggleTodo = e => Js.log2("onToggle", e);

let make = _children => {
  ...component,
  initialState: () => {todos: TodoModel.make()},
  reducer: (action: action, state: state) =>
    switch (action) {
    | AddTodo(todo) =>
      ReasonReact.Update({todos: state.todos |> TodoModel.addTodo(todo)})
    | Toggle(todo) =>
      ReasonReact.Update({todos: state.todos |> TodoModel.toggleTodo(todo)})
    | ToggleAll(completed) =>
      ReasonReact.Update({
        todos: state.todos |> TodoModel.toggleAll(completed),
      })
    },
  render: self =>
    <div>
      <Header
        onNewTodo={todo => self.send(AddTodo(Todo.make(~title=todo, ())))}
      />
      {self.state.todos |> TodoModel.size != 0 ?
         <Main
           todos={self.state.todos |> TodoModel.toList}
           onToggleTodo={todo => self.send(Toggle(todo))}
           onToggleAll={completed => self.send(ToggleAll(completed))}
         /> :
         ReasonReact.null}
      {self.state.todos |> TodoModel.size != 0 ? <Footer /> : ReasonReact.null}
    </div>,
};