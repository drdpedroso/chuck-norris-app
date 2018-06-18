import React from 'react'
import renderer from 'react-test-renderer'
import { Joke } from 'services/tests/factories'
import Jokes from './Jokes'
import { shallow } from 'enzyme'

describe('Jokes', () => {
  it('should render correctly', () => {
    const component = renderer.create(<Jokes />)
    expect(component).toMatchSnapshot()
  })
  it('should format correctly based on received joke', () => {
    const favoriteJokes ={
      206:{id: 206, joke: "Chuck Norris destroyed the periodic table, because…k Norris only recognizes the element of surprise.", favorite: true},
      223:{id: 223, joke: "Chuck Norris smells what the Rock is cooking... because the Rock is Chuck Norris' personal chef.", favorite: true}
    }
    const res = {
      favoriteJokes: {
        206:{id: 206, joke: "Chuck Norris destroyed the periodic table, because…k Norris only recognizes the element of surprise.", favorite: true},
        223:{id: 223, joke: "Chuck Norris smells what the Rock is cooking... because the Rock is Chuck Norris' personal chef.", favorite: true}
      }
    }
    const joke = {id: 223, joke: "Chuck Norris smells what the Rock is cooking... because the Rock is Chuck Norris' personal chef."}
    const {changeFavoriteJokes} = Jokes
    expect(JSON.stringify(changeFavoriteJokes({favoriteJokes}, joke))).toEqual(JSON.stringify(res))
  })
  it('should sync jokes based on the list that the request was sended', () => {
    const currentState = {
      favoriteJokes: {
        206: {id: 206, joke: "Chuck Norris destroyed the periodic table, because…k Norris only recognizes the element of surprise.", favorite: true}
      },
      jokes: {
        78: {id: 78, joke: "The grass is always greener on the other side, unl…e grass is most likely soaked in blood and tears.", categories: Array(0), favorite: false},
        83: {id: 83, joke: "While urinating, Chuck Norris is easily capable of welding titanium.", categories: Array(0), favorite: false},
        104: {id: 104, joke: "If you Google search &quot;Chuck Norris getting hi…ll generate zero results. It just doesn't happen.", categories: Array(0), favorite: false},
        169: {id: 169, joke: "Chuck Norris won super bowls VII and VIII singleha…tedly retiring to pursue a career in ass-kicking.", categories: Array(0), favorite: false},
        265: {id: 265, joke: "The phrase 'balls to the wall' was originally conc…ing any building smaller than an aircraft hangar.", categories: Array(0), favorite: false},
        329: {id: 329, joke: "There are only two things that can cut diamonds: other diamonds, and Chuck Norris.", categories: Array(0), favorite: false},
        344: {id: 344, joke: "Aliens DO indeed exist. They just know better than to visit a planet that Chuck Norris is on.", categories: Array(0), favorite: false},
        370: {id: 370, joke: "Godzilla is a Japanese rendition of Chuck Norris' first visit to Tokyo.", categories: Array(0), favorite: false},
        402: {id: 402, joke: "There is no such thing as a lesbian, just a woman who has never met Chuck Norris.", categories: Array(0), favorite: false},
        473: {id: 473, joke: "Chuck Norris can overflow your stack just by looking at it.", categories: Array(1), favorite: false},
      }
    }
    const favoriteJokes ={
      206:{id: 206, joke: "Chuck Norris destroyed the periodic table, because…k Norris only recognizes the element of surprise.", favorite: true},
      223:{id: 223, joke: "Chuck Norris smells what the Rock is cooking... because the Rock is Chuck Norris' personal chef.", favorite: true}
    }
    const res = {
      favoriteJokes: {
        206:{id: 206, joke: "Chuck Norris destroyed the periodic table, because…k Norris only recognizes the element of surprise.", favorite: true},
        223:{id: 223, joke: "Chuck Norris smells what the Rock is cooking... because the Rock is Chuck Norris' personal chef.", favorite: true}
      }
    }
    const joke = {id: 223, joke: "Chuck Norris smells what the Rock is cooking... because the Rock is Chuck Norris' personal chef."}
    const {changeFavoriteJokes} = Jokes
    expect(JSON.stringify(changeFavoriteJokes({favoriteJokes}, joke))).toEqual(JSON.stringify(res))
  })
})
