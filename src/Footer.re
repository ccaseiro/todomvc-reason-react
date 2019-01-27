let component = ReasonReact.statelessComponent("Footer");

let pluralize = (count, word) => word ++ (count == 1 ? "" : "s");

let make = (~count, _children) => {
  ...component,
  render: _self =>
    <footer className="footer">
      <span className="todo-count">
        <strong> {string_of_int(count) |> ReasonReact.string} </strong>
        {" " ++ pluralize(count, "item") ++ " left" |> ReasonReact.string}
      </span>
    </footer>,
};