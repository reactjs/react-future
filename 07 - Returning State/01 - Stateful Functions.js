interface P {
  width: number;
  onClick: function;
}

// Callbacks take props and state as their first arguments. To update state,
// they simply return the new version of the state.
function handleClick(props, state, event) {
  if (event.button === 1) {
    // Middle click resets state to zero
    return { count: 0 };
  }
  // Callbacks to external components may be fired
  if (props.onClick) {
    props.onClick();
  }
  return { count: state ? state.count + 1 : 0 };
}

// The component itself is a single function that accepts props and state as
// arguments and returns a new element. Effectively the render method.
// If callbacks are suppose to do any updates to state (or cause side-effects),
// they will need to be wrapped before passed down. Conveniently, the "this"
// argument will be a function that can be used to wrap callbacks.
// This wrapper is essentially equivalent to:
// function wrapper(fn) {
//   return function(...args) {
//     component.setState(
//       fn.call(wrapper, component.props, component.state, ...args)
//     );
//   };
// }
export function Counter(props : P, state) {
  return (
    <div>
      Clicked {state ? state.count : 0} times
      <button onClick={this(handleClick)} style={{ width: props.width }} />
    </div>
  );
}
