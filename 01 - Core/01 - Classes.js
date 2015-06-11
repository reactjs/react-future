// The only reason we need a React depencency here is because the base class
// provides the this.setState method.
import { Component } from "react";

// We can inline a named export call.
export class Button extends Component {

  // Prop types are defined using built-in language support using a TypeScript
  // compatible syntax. Notice the subtle syntax difference between the colon
  // and the equal sign.
  props : {
    width: number
  }

  // Default properties can be defined as a static property initializer.
  // The value of each property is shallow copied onto the final props object.
  static defaultProps = {
    width: 100
  }

  // Initial state is defined using a property initializer. In this simple
  // form it behaves identical to TypeScript. You may refer to this.props
  // within this initializer to make initial state a function of props.
  state = {
    counter: Math.round(this.props.width / 10)
  }

  // Instead of relying on auto-binding magic inside React, we use a property
  // initializer with an arrow function. This effectively creates a single
  // bound method per instance - the same as auto-binding.
  handleClick = (event) => {
    event.preventDefault();
    this.setState({ counter: this.state.counter + 1 });
  }

  // Props, state and context are passed into render as a convenience to avoid
  // the need for aliasing or referring to `this`.
  render(props, state, context) {
    return (
      <div>
        This button has been clicked: {state.counter} times
        <button onClick={this.handleClick} style={{ width: props.width }} />
      </div>
    );
  }

}
