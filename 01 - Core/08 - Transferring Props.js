import { HTMLPropTypes, joinClasses } from "react-dom";

// Draft

class FancyButton {

  static defaultProps = {
    color: 'blue'
  };

  props: {
    color: string,
    width: number,
    height: number,
    ...HTMLPropTypes
  },

  // This uses rest and spread operators
  // https://gist.github.com/sebmarkbage/aa849c7973cb4452c547

  render({ color, className, style, width, height, ...other }) {
    // The rest operator picks off the remaining props that you're not using.
    // The linter analyses this method and notices the JSX spread attribute.
    // Therefore it warns you not to use this.props.propertyName and instead
    // ask you to use destructuring with a rest property.

    var button =
      <button
        {...other}
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


// Vanilla JS:
// While rest and spread operators are being waited on (https://gist.github.com/sebmarkbage/aa849c7973cb4452c547) 
// And while we wait on shims, simple helper methods and array destructuring can be used:

class FancyButton {

  static defaultProps = {
    color: 'blue'
  };

  props: {
    color: string,
    width: number,
    height: number,
    ...HTMLPropTypes
  },

  // This uses rest and spread operators
  // https://gist.github.com/sebmarkbage/aa849c7973cb4452c547

  render(props, state) {
    
    var [{color}, {className}, {style}, {width}, {height}, ...other] = arryFromProps(props);

    var button = React.DOM.button(
      propsFromArray([
        ...other,
        ['className', joinClasses(className, 'FancyButton')],
        ['padding', 10],
        ['width', width - 10],
        ['height', height - 10]
      ])
    );

    return button;
  }

}

// further a mixin could be used to do arrayFromProps automatically.

// Implementations of Helper Methods.
function arrayFromProps(props){
  var array = [];
  // this uses the for-of loop, but it could easily be implemented otherwise.
  for ([key, value] of props) {
    array.push([key, value]);
  }
  return array;
}

function propsFromArray(array){
  return array.reduce((obj, prop) => {
    obj[prop[0]] = obj[1];
  }, {})
}
