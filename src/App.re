type todo = string;

type state = {todos: list(todo)};

type action = unit;

let component = ReasonReact.reducerComponent("App");

let comp = [|<Main />|];
let make = _children => {
  ...component,
  initialState: () => {todos: []},
  reducer: (_action: action, _state: state) => ReasonReact.NoUpdate,
  render: self =>
    <div>
      <Header />
      {self.state.todos != [] ? <Main /> : ReasonReact.null}
      {self.state.todos != [] ? <Footer /> : ReasonReact.null}
    </div>,
};