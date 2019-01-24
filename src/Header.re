let component = ReasonReact.statelessComponent("Header");

let make = _children => {
  ...component,
  render: _self =>
    <header className="header">
      <h1> {ReasonReact.string("todos")} </h1>
      <input
        className="new-todo"
        placeholder="What needs to be done?"
        autoFocus=true
      />
    </header>,
};