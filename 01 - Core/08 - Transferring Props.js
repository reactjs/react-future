import { HTML as JSX } from "react-dom";

// Draft

interface FancyButtonProps extends typeof JSX.button.prototype.props {
    color: string,
    width: number,
    height: number
}

class FancyButton {

  static defaultProps = {
    color: 'blue'
  };

  props: FancyButtonProps; // Could this interface be inlined?

  render() {
    // The linter analyses this file and notices these references to
    // props.color, props.width and props.height.

    // Any consumed property needs to be explicitly overridden so that
    // they don't accidentally leak down to the parent. We can issue a static
    // lint warning if these are forgotten. Hence the weird undefined props
    // below. Unsolved issue: Since this props now have too many unknown keys,
    // how do we warn for typos?

    var button =
      <button
        {...this.props}
        className+=" FancyButton"
        style={{
          ...this.props.style,
          backgroundColor: this.props.color,
          padding: 10,
          width: this.props.width - 10,
          height: this.props.height - 10
        }}
        color={undefined}
        width={undefined}
        height={undefined}
      />;

    /**
     * The spread operator and += in JSX desugars to:
     *
     * HTML.button(Object.assign(
     *   {},
     *   this.props,
     *   {
     *     className: this.props.className + ' FancyButton',
     *     style: Object.assign({}, this.props.style, {
     *       backgroundColor: this.props.color,
     *       padding: 10,
     *       width: this.props.width - 10,
     *       height: this.props.height - 10
     *     }),
     *     color: undefined,
     *     width: undefined,
     *     height: undefined
     *   }
     * ));
    */

    /**
     * button.props === {
     *   className: 'test FancyButton',
     *   disabled: true,
     *   style: {
     *     backgroundColor: 'blue',
     *     padding: 10,
     *     width: 90,
     *     height: 40
     *   },
     *   color: undefined,
     *   width: undefined,
     *   height: undefined
     * }
     */

    return button;
  }

}

class App {

  render() {
    var fancyButton =
      <FancyButton
        className="test"
        disabled={true}
        width={100}
        height={50}
      />;

    /**
     * fancyButton.props === {
     *   color: 'blue',
     *   className: 'test',
     *   disabled: true,
     *   width: 100,
     *   height: 50
     * }
     */
 
    return <div>{fancyButton}</div>;
  }

}