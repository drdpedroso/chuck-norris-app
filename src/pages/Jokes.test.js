import React from 'react'
import renderer from 'react-test-renderer'
import { Joke } from 'services/tests/factories'
import { mapArrayToHashMap } from 'services/utils/utils'
import { shallow } from 'enzyme'
import Jokes from './Jokes'

const mountJokesByQuantity = (quantity = 1, favorite = false) => Array(quantity).fill(0).map(() => Joke.build({favorite}))

jest.mock('../services/api/jokesApi', () => (
  {
    getNRandomJokes: (() => new Promise((resolve) => {
      resolve({
        value: [{
          id: 344, joke: 'Aliens DO indeed exist. They just know better than to visit a planet that Chuck Norris is on.', favorite: false,
        }],
      })
    })),
  }
))


describe('Jokes', () => {
  it('should render correctly', () => {
    const component = renderer.create(<Jokes />)
    expect(component).toMatchSnapshot()
  })
  it('should format correctly based on received joke', () => {
    const favoriteJokes = {
      206: Joke.build({ id: 206, favorite: true }),
      223: Joke.build({ id: 223, favorite: true }),
    }
    const res = {
      favoriteJokes,
    }
    const joke = Joke.build({ id: 223 })
    const { changeFavoriteJokes } = Jokes
    expect(JSON.stringify(changeFavoriteJokes({ favoriteJokes }, joke))).toEqual(JSON.stringify(res))
  })
  it('should remove object key based on id', () => {
    const id = 206
    const favoriteJokes = {
      78: Joke.build({ id: 78, favorite: true }),
      206: Joke.build({ id: 206, favorite: false }),
    }
    const result = {
      favoriteJokes: {
        78: Joke.build({ id: 78, favorite: true }),
      },
    }
    const { removeJokeFromFavorites } = Jokes
    expect(JSON.stringify(removeJokeFromFavorites({ favoriteJokes }, id))).toEqual(JSON.stringify(result))
  })
  it('should change joke favorite flag based on specific list', () => {
    const id = 2
    const factoryMadeJokes = mapArrayToHashMap(mountJokesByQuantity(10))
    const currentState = {
      favoriteJokes: {
        2: Joke.build({id: 2, favorite: true})
      },
      jokes: factoryMadeJokes,
    }
    const res = {
      jokes: Object.assign(factoryMadeJokes, {2: Joke.build({id: 2, favorite: true})}),
    }
    const { changeFavoriteFlagBasedOnList } = Jokes
    expect(JSON.stringify(changeFavoriteFlagBasedOnList(currentState, id, 'jokes'))).toEqual(JSON.stringify(res))
  })
  it('should refresh data when clicking "Refresh" button', async () => {
    const component = shallow(<Jokes />)
    await component.instance().updateAllItems()
    const result = {
      344: {
        id: 344,
        joke: 'Aliens DO indeed exist. They just know better than to visit a planet that Chuck Norris is on.',
        favorite: false,
      },
    }
    expect(JSON.stringify(component.state().jokes)).toEqual(JSON.stringify(result))
  })
  it('should start setInterval to get data', () => {
    jest.useFakeTimers() // necessary because setInterval

    const component = shallow(<Jokes />)
    component.instance().addNewFavoriteJokesEveryNSeconds()
    expect(setInterval).toHaveBeenCalledTimes(1)

    expect(component.state().isCounterInitialized).toEqual(true)
  })
  it('should stop setInterval to get data by chaning initializer flag', () => {
    jest.useFakeTimers() // necessary because setInterval
    const component = shallow(<Jokes />)
    component.setState({
      isCounterInitialized: true,
    })
    component.instance().addNewFavoriteJokesEveryNSeconds()
    expect(component.state().isCounterInitialized).toEqual(false)
  })
  it('should hide login modal after submit', () => {
    const component = shallow(<Jokes />)
    component.instance().onSubmit()
    expect(component.state().isLogged).toEqual(true)
  })
})
