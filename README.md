# hook-component

> Use react hooks in class components via render props

[![NPM](https://img.shields.io/npm/v/hook-component.svg)](https://www.npmjs.com/package/hook-component)

## Why?

I have a recent project thats mostly using functional components, but there are a few classes here and there, and I want to create new hooks only APIs. With this I can use them in the few class components as well. I just wanted to put it out there to see if it makes sense.

## Is this a good idea?

Not sure honestly. You tell me. It works decently well, and it's extremely \~\~declarative\~\~. If you're not a fan of micro dependencies, you can just use this simplified snippet instead:

```jsx
const Hook = ({ hook, args, children }) => children(hook(...args));
```

The module provides a little bit of TypeScript support. Type interference even gets pretty good with `createHookComponent`, except for hooks that rely on generics. It also covers some edge cases, like non functional or no children.

This doesn't make a lot of sense for most built in hooks, but for custom hooks that you create as abstractions for your app. It also works surprisingly well (and with good type support) when using `createHookComponent` with some third party packages like `react-use` and `react-apollo-hooks` (see `example` folder). I also think there's something to be said for `<Effect/>`.

## Install

```bash
npm install --save hook-component
```

## Usage

```tsx
import * as React from "react";

import Hook from "hook-component";

class CounterExample extends React.Component {
  render() {
    return (
      <Hook hook={useState} args={[0]}>
        {([count, setCount]) => (
          <button onClick={() => setCount(count => count + 1)}>{count}</button>
        )}
      </Hook>
    );
  }
}
```

```tsx
import * as React from "react";

import { createHookComponent } from "hook-component";

const Effect = createHookComponent(useEffect);

class TitleExample extends React.Component {
  render() {
    const { title } = this.props;
    return (
      <Effect
        args={[
          () => {
            document.title = title;
          },
          [title]
        ]}
      />
    );
  }
}
```

## License

MIT © [karlsander](https://github.com/karlsander)

## Changelog

- 0.1 Hello World
