// Any layout system must render to some primitives. For the purpose of
// simplified examples, we introduce three primitive concepts that layout
// components can resolve to. For familiarity we use absolutely positioned divs.
// However, it could resolve to SVG, ART, or any other kind of graphics
// primitives.

// Arbitrary wrapper (since we don't currently support fragments)
class Fragment {
  render() {
    return <div>{this.props.children}</div>;
  }
}

// Position its content with an offset of `x` and `y`
class Positioner {
  render(props) {
    var { x, y, children } = props;
    return (
      <div style={{ position: 'absolute', left: x, top: y }}>
        {children}
      </div>
    );
  }
}

// Paint a box with size `width` and `height`
class Box {
  render(props) {
    var { width, height } = props;
    return (
      <div style={{ width: width, height: height, background: '#f00' }}>
        {children}
      </div>
    );
  }
}
