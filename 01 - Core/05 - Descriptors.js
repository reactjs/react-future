/**
 * DESCRIPTOR OBJECT LITERAL
 *
 * A React component module will no longer export a helper function to create
 * descriptors. Instead it's the responsibility of the consumer to efficiently
 * create the descriptors.
 * 
 * Languages that compile to JS can choose to implement the descriptor signature
 * in whatever way is idiomatic for that language:
 */

{
  type: Button,
  props: {
    ...Button.defaultProps, // optional
    foo: 'bar',
    children: [
      { type: 'span', props: { children: a } },
      { type: 'span', props: { children: b } }
    ]
  },

  // optional
  key: 'mybutton',
  ref: myButtonRef,

  // optional
  owner: React.currentOwner,
  context: React.currentContext
}

/**
 * JSX
 */

<Button foo="bar" key="mybutton" ref={myButtonRef}>
 <span>{a}</span>
 <span>{b}</span>
</Button>

/**
 * PLAIN JS
 *
 * This helper function ensures that your static children don't get the key
 * warning. It creates a descriptor for you with the current owner/context.
 * The props object is cloned and key/ref moved onto the descriptor.
 */

var C = React.createDescriptor;

C({ type: Button, foo: 'bar', key: 'mybutton', ref: myButtonRef },
  C({ type: 'span' }, a),
  C({ type: 'span' }, b)
)

/**
 * If you use JSX or statically can analyze that the C(...) call belongs to
 * React, then you can chose to opt-in to one of the optimizations modes.
 */

/**
 * FAST MODE
 *
 * Fast mode allocates a props object inline instead of cloning a temporary
 * object. type, key and ref are separate arguments. Default props gets merged
 * in by mutating the props object. If they can be statically inferred, they
 * could also be inlined instead. This should not be typed in user code.
 */

var F = React.createDescriptorFast;

F(Button, 'mybutton', myButtonRef, { foo: 'bar', children: [
  F('span', null, null, a),
  F('span', null, null, b)
]})

/**
 * POOLED MODE
 *
 * Pooled mode doesn't allocate any new objects. Instead it gets mutable objects
 * from an pool and reuses them. It overrides the props on the pooled object.
 */

var P = React.getPooledDescriptor;
var A = React.getPooledArray;
var t1, t2;

(t1 = P(Button, 'mybutton', myButtonRef), t1.props.foo = 'bar', t1.props.children = A(
  (t2 = P('span'), t2.props.children = a, t2),
  (t2 = P('span'), t2.props.children = b, t2)
), t1)

/**
 * NATIVE COMPONENTS
 *
 * Note that DOM nodes are no longer functions on React.DOM, instead they're
 * just strings. JSX will convert any lower-case tag name, or if it has a dash,
 * into a string value instead of a scope reference. This makes them compatible
 * with custom tags (Web Components).
 *
 * There's no direct dependency between a component and the React runtime.
 *
 * A tree of just native components should be JSON serializable.
 */

/**
 * TEMPLATE STRINGS
 *
 * You could create an add-on sugar which uses ES6 template strings to create
 * descriptors. It becomes more palatable if all your components are registered
 * through strings.
 */

X`
 <my-button foo="bar" key="mybutton" ref=${myButtonRef}>
   <span>${a}</span>
   <span>${b}</span>
 </my-button>
`
