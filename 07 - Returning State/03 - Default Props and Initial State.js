/**  Stateful Functions **/

// Default props and state may be implemented as default values in arguments
// or destructuring assignment. The downside is that you have to replicate the
// same defaults in all callback functions.

function handleClick({ onClick = console.log }, { count = 0 }, event) {
  if (event.button === 1) {
    return { count: 0 };
  }
  onClick();
  return { count: count + 1 };
}

export function Counter({ width = 100 }, state = { count: 0 }) {
  return (
    <div>
      Clicked {state.count} times
      <button onClick={this(handleClick)} style={{ width }} />
    </div>
  );
}

/** Module Pattern **/

// Using the module pattern, we can expose the same methods as 

export const defaultProps = { onClick: console.log, width: 100 };

export const getInitialState = (props) => ({ count: 0 });

function handleClick(props, state, event) {
  if (event.button === 2) {
    return { count: 0 };
  }
  props.onClick();
  return { count: state.count + 1 };
}

export function render(props, state) {
  return (
    <div>
      Clicked {state.count} times
      <button onClick={this(handleClick)} style={{ width: props.width }} />
    </div>
  );
}
