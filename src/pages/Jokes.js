import React from 'react'
import styled from 'styled-components'
import { getNRandomJokes } from 'services/api/jokesApi'
import { getItemsFromLocalStorage, setItemsInLocalStorage } from 'services/storage/localStorage'
// import { getIntersectionBetweenObjArrays } from 'services/utils/utils'
import JokesList from './jokes/JokesList'
import { mapArrayToHashMap } from '../services/utils/utils'

const JokesWrapper = styled.div`
  display: flex;
`
const Column = styled.div`
  flex-direction: column;
`

class Jokes extends React.Component {
  static getFavoriteJokes() {
    return getItemsFromLocalStorage('jokes') || {}
  }

  static changeFavoriteJokes({favoriteJokes}, joke) {
    const favoriteJokesFormatted = Object.assign(favoriteJokes, {[joke.id]: {...joke, favorite: true}})
    return ({ favoriteJokes: favoriteJokesFormatted })
  }

  static syncJokesBasedOnList(currentState, id, list) {
    debugger
    const selectedJoke = currentState[list][id]
    const newJoke = Object.assign(selectedJoke, {favorite: !selectedJoke.favorite})
    const jokes = Object.assign(currentState[list], {[id]: newJoke})
    return { [list] : jokes }
  }

  constructor() {
    super()
    this.state = {
      jokes: {},
      favoriteJokes: {},
    }

    this.addJokeToFavorites = this.addJokeToFavorites.bind(this)
    this.changeJokeStatus = this.changeJokeStatus.bind(this)
  }

  addJokeToFavorites (joke) {
    this.setState(currentState => Jokes.changeFavoriteJokes(currentState, joke), () =>
      setItemsInLocalStorage('jokes', this.state.favoriteJokes)
    )
  }

  checkForObjectsIntersection(jokes, favoriteJokes) {
    Object.keys(jokes).forEach(joke => {
      if (favoriteJokes[joke]) {
        console.log(joke)
      }
    })
  }

  removeJokeFromFavorites ({id}) {
    this.setState(currentState => {
      const favoriteJokes = Object.assign({}, currentState.favoriteJokes)
      delete favoriteJokes[id]
      return {favoriteJokes}
    }, () =>
      setItemsInLocalStorage('jokes', this.state.favoriteJokes)
    )
  }

  changeJokeStatus (joke, shouldAdd, list) {
    const {id} = joke
    this.setState(currentState => Jokes.syncJokesBasedOnList(currentState, id, list), () => {
      return shouldAdd ? this.addJokeToFavorites(joke) : this.removeJokeFromFavorites(joke)
    })
  }

  async componentDidMount() {
    const { value } = await getNRandomJokes(10)
    const jokes = mapArrayToHashMap(value.map(joke => ({...joke, favorite: false})))
    const favoriteJokes = Jokes.getFavoriteJokes()

    this.setState({ jokes, favoriteJokes }, () => this.checkForObjectsIntersection(this.state.jokes, this.state.favoriteJokes))

  }

  render() {
    const {
      jokes,
      favoriteJokes,
    } = this.state
    return (
      <JokesWrapper>
        <Column>
          <JokesList jokes={jokes} onChange={this.changeJokeStatus} list={'jokes'}/>
        </Column>
        <Column>
          <JokesList jokes={favoriteJokes} onChange={this.changeJokeStatus} list={'favoriteJokes'}/>
        </Column>
      </JokesWrapper>
    )
  }
}

export default Jokes
