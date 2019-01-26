/* Implement with generic "todoId". This way model can
   decide to use string, uid, ... */
type t('todoId);

let make: (~id: 'todoId, ~title: string, ~completed: bool) => t('todoId);
let id: t('todoId) => 'todoId;
let title: t('todoId) => string;
let setTitle: (string, t('todoId)) => t('todoId);
let completed: t('todoId) => bool;
let setCompleted: (bool, t('todoId)) => t('todoId);
let toggle: t('todoId) => t('todoId);