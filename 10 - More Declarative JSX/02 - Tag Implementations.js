

// I previously claimed that the implementation of "push", "iff", and "foreach" were trivial.
// We don't need to provide default implementations, but we should allow for them to exist.
// Here are my implementations, exact syntax of which is to be determined, but you get the idea

class push {
  render: function() {
    return this.context.push(this.props.name, this.props.value, this.children);
  }
}

class iff {
  render: function() {
    return this.props.test === true ? this.props.children : null;
  }
}

class foreach {
  render: function() {
    this.props.collection.map(function(element, index) {
      return (
        <push name={this.props.element} value={element}>
          <push name={this.props.index} value={index}>
            {this.props.children}
          </push>
        </push>
      );
    });
  }
}

// Alternate syntaxes might look less like "traditional jsx" but could allow additional performance
// benefits (like short-circuit evaluation for children that will never render).

