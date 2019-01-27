let component = ReasonReact.statelessComponent("Footer");

let pluralize = (count, word) => word ++ (count == 1 ? "" : "s");

let make = (~activeCount, ~completedCount, ~onClearCompleted, _children) => {
  let clearButton =
    completedCount > 0 ?
      <button className="clear-completed" onClick=onClearCompleted>
        {ReasonReact.string("Clear completed")}
      </button> :
      ReasonReact.null;

  {
    ...component,
    render: _self =>
      <footer className="footer">
        <span className="todo-count">
          <strong>
            {string_of_int(activeCount) |> ReasonReact.string}
          </strong>
          {" "
           ++ pluralize(activeCount, "item")
           ++ " left"
           |> ReasonReact.string}
        </span>
        clearButton
      </footer>,
  };
};