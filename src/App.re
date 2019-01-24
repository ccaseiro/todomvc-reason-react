type state = {todos: list(Todo.t)};

type action =
  | AddTodo(Todo.t);

let component = ReasonReact.reducerComponent("App");

let make = _children => {
  ...component,
  initialState: () => {todos: []},
  reducer: (action: action, state: state) =>
    switch (action) {
    | AddTodo(todo) => ReasonReact.Update({todos: state.todos @ [todo]})
    },
  render: self =>
    <div>
      {self.state.todos != [] ?
         <Main todos={self.state.todos} /> : ReasonReact.null}
      {self.state.todos != [] ? <Footer /> : ReasonReact.null}
      <Header
        onNewTodo={todo => self.send(AddTodo(Todo.make(~title=todo, ())))}
      />
    </div>,
};