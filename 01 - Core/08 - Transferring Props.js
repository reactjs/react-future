import { HTML, mergeCSSProps} from "react-dom";

// Draft

class FancyButton {

  static defaultProps = {
    color: 'blue'
  };

  static claimedProps = {
    color: true,
    width: true,
    height: true
  };

  props: {
    color: string,
    width: number,
    height: number,
    transferred: typeof(HTML.button.prototype.props)
  }

  render() {
    var className = 'FancyButton';
    var style = {
      backgroundColor: this.props.color,
      padding: 10,
      width: this.props.width - 10,
      height: this.props.height - 10
    };

    var button = HTML.button(mergeCSSProps(
      this.props.transferred,
      { style, className }
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
     *   }
     * }
     */

    return button;
  }

}

class App {

  render() {
    /**
     * FancyButton.claimedProps is looked up. Every prop that is not on
     * claimedProps is moved to an inner object - intended to be transferred.
     */

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
     *   width: 100,
     *   height: 50,
     *   transferred: {
     *     className: 'test',
     *     disabled: true
     *   }
     * }
     */
 
    return <div>{fancyButton}</div>;
  }

}