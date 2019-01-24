let component = ReasonReact.statelessComponent("Footer");

let make = _children => {
  ...component,
  render: _self =>
    <footer className="footer"> {ReasonReact.string("Footer")} </footer>,
};