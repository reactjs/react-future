// More Precise DOM Specific Element Definitions

type ReactDOMNode = ReactDOMElement | ReactDOMFragment | ReactText;

type ReactDOMElement = ReactCompositeElement | {
  ...ReactNativeElement,
  props: {
    className: string,
    children: ReactDOMNodeList,
    ...
  }
};

type ReactDOMFragment = Array<ReactDOMNode | ReactDOMFragment | ReactEmpty>;

type ReactDOMNodeList = ReactDOMNode | ReactEmpty;

// Remaining issues

// How do we ensure that specific DOM tags have more precise prop types
// and they can only accept certain children? TypeScript does have the ability
// to differentiate types based on constant string values using a kind of
// pattern matching.

// How do we describe that a composite element must resolve to a certain
// subset of ReactNodes such as ReactDOMElement or ReactHTMLAnchorElement?
