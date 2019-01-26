type state = {todos: TodoModel.t};

type todoId = TodoModel.todoId;
type todo = Todo.t(todoId);

type action =
  | NewTodo(string)
  | Toggle(todo)
  | ToggleAll(bool)
  | UpdateTodo(todo, string)
  | DeleteTodo(todo);

let component = ReasonReact.reducerComponent("App");

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
    | UpdateTodo(todo, newTitle) =>
      ReasonReact.Update({
        todos:
          state.todos
          |> TodoModel.updateTodo(
               {
                 todo |> Todo.setTitle(newTitle);
               },
             ),
      })
    | DeleteTodo(todo) =>
      ReasonReact.Update({todos: state.todos |> TodoModel.deleteTodo(todo)})
    },
  render: self =>
    <div>
      <Header onNewTodo={title => self.send(NewTodo(title))} />
      {self.state.todos |> TodoModel.size != 0 ?
         <Main
           todos={self.state.todos |> TodoModel.toList}
           onToggleTodo={todo => self.send(Toggle(todo))}
           onToggleAll={completed => self.send(ToggleAll(completed))}
           onChangeTodo={(todo, newTitle) =>
             self.send(UpdateTodo(todo, newTitle))
           }
           onDestroyTodo={todo => self.send(DeleteTodo(todo))}
         /> :
         ReasonReact.null}
      {self.state.todos |> TodoModel.size != 0 ? <Footer /> : ReasonReact.null}
    </div>,
};