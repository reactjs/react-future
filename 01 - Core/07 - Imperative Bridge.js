import { Button } from "button";
import { Renderer } from "react-dom";

// Currently setProps() provides a convenient hook on rendered components
// that are top level. This magically turns props into state instead of being
// modeled outside the component. This undermines the integrity of props
// in a component tree. Instead, we want to add a wrapper that saves these
// values as its own internal state. You can imperatively update the
// props using setters on the renderer instances. These gets flushed down to
// the underlying component class.

var button = new Renderer(<Button foo="bar" />);

// Insertion is done by exposing a rendered top-level element which can be
// inserted anywhere in the DOM.

document.body.appendChild(button.toElement());

// A setter is used to update the component
button.foo = "baz";
