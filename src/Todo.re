type t = {
  id: int,
  title: string,
  completed: bool,
};

let make = (~id, ~title, ~completed) => {id, title, completed};
let title = todo => todo.title;
let completed = todo => todo.completed;
let setCompleted = (completed, todo) => {...todo, completed};
let toggle = todo => {...todo, completed: !todo.completed};