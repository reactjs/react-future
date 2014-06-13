import { mixin } from "react-utils";

// Chainable mixins

const A = {

  componentDidMount() {
    super(); // This will end up calling an empty function, placed by mixin()
    console.log('A');
  }

};

class B {

  static getQueries() {
    super(); // This will end up calling an empty function, placed by mixin()
    console.log('B')
  }

  componentDidMount() {
    console.log('B');
    super(); // This will end up calling A.componentDidMount
  }

}

class C extends mixin(A, B) {

  static getQueries() {
    super(); // This calls B.getQueries
    console.log('C');
  }

  componentDidMount() {
    super(); // This calls B.prototype.componentDidMount
    console.log('C');
  }

}

C.getQueries(); // B, C
new C().componentDidMount(); // B, A, C


import { Component } from "react";

// A component that mixes in all of C's functionality

class Component extends mixin(Component, C) {
  render() {
    return <div />;
  }
}

// Solvable but confusing/complex issues:

export class C extends mixin(A, B) {

  // This state intializer overrides the state initializer in the base class.
  // The current React class system merges the two.
  state = {
    b: true
  }

  componentDidMount() {
    // You forgot to put a super call here but there's no runtime warning since
    // the mixin logic happens before this class is created.
  }

}
