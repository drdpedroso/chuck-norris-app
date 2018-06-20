import React from 'react'
import renderer from 'react-test-renderer'
import { Joke } from 'services/tests/factories'
import JokesList from './JokesList'

const favoritedJokes = [
  Joke.build({favorite: true}),
  Joke.build({favorite: true}),
  Joke.build({favorite: true})
]

const regularJokes = [
  Joke.build({favorite: false}),
  Joke.build({favorite: false}),
  Joke.build({favorite: false})
]

describe('JokesList', () => {
  it('should render correctly', () => {
    const component = renderer.create(<JokesList jokes={favoritedJokes}/>)
    expect(component).toMatchSnapshot()
  })
  it('should render correctly', () => {
    const component = renderer.create(<JokesList jokes={regularJokes}/>)
    expect(component).toMatchSnapshot()
  })
})
