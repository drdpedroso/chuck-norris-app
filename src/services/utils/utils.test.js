// import getIntersectionBetweenObjArrays
import {getIntersectionBetweenObjArrays, mapArrayToHashMap} from './utils'


describe('utils', () => {
  it('should get right intersection between two arrays of objects based on a equal conditional', () => {
    const jokes = [
      {id: 1, joke: 'Joke 1'},
      {id: 2, joke: 'Joke 2'},
      {id: 3, joke: 'Joke 3'}
    ]

    const favoriteJokes = [
      {id: 2, joke: 'Joke 2'},
    ]
    const result = getIntersectionBetweenObjArrays(jokes, favoriteJokes)
    expect(String(result)).toEqual(String({id: 2, joke: 'Joke 2'}))
  })
  it('should return an empty array for non-intersectional arrays', () => {
    const jokes = [
      {id: 1, joke: 'Joke 1'},
      {id: 2, joke: 'Joke 2'},
      {id: 3, joke: 'Joke 3'}
    ]

    const favoriteJokes = [
      {id: 5, joke: 'Joke 2'},
    ]
    const result = getIntersectionBetweenObjArrays(jokes, favoriteJokes)
    expect(String(result)).toEqual(String([]))
  })
  it('should "convert" array to hash map', () => {
    const jokes = [
      {id: 1, joke: 'Joke 1'},
      {id: 2, joke: 'Joke 2'}
    ]

    const result = mapArrayToHashMap(jokes)
    expect(JSON.stringify(result)).toEqual(JSON.stringify({
      1: {id: 1, joke: 'Joke 1'},
      2: {id: 2, joke: 'Joke 2'}
    }))
  })
})
