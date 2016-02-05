import type { Effect, Element, Component } from 'react';
import sleep from 'then-sleep';

const initialState = {
  cancelMove() {},
  stops: 0,
  x: 0,
  y: 0
};

type StopEvent = {
  lastPosition: [number, number]
};

type PropTypes = {
  onStop: StopEvent => Effect
};

const Foo : Component<PropTypes> = ({ props, state = initialState, update, dispatch }) => {

  function * move(event, cancel) {
    yield state.cancelMove();

    yield update({
      ...state,
      cancelMove: cancel,
      x: event.x,
      y: event.y
    });

    yield sleep(500);

    yield dispatch({
      action: 'STOPPED_MOVING'
    });
    yield update({
      ...state,
      stops: state.stops + 1
    });
    yield props.onStop({
      lastPosition: [state.x, state.y]
    }, cancel);
  }

  function leave(event) {
    return state.cancelMove();
  }

  return (
    <div
      onMouseMove={move}
      onMouseLeave={leave}>
      Stopped moving {state.stops} times.
    </div>
  );

}

Foo.defaultProps = {
  onStop() {}
};

export default Foo;
