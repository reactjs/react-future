/**
 * This is an experimental prototype of an integrated React layout algorithm
 * defined in terms of Effects implemented as ECMAScript generators.
 *
 * There are two types of "Effects":
 *
 * - Component (function): When this Effect is yielded, the component is
 *   rendered as deep as necessary until an Object Effect is yielded. The value
 *   of the yielded effect is an object passed to the continuation.
 *
 * - Object (any): When an Object is raised, the rendering is interrupted.
 *   The yielded object is passed into the continuation of the Component effect,
 *   along with a continuation to keep rendering the rest of the component. When
 *   the continuation is rendered, the object passed to the continuation is
 *   passed back to the raised Component Effect.
 *
 * Combining these two effects seems to be sufficient to implement the layout
 * algorithms that we want to support.
 *
 * In this particular example algorithm, the width/height of a layout component
 * is the yielded Object. The continuation value is the top/left offset of the
 * layout component after it has been placed.
 *
 * TODO: Expand the Effects to other types and let them bubble (e.g. context).
 */

"use strict";

/* React */

function $(fn, ...args) {
  return fn.bind(null, ...args);
}

/* App */

function* Box(props) {
  const position = yield {
    width: props.width,
    height: props.height
  };
  const node = document.createElement('span');
  node.style.background = props.background;
  node.style.width = props.width + 'px';
  node.style.height = props.height + 'px';
  node.style.top = position.top + 'px';
  node.style.left = position.left + 'px';
  node.textContent = props.text || '';
  return node;
}

function Intl(props) {
  // TODO: Provide context
  return props.child;
}

function IntlNumber(number) {
  // TODO: Read context
  return $(Text, '' + number);
}

function* Horizontal(...children) {
  const continuations = [];
  let x = 0;
  let y = 0;
  for (let child of children) {
    const o = yield child;
    const size = o.value;
    const continuation = o.continuation;
    continuations.push({
      continuation: continuation,
      left: x
    });
    x += size.width;
    y = size.height > y ? size.height : y;
  }
  const offset = yield {
    width: x,
    height: y
  };
  return continuations.map(child => $(child.continuation, {
    top: offset.top,
    left: offset.left + child.left
  }));
}

function* Vertical(...children) {
  const continuations = [];
  let x = 0;
  let y = 0;
  for (let child of children) {
    const o = yield child;
    const size = o.value;
    const continuation = o.continuation;
    continuations.push({
      continuation: continuation,
      top: y
    });
    x = size.width > x ? size.width : x;
    y += size.height;
  }
  const offset = yield {
    width: x,
    height: y
  };
  return continuations.map(child => $(child.continuation, {
    top: offset.top + child.top,
    left: offset.left
  }));
}

function Text(content) {
  return $(Box, {
    width: content.length * 10,
    height: 20,
    text: content
  });
}

function Awesomeness() {
  return $(Horizontal,
    $(Text, 'Awesomeness Index:'),
    $(IntlNumber, 123.45)
  );
}

function* Body(child) {
  var o = yield child;
  return $(o.continuation, {
    top: 10,
    left: 10
  });
}

function App() {
  return $(Body,
    $(Vertical,
      $(Horizontal, $(Text, 'Hello'), $(Text, 'World!')),
      $(Intl, {
        locale: 'en-US',
        child: $(Awesomeness)
      })
    )
  );
}

/* React DOM */

function resolveChild(child) {
  const element = child();
  if (typeof element === 'function') {
    return resolveChild(element, container);
  } else if (Array.isArray(element)) {
    throw new Error('Arrays not valid here. Cannot resolve multiple results here.');
  } else if (element[Symbol.iterator]) {
    const iterator = element[Symbol.iterator]();
    let rec = iterator.next();
    while (!rec.done) {
      if (typeof rec.value === 'function') {
        const resolvedResult = resolveChild(rec.value);
        rec = iterator.next(resolvedResult);
      } else {
        break;
      }
    }
    // TODO: If it is a child, it needs to be resolved.
    return {
      value: rec.value,
      continuation: function(props) {
        // TODO: If this is a child, it needs to be resolved.
        return iterator.next(props).value;
      }
    };
  } else {
    throw new Error('Unhandled branch');
  }
}

function render(element, container) {
  if (typeof element === 'function') {
    render(element(), container);
  } else if (Array.isArray(element)) {
    element.forEach(child => render(child, container));
  } else if (element[Symbol.iterator]) {
    const iterator = element[Symbol.iterator]();
    let rec = iterator.next();
    while (!rec.done) {
      if (typeof rec.value === 'function') {
        const resolvedResult = resolveChild(rec.value);
        rec = iterator.next(resolvedResult);
      } else {
        rec = iterator.next();
      }
    }
    const child = rec.value;
    render(child, container);
  } else if (element.nodeType) {
    container.appendChild(element);
  }
}

/* Initialization */

render($(App), document.getElementById('container'));
