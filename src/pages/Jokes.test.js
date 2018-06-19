import React from 'react'
import renderer from 'react-test-renderer'
import { Joke } from 'services/tests/factories'
import Jokes from './Jokes'
import { shallow } from 'enzyme'

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
      206: { id: 206, joke: 'Chuck Norris destroyed the periodic table, because…k Norris only recognizes the element of surprise.', favorite: true },
      223: { id: 223, joke: "Chuck Norris smells what the Rock is cooking... because the Rock is Chuck Norris' personal chef.", favorite: true },
    }
    const res = {
      favoriteJokes: {
        206: { id: 206, joke: 'Chuck Norris destroyed the periodic table, because…k Norris only recognizes the element of surprise.', favorite: true },
        223: { id: 223, joke: "Chuck Norris smells what the Rock is cooking... because the Rock is Chuck Norris' personal chef.", favorite: true },
      },
    }
    const joke = { id: 223, joke: "Chuck Norris smells what the Rock is cooking... because the Rock is Chuck Norris' personal chef." }
    const { changeFavoriteJokes } = Jokes
    expect(JSON.stringify(changeFavoriteJokes({ favoriteJokes }, joke))).toEqual(JSON.stringify(res))
  })
  it('should remove object key based on id', () => {
    const favoriteJokes = {
      78: { id: 78, joke: 'The grass is always greener on the other side, unl…e grass is most likely soaked in blood and tears.', favorite: true },
      206: { id: 206, joke: 'Chuck Norris destroyed the periodic table, because…k Norris only recognizes the element of surprise.', favorite: false },
    }
    const id = 206
    const result = {
      favoriteJokes: {
        78: { id: 78, joke: 'The grass is always greener on the other side, unl…e grass is most likely soaked in blood and tears.', favorite: true },
      },
    }
    const { removeIndexFromJokes } = Jokes
    expect(JSON.stringify(removeIndexFromJokes({ favoriteJokes }, id))).toEqual(JSON.stringify(result))
  })
  it('should sync jokes based on the list that the request was sended', () => {
    const id = 78
    const currentState = {
      favoriteJokes: {
        206: { id: 206, joke: 'Chuck Norris destroyed the periodic table, because…k Norris only recognizes the element of surprise.', favorite: true },
      },
      jokes: {
        78: {
          id: 78, joke: 'The grass is always greener on the other side, unl…e grass is most likely soaked in blood and tears.', favorite: false,
        },
        83: {
          id: 83, joke: 'While urinating, Chuck Norris is easily capable of welding titanium.', favorite: false,
        },
        104: {
          id: 104, joke: "If you Google search &quot;Chuck Norris getting hi…ll generate zero results. It just doesn't happen.", favorite: false,
        },
        169: {
          id: 169, joke: 'Chuck Norris won super bowls VII and VIII singleha…tedly retiring to pursue a career in ass-kicking.', favorite: false,
        },
        265: {
          id: 265, joke: "The phrase 'balls to the wall' was originally conc…ing any building smaller than an aircraft hangar.", favorite: false,
        },
        329: {
          id: 329, joke: 'There are only two things that can cut diamonds: other diamonds, and Chuck Norris.', favorite: false,
        },
        344: {
          id: 344, joke: 'Aliens DO indeed exist. They just know better than to visit a planet that Chuck Norris is on.', favorite: false,
        },
        370: {
          id: 370, joke: "Godzilla is a Japanese rendition of Chuck Norris' first visit to Tokyo.", favorite: false,
        },
        402: {
          id: 402, joke: 'There is no such thing as a lesbian, just a woman who has never met Chuck Norris.', favorite: false,
        },
        473: {
          id: 473, joke: 'Chuck Norris can overflow your stack just by looking at it.', favorite: false,
        },
      },
    }
    const res = {
      jokes: {
        78: {
          id: 78, joke: 'The grass is always greener on the other side, unl…e grass is most likely soaked in blood and tears.', favorite: true,
        },
        83: {
          id: 83, joke: 'While urinating, Chuck Norris is easily capable of welding titanium.', favorite: false,
        },
        104: {
          id: 104, joke: "If you Google search &quot;Chuck Norris getting hi…ll generate zero results. It just doesn't happen.", favorite: false,
        },
        169: {
          id: 169, joke: 'Chuck Norris won super bowls VII and VIII singleha…tedly retiring to pursue a career in ass-kicking.', favorite: false,
        },
        265: {
          id: 265, joke: "The phrase 'balls to the wall' was originally conc…ing any building smaller than an aircraft hangar.", favorite: false,
        },
        329: {
          id: 329, joke: 'There are only two things that can cut diamonds: other diamonds, and Chuck Norris.', favorite: false,
        },
        344: {
          id: 344, joke: 'Aliens DO indeed exist. They just know better than to visit a planet that Chuck Norris is on.', favorite: false,
        },
        370: {
          id: 370, joke: "Godzilla is a Japanese rendition of Chuck Norris' first visit to Tokyo.", favorite: false,
        },
        402: {
          id: 402, joke: 'There is no such thing as a lesbian, just a woman who has never met Chuck Norris.', favorite: false,
        },
        473: {
          id: 473, joke: 'Chuck Norris can overflow your stack just by looking at it.', favorite: false,
        },
      },
    }
    const { syncJokesBasedOnList } = Jokes
    expect(JSON.stringify(syncJokesBasedOnList(currentState, id, 'jokes'))).toEqual(JSON.stringify(res))
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
})
