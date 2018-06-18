import React from 'react'
import renderer from 'react-test-renderer'
import { Joke } from '@/services/tests/factories'
import Jokes from './Jokes'

describe('Jokes', () => {
  it('should render correctly', () => {
    const component = renderer.create(<Jokes />)
    expect(component).toMatchSnapshot()
  })
})
