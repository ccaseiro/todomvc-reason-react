open Belt;
let component = ReasonReact.statelessComponent("Main");

let make =
    (
      ~todos,
      ~onToggleTodo,
      ~onToggleAll,
      ~onChangeTodo,
      ~onDestroyTodo,
      _children,
    ) => {
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
                 onChange={newTitle => onChangeTodo(todo, newTitle)}
                 onDestroy={_ => onDestroyTodo(todo)}
               />
             )
             |> List.toArray,
           )}
        </ul>
      </section>,
  };
};