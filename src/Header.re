type state = {value: string};

type action =
  | ChangeInput(string)
  | EnterKeyDown;

let component = ReasonReact.reducerComponent("Header");

let make = (~onNewTodo, _children) => {
  ...component,
  initialState: () => {value: ""},
  reducer: (action: action, state: state) =>
    switch (action) {
    | ChangeInput(newValue) => ReasonReact.Update({value: newValue})
    | EnterKeyDown =>
      ReasonReact.UpdateWithSideEffects(
        {value: ""},
        _self => onNewTodo(String.trim(state.value)),
      )
    },
  render: self =>
    <header className="header">
      <h1> {ReasonReact.string("todos")} </h1>
      <input
        className="new-todo"
        value={self.state.value}
        placeholder="What needs to be done?"
        autoFocus=true
        onKeyDown={e =>
          if (e->ReactEvent.Keyboard.keyCode == 13) {
            self.send(EnterKeyDown);
          }
        }
        onChange={e =>
          self.send(ChangeInput(e->ReactEvent.Form.target##value))
        }
      />
    </header>,
};