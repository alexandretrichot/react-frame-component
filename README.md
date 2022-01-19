# ts-react-frame-component

> This project is a rewrite of [react-frame-component](https://github.com/ryanseddon/react-frame-component) from Ryan Seddon.

[![NPM version][npm-image]][npm-url]

This component allows you to encapsulate your entire React application or per component in an iFrame.

```bash
yarn add ts-react-frame-component

# or with npm
npm i ts-react-frame-component
```

## How to use:

```ts
import Frame from 'ts-react-frame-component';

ReactDOM.render(<Frame>Hello</Frame>, document.body);
```

### Props:

#### head
`head: ReactNodeLike`

The `head` prop is a dom node that gets inserted before the children of the frame. Note that this is injected into the body of frame (see the blog post for why). This has the benefit of being able to update and works for stylesheets.

#### html
`html: string`

Defaults to `'<!DOCTYPE html><html><head></head><body><div></div></body></html>'`

The `html` props is the initial html injected into frame. It is only injected once, but allows you to insert any html into the frame (e.g. a head tag, script tags, etc). Note that it does *not* update if you change the prop. Also at least one div is required in the body of the html, which we use to render the react dom into.

#### mountTarget
`mountTarget:  string`

The `mountTarget` props is a css selector (#target/.target) that specifies where in the `html` of the iframe, children will be mounted.

```html
<Frame
  html='<!DOCTYPE html><html><head></head><body><h1>i wont be changed</h1><div id="mountHere"></div></body></html>'
  mountTarget='#mountHere'
  >
</Frame>
```

#### ref
`ref: React.LegacyRef<HTMLIFrameElement>)`

The `ref` prop provides a way to access inner iframe DOM node. To utilitize this prop use, for example, one of the React's built-in methods to create a ref: [`React.createRef()`](https://reactjs.org/docs/refs-and-the-dom.html#creating-refs) or [`React.useRef()`](https://reactjs.org/docs/hooks-reference.html#useref).

```ts
const MyComponent: React.FC = (props) => {
  const iframeRef = React.useRef();

  React.useEffect(() => {
    // Use iframeRef for:
    // - focus managing
    // - triggering imperative animations
    // - integrating with third-party DOM libraries
    iframeRef.current.focus()
  }, [])

  return (
    <Frame ref={iframeRef}>
      <InnerComponent />
    </Frame>
  );
}
```

### Accessing the iframe's window and document
The iframe's `window` and `document` may be accessed via the `FrameContextConsumer` or the `useFrame` hook.

The example with `FrameContextConsumer`:

```js
import Frame, { FrameContextConsumer } from 'react-frame-component'

const MyComponent = (props, context) => (
  <Frame>
    <FrameContextConsumer>
      {
        // Callback is invoked with iframe's window and document instances
        ({document, window}) => {
          // Render Children
        }
      }
    </FrameContextConsumer>
  </Frame>
);

```

The example with `useFrame` hook:

```ts
import Frame, { useFrame } from 'react-frame-component';

const InnerComponent = () => {
  // Hook returns iframe's window and document instances from Frame context
  const { document, window } = useFrame();

  return null;
};

const OuterComponent = () => (
  <Frame>
    <InnerComponent />
  </Frame>
);
```

## License

Copyright 2022, Alexandre TRICHOT.

Based on work of Ryan Seddon. View orginal on [GitHub](https://github.com/ryanseddon/react-frame-component).

This content is released under the MIT license.

[npm-url]: https://npmjs.org/package/ts-react-frame-component
[npm-image]: https://badge.fury.io/js/ts-react-frame-component.png
