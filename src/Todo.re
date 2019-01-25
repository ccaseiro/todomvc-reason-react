type t = {
  title: string,
  completed: bool,
};

let make = (~title, ~completed=false, ()) => {title, completed};
let title = todo => todo.title;
let completed = todo => todo.completed;
let setCompleted = (completed, todo) => {...todo, completed};
let toggle = todo => {...todo, completed: !todo.completed};