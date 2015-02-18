/**
 * ELEMENT OBJECT LITERAL
 *
 * A React component module will no longer export a helper function to create
 * virtual elements. Instead it's the responsibility of the consumer to
 * efficiently create the virtual element.
 * 
 * Languages that compile to JS can choose to implement the element signature
 * in whatever way is idiomatic for that language:
 */

{
  type: Button,
  props: {
    foo: bar,
    children: [
      { type: 'span', props: { children: a } },
      { type: 'span', props: { children: b } }
    ]
  },

  // optional
  key: 'mybutton',
  ref: myButtonRef
}

/**
 * JSX
 */

<Button foo={bar} key="mybutton" ref={myButtonRef}>
 <span>{a}</span>
 <span>{b}</span>
</Button>

/**
 * PLAIN JS
 * __DEV__ MODE
 *
 * This helper function ensures that your static children don't get the key
 * warning. It creates an element for you with the current owner/context.
 * The props object is cloned and key/ref moved onto the element.
 */

var _Button = React.createFactory(Button);
var _span = React.createFactory('span');

_Button({ foo: bar, key: 'mybutton', ref: myButtonRef },
  _span(null, a),
  _span(null, b)
)

/**
 * If you use JSX, or can statically analyze that the Factory calls belongs to
 * React, then you can chose to opt-in to one of the optimizations modes.
 */

/**
 * INLINE
 * PRODUCTION MODE
 *
 * Inline mode simply creates the element objects inline in the code, with
 * a lookup for current owner/context as well as resolving default props.
 * If defaults aren't known statically, then we create a factory that can help
 * assign defaults quickly on the newly created object.
 */

var Button_assignDefaults = React.createDefaultsFactory(Button);

{
  type: Button,
  props: Button_assignDefaults({
    foo: bar,
    children: [
      { type: 'span', props: { children: a }, key: null, ref: null, _owner: React._currentOwner, _context: React._currentContext },
      { type: 'span', props: { children: b }, key: null, ref: null, _owner: React._currentOwner, _context: React._currentContext }
    ]
  }),

  key: 'mybutton',
  ref: myButtonRef,

  _owner: React._currentOwner,
  _context: React._currentContext
}

/**
 * POOLED MODE
 *
 * Pooled mode doesn't allocate any new objects. Instead it gets mutable objects
 * from a pool and reuses them. It overrides the props on the pooled object.
 */

var P1 = React.createElementPool({
  type: Button,
  key: 'mybutton',
  props: {
    foo: null,
    children: null
  }
});
var P2 = React.createElementPool({
  type: 'span',
  props: {
    children: null
  }
});
var A2 = React.createArrayPool(2); // Number of items in the array
var t1, t1p, t1c, t2;

(
  t1 = P1(),
  t1.ref = myButtonRef,
  t1p = t1.props,
  t1p.foo = bar,
  t1p.children = A2(),
  t1c = t1p.children,
  t1c[0] = (t2 = P2(), t2.props.children = a, t2),
  t1c[1] = (t2 = P2(), t2.props.children = b, t2),
  t1
)

/**
 * NATIVE COMPONENTS
 *
 * Note that DOM nodes are no longer functions on React.DOM, instead they're
 * just strings. JSX will convert any lower-case tag name, or if it has a dash,
 * into a string value instead of a scope reference. This makes them compatible
 * with custom tags (Web Components).
 */

/**
 * TEMPLATE STRINGS
 *
 * You could create an add-on sugar which uses ES6 template strings to create
 * elements. It becomes more palatable if all your components are registered
 * through strings.
 */

X`
 <my-button foo=${bar} key="mybutton" ref=${myButtonRef}>
   <span>${a}</span>
   <span>${b}</span>
 </my-button>
`
