// Layout System Example Components

// The Vertical List can layout items in vertically based on their dynamic
// height. It also provides its own total height so that it can be used as
// an item within itself.

class VerticalList {
  getChildContext() {
    return {
      layoutWidth: this.props.width || this.context.layoutWidth
    };
  }

  // NEW FEATURE: Pre-render a subtree before continuing with the normal render.
  preRender() {
    // Children that needs to be prerendered. If some children needs to be
    // prerendered, but not others (e.g. for flexbox layouts), then they're
    // filtered, here and the rest is rendered inside render.
    return this.props.children;
  }

  render() {
    var children = this.prerendered;
    var positionedChildren = [];
    var y = 0;
    for (var i = 0; i < children.length; i++) {
      // This child is an opaque black box whose props cannot be inspected,
      // nor cloned. It can only be rendered once. Rendering it twice results
      // in a conflict, at least until we support painting the same stateful
      // component in many different places (e.g. SVG's <use />)
      var child = children[i];
      positionedChildren.push(
        <Positioner key={child.key} x={0} y={y}>{child}</Positioner>
      );
      // We can use it to inspect the child's reverse context though.
      y += child.result.layoutHeight;
    }
    return <Fragment>{positionedChildren}</Fragment>;
  }

  // NEW FEATURE: When a component itself is is prerendered, it can bubble a
  // result back up the tree.
  getResult() {
    // We already had this height calculated in render, but to allow for render
    // to be deferred, and to preserve the standard render() API, we have to
    // recalculate it here. This is helpful in the cases where a parent decides
    // not to render this child. That way we can avoid calling render.
    var totalHeight = 0;
    var children = this.prerendered;
    for (var i = 0; i < children.length; i++) {
      totalHeight += children[i].result.layoutHeight;
    }
    return {
      layoutHeight: totalHeight
    };
  }
}

class VerticalListItem {
  render() {
    return (
      <Box width={this.context.layoutWidth} height={this.props.height}>
        {this.props.children}
      </Box>
    );
  }
  getResult() {
    return {
      layoutHeight: this.props.height
    };
  }
}
