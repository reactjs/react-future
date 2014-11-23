// This is a refs proposal that uses callbacks instead of strings. The callback
// can be easily statically typed and solves most use cases.

// When a ref is attached, it gets passed the instance as the first argument.
// When a ref is detached, the callback is invoked with null as the argument.

// refs on DOM nodes gives the DOM node handle directly, not an intermediate
// form.

class Foo {

  myDivRef : ?HTMLDivElement;

  handleTick() {
    this.setState({ width: this.myDivRef.offsetWidth });
  }

  render() {
    return (
      <C tick={this.handleTick}>
        <div ref={node => this.myDivRef = node} />
        <CustomComponent context={() => this.myDivRef} />
      </C>
    );
  }

}

// It's possible to distinguish whether a ref as ever been mounted or if it has
// been mounted during this particular reconciliation phase.

class Component {
 
  buttonWasEverMounted : boolean;
  buttonWasMountedThisPass : boolean;
  button : ?Button;
 
  mountButtonRef = button => {
    if (button) {
      this.buttonWasEverMounted = true;
      this.buttonWasMountedThisPass = true;
    }
    this.button = button;
  }
 
  componentWillMount() {
    this.componentWillUpdate();
  }

  componentDidMount() {
    this.componentDidUpdate();
  }
 
  componentWillUpdate() {
    this.buttonWasMountedThisPass = false;
  }

  componentDidUpdate() {
    if (this.buttonWasEverMounted) {
      console.log('button was mounted at least once');
    }
    if (this.buttonWasMountedThisPass) {
      console.log('button was mounted during this render pass');
    }
  }
 
  render() {
    return <Button ref={this.mountButtonRef} />;
  }
  
}

// In a future world where every callback is also implemented as an Observer,
// we can pass a subject to the ref to build Observable compositions on top
// of a ref.

class Foo {

  myTick = new Rx.Subject();
  myDiv = new Rx.Subject();

  observe() {
    var widths = this.myDiv.map(myDivRef => myDivRef.offsetWidth);
    return {
      width: this.myTick.combineLatest(widths, (e, width) => width)
    };
  }

  render() {
    return (
      <C tick={this.myTick}>
        <div ref={this.myDiv} />
        <CustomComponent context={this.myDiv} />
      </C>
    );
  }

}

// Getting your "own" DOM node is still possible with a call to traverse the
// composites until you get to the DOM node.

class Foo {

  handleTick() {
    var node = React.findDOMNode(this);
    this.setState({ width: node.offsetWidth });
  }

  render() {
    return (
      <C tick={this.handleTick}>
        <div />
      </C>
    );
  }

}
