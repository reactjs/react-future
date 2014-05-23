import { HTML, mergeHTMLProps } from "react-dom";

// Draft

interface FancyButtonProps extends typeof HTML.button.prototype.props {
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
    var button = HTML.button(mergeHTMLProps(
      this.props,
      {
        className: 'FancyButton',
        // The linter analyses this file and notices these references to
        // props.color, props.width and props.height.
        style: {
          backgroundColor: this.props.color,
          padding: 10,
          width: this.props.width - 10,
          height: this.props.height - 10
        },
        // Any consumed property needs to be explicitly overridden so that
        // they don't accidentally leak down to the parent. Static lint warning
        // if these are forgotten.
        color: undefined,
        width: undefined,
        height: undefined
        // Unsolved issue: Since this props now have too many unknown keys, how
        // do we warn for typos?
      }
    ));

    /**
     * button.props === {
     *   className: 'FancyButton test',
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