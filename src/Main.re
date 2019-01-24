open Belt;
let component = ReasonReact.statelessComponent("Main");

let make = (~todos, _children) => {
  ...component,
  render: _self =>
    <section className="main">
      <ul className="todo-list">
        {ReasonReact.array(
           List.mapWithIndex(todos, (index, todo) =>
             <li key={string_of_int(index)}>
               <div className="view">
                 <label> {ReasonReact.string(todo |> Todo.title)} </label>
               </div>
             </li>
           )
           |> List.toArray,
         )}
      </ul>
    </section>,
};