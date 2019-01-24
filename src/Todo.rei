type t;

let make: (~title: string, ~completed: bool=?, unit) => t;
let title: t => string;
let completed: t => bool;
let toggle: t => t;