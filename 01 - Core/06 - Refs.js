
class Foo {

  // A ref is declared
  myDivRef = React.createRef();

  // Promise API for refs
  handleTick() {
    this.myDivRef.then(myDivNode => {
      this.setState({ width: myDivNode.offsetWidth });
    });
  }

  // Alternative syntax using future ES7 async/await syntax
  async handleTick() {
    this.setState({ width: (await this.myDivRef).offsetWidth });
  }

  render() {
    return (
      <C tick={this.handleTick}>
        <div ref={this.myDivRef} />
        <CustomComponent context={this.myDivRef} />
      </C>
    );
  }

}

class Foo {
  refs = new React.RefMap();

  handleTick() {
    this.refs.get('myDiv').then(myDivNode => {
      this.setState({ width: myDivNode.offsetWidth });
    });
  }

  render() {
    return (
      <C tick={this.handleTick}>
        <div ref={this.refs.get('myDiv')} />
        <CustomComponent context={this.refs.get('myDiv')} />
      </C>
    );
  }
}

// We also probably need to provide a synchronous API as an upgrade path:

  handleTick() {
    var myDivNode = this.myDivRef.doExpensiveWorkRightNowAndLetMeHaveMyNodeNow();
    this.setState({ width: myDivNode.offsetWidth });
  }

  handleTick() {
    this.refs.get('myDiv').then(myDivNode => {
      this.setState({ width: myDivNode.offsetWidth });
    }, error => {
      this.setState({ width: 0 });
    });
  }


// An alternative idea... Make descriptors into ref-promises.

  render() {
    var foo = <Foo />;
    return <div onClick={() => foo.then(inst => inst.doX())}>{foo}</div>;
  }

// This also provides a nice reset functionality if the ref is ever swapped out.

  handleClick() {
    this.foo.then(inst => inst.doX());
  }

  render() {
    this.foo = <Foo />; // ugh side-effect in render (puke)
    return <div onClick={this.handleClick}>{this.foo}</div>;
  }

// This also works nice with multiple owners.
