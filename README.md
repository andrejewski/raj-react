# Raj React
> React bindings for [Raj](https://github.com/andrejewski/raj)

```sh
npm install raj-react
```

[![npm](https://img.shields.io/npm/v/raj-react.svg)](https://www.npmjs.com/package/raj-react)
[![Build Status](https://travis-ci.org/andrejewski/raj-react.svg?branch=master)](https://travis-ci.org/andrejewski/raj-react)
[![Greenkeeper badge](https://badges.greenkeeper.io/andrejewski/raj-react.svg)](https://greenkeeper.io/)

## Usage

```js
import React from 'react'
import ReactDom from 'react-dom'
import {program} from 'raj-react'

const helloProgram = {
  init: [{text: 'Hello world'}],
  update (message, model) {
    return model
  },
  view (model, dispatch) {
    return <p>{model.text}</p>
  }
}

const App = program(React.Component, props => helloProgram)
const root = document.getElementById('app')
ReactDom.render(<App />, root)
```

## Documentation
`program(Component, props => ({init, update, view})): Component`
- `Component`: a React Component class
- `props`: the React component `props`
- `init`: the initial state and optional effect
- `update(message, state)`: return the new state and optional effect
- `view(state, dispatch)`: return the React view

The `raj-react` package exports a single function which takes a React component class and a function which receives the component's `props` and returns a Raj program `{init, update, view}` triplet; returns a React component.

### Questions

#### Where to use `raj-react`?
The `raj-react` package wraps the `raj` runtime and integrates within an existing React component tree. The root program is the entry point that meets the runtime. Most often, an app needs `raj-react` once. All child programs' `view` methods may return React components with no boilerplate required.

#### Does this work with React Native?
Yes, `raj-react` works with both web and React Native components. In the above example, `react-dom` renders a web page component.

#### Server-side rendering?
The `raj-react` package returns a React Component that works with [`ReactDOMServer`](https://facebook.github.io/react/docs/react-dom-server.html).
