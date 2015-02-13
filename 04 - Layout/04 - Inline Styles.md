This proposal shares most of the styling and layout attributes as CSS. But we've decided to use JavaScript instead of CSS to define styles.

#### No Selectors

The main difference is that this proposal doesn't support selectors. This feature has proven to make writing large scale applications very hard.

#### Easier to bundle

Because they are not using the same technology, the way we load and bundle JS and CSS is different. We occasionally end up with cases where the JS loads faster than CSS and you can see really broken un-styled experience for some time.

#### Ability to share constants

It makes it extremely hard to share constants. You've got to rely on comments saying to keep to sets of values in sync, which usually doesn't happen and causes issues. Using only Javascript solves this problem.

#### Private by default

It's near impossible to remove rules from CSS as it's very hard to guarantee that your rule is no longer being used or won't break unrelated things. By having rules private to the file by default and specified to nodes, this problem will be a thing of the past.

#### One less file to create

It's a pain for the developer to have to create 2 files for every single component. In this proposal, we collocate the styles at the bottom of the file.


## Declaring Styles

The way to declare styles is the following

```javascript
var styles = StyleSheet.create({
  base: {
    width: 38,
    height: 38
  },
  background: {
    backgroundColor: '#222222'
  },
  active: {
    borderWidth: 2,
    borderColor: '#00ff00'
  }
});
```

## Using Styles

All the core components accept a style attribute

```javascript
<span style={styles.base} />
<div style={styles.background} />
```

which also accepts an array of styles

```javascript
<div style={[styles.base, styles.background]} />
```

A common pattern is to conditionally add a style based on some condition. The style attribute will ignore `false`, `undefined` and `null` entries.

```javascript
<div style={[styles.base, this.state.active && styles.active]} />
```

Finally, if you really have to, you can also use inline styles, but they are highly discouraged. Put them last in the array definition.

```javascript
<div
  style={[styles.base, {
    width: this.state.width,
    height: this.state.width * this.state.aspectRatio
  }]}
/>
```

## Pass Styles Around

In order to let a call site customize the style of your component children, you can pass styles around. Use `StylePropType` in order to make sure only styles are being passed.

```javascript
var List = React.createClass({
  propTypes: {
    elementStyle: StylePropType
  },
  render: function() {
    return <div {...this.props}>
      {elements.map((element) =>
        <div style={[styles.element, this.props.elementStyle]} />
      )}
    </div>;
  }
});

<List style={styles.list} elementStyle={styles.element} />
```
