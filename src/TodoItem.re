let component = ReasonReact.statelessComponent("TodoItem");

let make = (~todo, ~onToggle, _children) => {
  let className = Todo.completed(todo) ? "completed" : "";

  {
    ...component,
    render: _self =>
      <li className>
        <div className="view">
          <input
            className="toggle"
            type_="checkbox"
            checked={todo |> Todo.completed}
            onChange=onToggle
          />
          <label> {ReasonReact.string(todo |> Todo.title)} </label>
        </div>
      </li>,
  };
};