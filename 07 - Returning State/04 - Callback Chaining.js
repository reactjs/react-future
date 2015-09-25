let Foo = (props, state = { dir: 1 }, update) => {
  let handleToggle = () => {
    if (props.isActive) {
      // Invert direction
      var dir = -state.dir;
      return [
        // Update state
        update({ dir }),
        // Let the owner know about the change, and return its new state
        props.onToggle(dir)
        // TODO: No way to get new props as a result of props potentially
        // changing as a result of this callback.
      ];
    }
    return null;
  };

  return <div onClick={handleToggle} />;
};

type Props = { addition ?: number };
type State = { counter : number };
export type Bar = (Props, State, Updator) => Element;
export let Bar : Bar = (props, state = { counter: 0 }, update) => {

  let { addition = 1 } = props; // Default props

  let handleToggle = (value) => update({ counter: state.counter + value });

  let handleClick = () => {
    return update({ counter: state.counter + addition });
  };

  return (
    <div onClick={handleClick}>
      <Foo onToggle={handleToggle} isActive />
    </div>
  );

};

// Language trickery to get named arguments, default props and initial state
// This is so not readable.
let Baz = ({
  // props : defaultProps : type definition
  props : { addition = 5 } : { addition : number },
  // state = initialProps : type definition
  state = { counter } : { counter : number },
  update : Updator,
  context : any
}) => {
  return <Bar addition={addition} />;
};
