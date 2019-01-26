type state = {
  editText: string,
  editing: bool,
  editFieldRef: ref(option(Dom.element)),
};

type action =
  | Edit
  | Change(string)
  | Submit;

let setEditFieldRef = (theRef, {ReasonReact.state}) =>
  state.editFieldRef := Js.Nullable.toOption(theRef);

let component = ReasonReact.reducerComponent("TodoItem");

let make = (~todo, ~onToggle, ~onChange, _children) => {
  {
    ...component,
    initialState: () => {
      editText: todo->Todo.title,
      editing: false,
      editFieldRef: ref(None),
    },
    reducer: (action: action, state: state) =>
      switch (action) {
      | Edit =>
        ReasonReact.UpdateWithSideEffects(
          {...state, editing: true},
          _s => {
            switch (state.editFieldRef^) {
            | None => ()
            | Some(x) =>
              let node = ReactDOMRe.domElementToObj(x);
              ignore(node##focus());
              ignore(
                node##setSelectionRange(
                  node##value##length,
                  node##value##length,
                ),
              );
              ();
            };
            ();
          },
        )
      | Change(text) => ReasonReact.Update({...state, editText: text})
      | Submit =>
        ReasonReact.UpdateWithSideEffects(
          {...state, editing: false},
          self => onChange(self.state.editText),
        )
      },
    render: self => {
      let className =
        [
          Todo.completed(todo) ? "completed" : "",
          self.state.editing ? "editing" : "",
        ]
        |> String.concat(" ");
      <li className>
        <div className="view">
          <input
            className="toggle"
            type_="checkbox"
            checked={todo |> Todo.completed}
            onChange=onToggle
          />
          <label onDoubleClick={_ => self.send(Edit)}>
            {ReasonReact.string(todo |> Todo.title)}
          </label>
        </div>
        <input
          ref={self.handle(setEditFieldRef)}
          className="edit"
          value={self.state.editText}
          onChange={e => self.send(Change(e->ReactEvent.Form.target##value))}
          onBlur={_ => self.send(Submit)}
        />
      </li>;
    },
  };
};