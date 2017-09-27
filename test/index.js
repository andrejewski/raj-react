import test from 'ava'
import React from 'react'
import {program} from '../src'
import {shallow, configure} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

configure({ adapter: new Adapter() })

test('program() should return a React component', t => {
  const Program = program(React.Component, () => ({
    init: ['hello'],
    update: (msg, state) => [state],
    view: state => React.createElement('p', null, state)
  }))

  const wrapper = shallow(React.createElement(Program, null))
  const paragraph = wrapper.find('p')
  t.is(paragraph.text(), 'hello')
})

test('program() should update the React component', t => {
  let d
  const Program = program(React.Component, () => ({
    init: ['hello'],
    update: (msg, state) => [msg],
    view: (state, dispatch) => {
      d = dispatch
      return React.createElement('p', null, state)
    }
  }))

  const wrapper = shallow(React.createElement(Program, null))
  {
    const paragraph = wrapper.find('p')
    t.is(paragraph.text(), 'hello')
  }

  d('goodbye')

  wrapper.update() // force setState to flush
  const paragraph = wrapper.find('p')
  t.is(paragraph.text(), 'goodbye')
})

test('program() should init with component props', t => {
  const props = {foo: 'bar'}
  const Program = program(React.Component, p => {
    t.deepEqual(p, props)
    return {
      init: ['hello'],
      update: (msg, state) => [state],
      view: state => React.createElement('p', null, state)
    }
  })

  shallow(React.createElement(Program, props))
})
