// The module pattern is similar to stateful functions. Except, instead of
// exporting a single function, it exports multiple functions that can be used
// to implement a component. The render function is required.

interface P {
  width: number;
  onClick: function;
}

function handleClick(props, state, event) {
  if (event.button === 1) {
    return { count: 0 };
  }
  if (props.onClick) {
    props.onClick();
  }
  return { count: state ? state.count + 1 : 0 };
}

export function componentDidMount(props, state) {
  console.log('mounted');
}

export function render(props : P, state) {
  return (
    <div>
      Clicked {state ? state.count : 0} times
      <button onClick={this(handleClick)} style={{ width: props.width }} />
    </div>
  );
}
