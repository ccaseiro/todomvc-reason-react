type state = {todos: TodoModel.t};

type action =
  | NewTodo(string)
  | Toggle(Todo.t(TodoModel.todoId))
  | ToggleAll(bool);

let component = ReasonReact.reducerComponent("App");

let onToggleTodo = e => Js.log2("onToggle", e);

let make = _children => {
  ...component,
  initialState: () => {todos: TodoModel.make()},
  reducer: (action: action, state: state) =>
    switch (action) {
    | NewTodo(title) =>
      ReasonReact.Update({todos: state.todos |> TodoModel.newTodo(title)})
    | Toggle(todo) =>
      ReasonReact.Update({todos: state.todos |> TodoModel.toggleTodo(todo)})
    | ToggleAll(completed) =>
      ReasonReact.Update({
        todos: state.todos |> TodoModel.toggleAll(completed),
      })
    },
  render: self =>
    <div>
      <Header onNewTodo={title => self.send(NewTodo(title))} />
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