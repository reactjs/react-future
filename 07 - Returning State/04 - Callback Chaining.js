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

let Bar = (props, state = { counter: 0 }, update) => {

  let handleToggle = (value) => update({ counter: state.counter + value });

  let handleClick = () => {
    return update({ counter: state.counter + 1 });
  };

  return (
    <div onClick={handleClick}>
      <Foo onToggle={handleToggle} isActive />
    </div>
  );

};

