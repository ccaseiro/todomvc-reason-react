type todo = string;

type state = {todos: list(todo)};

type action =
  | AddTodo(todo);

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
      <Header onNewTodo={todo => self.send(AddTodo(todo))} />
      {self.state.todos != [] ?
         <Main todos={self.state.todos} /> : ReasonReact.null}
      {self.state.todos != [] ? <Footer /> : ReasonReact.null}
    </div>,
};