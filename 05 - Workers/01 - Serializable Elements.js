// It could be possible to run React Components in a separate worker that then
// communicates with a React component in another worker.

import SameThreadComponent from "Foo"; // React class
const CrossThreadComponent = "Bar"; // Just a string module ID
const AnotherCrossThreadComponent = "Baz"; // Another string module ID

// The props of a cross-thread element must be serializable across the worker
// boundary. Functions are treated as asynchronous callbacks with serializable
// arguments.

class App {
  render() {
    return (
      <SameThreadComponent prop="foo">
        <CrossThreadComponent prop="bar" callback={data => log(data)}>
          <AnotherCrossThreadComponent some={{ prop: 'baz' }} />
        </CrossThreadComponent>
      </SameThreadComponent>
    );
  }
}

// The ReactComponent is instantiated on the other side of the worker and
// rendered top-down using the normal React reconciliation. State may live on
// the other side of the worker boundary.

// Normally, it is illegal to nest same-thread components inside a cross-thread
// component:

class CounterExample {
  render() {
    return (
      <CrossThreadComponent prop="bar" callback={data => log(data)}>
        {/* Illegal */}<SameThreadComponent prop="foo" />{/* Don't do this */}
      </CrossThreadComponent>
    );
  }
}

// This doesn't work because a React parent component is responsible for
// resolving its children. The CrossThreadComponent would have to block
// rendering to come back to this thread to ask the SameThreadComponent to
// resolve itself. This defeats the purpose of asynchronously resolving these.
// However, luckily we have a solution around that using prerendering which
// we'll cover in the next chapter.
