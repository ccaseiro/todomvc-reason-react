type t;

let make: (~id: int, ~title: string, ~completed: bool) => t;
let title: t => string;
let completed: t => bool;
let setCompleted: (bool, t) => t;
let toggle: t => t;