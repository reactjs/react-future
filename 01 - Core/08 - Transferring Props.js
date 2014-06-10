import { HTML as JSX, joinClasses } from "react-dom";

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
    // This uses rest and spread operators
    // https://gist.github.com/sebmarkbage/aa849c7973cb4452c547

    // The rest operator picks off the remaining props that you're not using.
    // The linter analyses this method and notices the JSX spread attribute.
    // Therefore it warns you not to use this.props.propertyName and instead
    // ask you to use destructuring with a rest property.

    var { color, className, style, width, height, ...miscProps } = this.props;

    var button =
      <button
        {...miscProps}
        className={joinClasses(className, 'FancyButton')}
        style={{ ...style,
          backgroundColor: color,
          padding: 10,
          width: width - 10,
          height: height - 10
        }}
      />;

    /**
     * button.props === {
     *   className: 'test FancyButton',
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