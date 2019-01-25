open Belt;
let component = ReasonReact.statelessComponent("Main");

let make = (~todos, ~onToggleTodo, ~onToggleAll, _children) => {
  let activeTodoCount =
    List.keep(todos, t => !Todo.completed(t)) |> List.size;
  {
    ...component,
    render: _self =>
      <section className="main">
        <input
          id="toggle-all"
          className="toggle-all"
          type_="checkbox"
          checked={activeTodoCount == 0}
          onChange={e => onToggleAll(e->ReactEvent.Form.target##checked)}
        />
        <label htmlFor="toggle-all">
          {ReasonReact.string("Mark all as complete")}
        </label>
        <ul className="todo-list">
          {ReasonReact.array(
             List.mapWithIndex(todos, (index, todo) =>
               <TodoItem
                 key={string_of_int(index)}
                 todo
                 onToggle={_ => onToggleTodo(todo)}
                 /* let className = Todo.completed(todo) ? "completed" : "";
                    <li key={string_of_int(index)} className>
                      <div className="view">
                        <input
                          className="toggle"
                          type_="checkbox"
                          checked={todo |> Todo.completed}
                          onChange={_ => onToggleTodo(todo)}
                        />
                        <label> {ReasonReact.string(todo |> Todo.title)} </label>
                      </div>
                      <input
                        className="edit"
                        value="Create a TodoMVC template"
                        onChange={e => Js.log2("xxxx", e)}
                      />
                    </li>; */
               />
             )
             |> List.toArray,
           )}
        </ul>
      </section>,
  };
};