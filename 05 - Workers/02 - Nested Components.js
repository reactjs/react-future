// In the previous section we showed that it's not possible to pass same-thread
// components inside cross-thread components. How can we create composability
// and not just render the entire tree on the "other" thread?

import SameThreadComponent from "Foo"; // React Class
const CrossThreadComponent = "Bar"; // Just a String identfiier
const AnotherCrossThreadComponent = "Baz";

// By prerendering the same-thread components we can pass their opaque result
// into a cross-thread element. The component on the other side cannot reason
// about the content of the cross-thread element but it can render it anywhere
// in its own tree. That means that the pre-rendered child can directly
// manipulate its content without first asking the parent on the other thread.

// This implementation detail can be hidden in a wrapper.

class CrossThreadComponentWrapper {
  preRender() {
    return this.props.children;
  }
  render() {
    return (
      <CrossThreadComponent {...this.props}>
        {this.prerendered}
      </CrossThreadComponent>
    );
  }
}

// Now it's safe to use same-thread components as children of the cross-thread
// component.

class App {
  render() {
    return (
      <CrossThreadComponentWrapper prop="bar" callback={data => log(data)}>
        <SameThreadComponent prop="foo" />
      </CrossThreadComponentWrapper>
    );
  }
}
