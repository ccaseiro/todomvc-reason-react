let component = ReasonReact.statelessComponent("Main");

let make = _children => {
  ...component,
  render: _self =>
    <section className="main"> {ReasonReact.string("Main")} </section>,
};