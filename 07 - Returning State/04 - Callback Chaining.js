let Foo = (props, state = { dir: 1 }, update) => {
  function *handleToggle() {
    if (props.isActive) {
      // Invert direction
      var dir = -state.dir;
      yield update({ ...state });
      yield props.onToggle(dir);
    }
    return update(state);
  };

  return <div onClick={handleToggle} />;
};

type Props = { addition ?: number };
type State = { counter : number };
export type Bar = (Props, State, Update) => Element;
export let Bar : Bar = (props, state = { counter: 0 }, update) => {

  let { addition = 1 } = props; // Default props

  let handleToggle = (value) => update({ ...state, counter: state.counter + value });

  let handleClick = () => {
    return update({ ...state, counter: state.counter + addition });
  };

  return (
    <div onClick={handleClick}>
      <Foo onToggle={handleToggle} isActive />
    </div>
  );

};

// Language trickery to get named arguments, default props and initial state
// This is so not readable.
// props : defaultProps : type definition
// state = initialProps : type definition
let Baz = ({
  props : { addition = 5 } : { addition : number },
  state = { counter : 1 } : { counter : number },
  update : Update,
  context : any
}) => {
  return <Bar addition={addition} />;
};
