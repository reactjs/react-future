// The remaining files in this repo all assume a slight change to the semantics
// of JSX. The runtime semantics of the following JSX expression:

<Button bar="baz" />

// Would turn into an object initializer of a descriptor:

{
  type: Button,
  props: { bar: "baz", anotherProp: "it's default value" },
  scope: this,
  // It could potentially be tagged with a shared prototype.
  __proto__: JSX.Descriptor
}

// We still have an opportunity to add static analysis, validation and
// optimizations in the transform but semantically it means the same.

// This means that there is no need for the class Button to export any helper
// function to create these descriptors. A simple React class would look
// something like this:

import InnerButton from "inner-button";

export class Button {
  render() {
    return <InnerButton />;
  }
};

// Note that there is no dependency on React's runtime nor the concept of
// descriptors in this scenario.

// Strings can be used for registered WebComponents and HTML/SVG DOM nodes
// in a JSON compatible structure to describe a tree.

{ type: 'div', props: { className: 'foo', children: [
  { type: 'span', props: { children:
    'text content'
  } }
] } }

// That allows the user to code arbitrary DOM centric components without any
// dependency on the React runtime itself. Avoiding the need for mocking or
// stubbing.

// The JSON syntax can be fairly inconvenient without JSX though. In this
// scenario we would recommend that you explicitly export a descriptor factory
// from all your components.

import React from "react";

class Button {

}

export default React.createComponent(Button);

// The major downside of this proposal is that it potentially leads to
// fragmentation in the community where certain components are exported with
// descriptor factories and not. If you don't use JSX, you may have to create
// your own wrapper factories around third party components.
