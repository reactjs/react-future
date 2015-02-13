// Declarative React Component

export default let FancyButton = {

  // getInitialState
  initialize(props) {
    return {
      count: Math.round(props.width / 10),
      name: null
    };
  },

  // downwards render output
  render(props, state) {
    return (
      <div>
        {state.name || 'Loading name...'}
        Clicked {state ? state.count : 0} times
        <button signal="button" style={{ width: props.width }} />
      </div>
    );
  },

  // subscribe to third party data asynchronously
  observe(props, state) {
    return {
      data: request(props.uri)
    };
  },

  // reduce whenever a signal fires into new state
  reduce(props, state, signals) {
    let data = signals.data || state.data;
    let click = signals.button.click;
    if (click) {
      if (click.button === 1) {
        return { count: 0, name: data };
      }
      return { count: state.count + 1, name: data };
    }
    return state;
  },

  // upwards signals back to the owner (events)
  output(props, state, signals) {
    return {
      name: state.name,
      click: signals.button.click
    };
  }

};
