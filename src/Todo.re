type t('todoId) = {
  id: 'todoId,
  title: string,
  completed: bool,
};

let make = (~id, ~title, ~completed) => {id, title, completed};
let id = todo => todo.id;
let title = todo => todo.title;
let setTitle = (title, todo) => {...todo, title};
let completed = todo => todo.completed;
let setCompleted = (completed, todo) => {...todo, completed};
let toggle = todo => {...todo, completed: !todo.completed};