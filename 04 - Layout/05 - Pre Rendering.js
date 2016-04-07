import React, { Component } from 'react';
import ReactDOM from 'react-dom';

let preRenderCache = new WeakMap(); // Could be state instead?
let measure = document.createElement('div');

export default class WithSize extends Component {
    componentDidMount () {
        // If we don't have the item in cache yet, render it.
        if (!preRenderCache.has(this.props.data)) {
            // Append a temporary node to the dom to measure it.
            document.body.appendChild(this.measure);

            // Render the child and append it to the node.
            let child = this.props.children();
            let rendered = ReactDOM.render(child, this.measure);

            // Take the measurement and remove the temporary node from the dom.
            let {clientWidth, clientHeight} = rendered;
            document.body.removeChild(this.measure);

            // Process layout using the prop function, and force render.
            let processedLayoutInfo = this.props.processLayout(this.props.data, clientWidth, clientHeight);
            preRenderCache.set(this.props.data, this.props.children(processedLayoutInfo));
            this.forceUpdate();
        }
    }

    render () {
        let renderedItem = preRenderCache.get(this.props.data);
        if (renderedItem) {
            return renderedItem;
        }

        // Return nothing until we're ready to render.
        return null;
    }
}

WithSize.propTypes = {
    children: React.PropTypes.func,
    data: React.PropTypes.object,
    processLayout: React.PropTypes.func,
};


// Usage looks like: 
class DynamicList extends Component {
    processLayout(width, height) {
        return {
            top, left, bottom, right
        };
    }

    render () {
        return (
            <div>
                {this.props.items.map((item, idx) =>
                    <WithSize data={item} key={idx} processLayout={this.processLayout.bind(this)}>
                    {
                        (position={left: 0, top: 0}) => <div style={{top: position.top, left: position.left}}>...</div>
                    }
                    </WithSize>
                )}
            </div>
        );
    }
}
