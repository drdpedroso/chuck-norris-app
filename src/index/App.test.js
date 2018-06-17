import React from 'react'
import renderer from 'react-test-renderer'
import App from './App'

describe('App', () => {
  it('should render correctly', () => {
    const component = renderer.create(<App />)
    expect(component).toMatchSnapshot()
  })
})
