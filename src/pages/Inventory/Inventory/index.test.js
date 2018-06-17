import React from 'react'
import renderer from 'react-test-renderer'
import Inventory from './index'

describe('Inventory ', () => {
  it('should render correctly', () => {
    const component = renderer.create(<Inventory />)
    expect(component).toMatchSnapshot()
  })
})
