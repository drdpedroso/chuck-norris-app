import React from 'react'
import { getNRandomJokes } from 'services/api/jokesApi'
import { getItemsFromLocalStorage, setItemsInLocalStorage } from 'services/storage/localStorage'
import { mapArrayToHashMap } from 'services/utils/utils'
import first from 'lodash/first'
// import { getIntersectionBetweenObjArrays } from 'services/utils/utils'
import JokesList from './jokes/JokesList'
import { Button, Column, JokesWrapper } from './jokes/style'

class Jokes extends React.Component {
  static getFavoriteJokes() {
    return getItemsFromLocalStorage('jokes') || {}
  }

  static changeFavoriteJokes({ favoriteJokes }, joke) {
    const favoriteJokesFormatted = Object.assign(favoriteJokes, { [joke.id]: { ...joke, favorite: true } })
    return ({ favoriteJokes: favoriteJokesFormatted })
  }

  static syncJokesBasedOnList(currentState, id, list) {
    const selectedJoke = currentState[list][id]
    const newJoke = Object.assign(selectedJoke, { favorite: !selectedJoke.favorite })
    const jokes = Object.assign(currentState[list], { [id]: newJoke })
    return { [list]: jokes }
  }

  static removeIndexFromJokes({ favoriteJokes }, id) {
    const jokes = Object.assign({}, favoriteJokes)
    delete jokes[id]
    return { favoriteJokes: jokes }
  }

  constructor() {
    super()
    this.state = {
      jokes: {},
      favoriteJokes: {},
      isCounterInitialized: false,
    }
    this.intervalId = 0
    this.addJokeToFavorites = this.addJokeToFavorites.bind(this)
    this.changeJokeStatus = this.changeJokeStatus.bind(this)
    this.updateAllItems = this.updateAllItems.bind(this)
    this.addNewFavoriteJokesEveryNSeconds = this.addNewFavoriteJokesEveryNSeconds.bind(this)
  }

  addJokeToFavorites(joke) {
    this.setState(
      currentState => Jokes.changeFavoriteJokes(currentState, joke),
      () => setItemsInLocalStorage('jokes', this.state.favoriteJokes),
    )
  }
  //
  // checkForObjectsIntersection(jokes, favoriteJokes) {
  //   Object.keys(jokes).forEach((joke) => {
  //     if (favoriteJokes[joke]) {
  //       console.log(joke)
  //     }
  //   })
  // }

  removeJokeFromFavorites({ id }) {
    this.setState(
      currentState => Jokes.removeIndexFromJokes(currentState, id),
      () => setItemsInLocalStorage('jokes', this.state.favoriteJokes),
    )
  }

  changeJokeStatus(joke, shouldAdd, list) {
    const { id } = joke
    this.setState(
      currentState => Jokes.syncJokesBasedOnList(currentState, id, list),
      () => (shouldAdd ? this.addJokeToFavorites(joke) : this.removeJokeFromFavorites(joke)),
    )
  }

  componentDidMount() {
    this.updateAllItems()
  }

  async updateAllItems() {
    const { value } = await getNRandomJokes(10)
    const jokes = mapArrayToHashMap(value.map(joke => ({ ...joke, favorite: false })))
    const favoriteJokes = Jokes.getFavoriteJokes()
    this.setState({ jokes, favoriteJokes })
  }

  stopIntervalJokes(intervalId) {
    clearInterval(intervalId)
    this.intervalId = 0
  }

  addNewFavoriteJokesEveryNSeconds() {
    this.intervalId = this.intervalId || (setInterval(async () => {
      const { value } = await getNRandomJokes(1)
      const randomJoke = first(value)
      this.addJokeToFavorites(randomJoke)
    }, 2000))
    this.setState(currentState => ({ isCounterInitialized: !currentState.isCounterInitialized }), () => {
      if (this.state.isCounterInitialized) {
        if (Object.keys(this.state.favoriteJokes).length >= 10) this.stopIntervalJokes(this.intervalId)
      } else {
        this.stopIntervalJokes(this.intervalId)
      }
    })
  }

  render() {
    const {
      jokes,
      favoriteJokes,
      isCounterInitialized,
    } = this.state
    return (
      <JokesWrapper>
        <Column>
          <Button onClick={this.updateAllItems}>Refresh</Button>
          <Button
            backgroundColor={isCounterInitialized ? 'red' : 'none'}
            onClick={this.addNewFavoriteJokesEveryNSeconds}
          >
            Add every 5sec
          </Button>
          <JokesList jokes={jokes} onChange={this.changeJokeStatus} list="jokes" />
        </Column>
        <Column>
          <JokesList jokes={favoriteJokes} onChange={this.changeJokeStatus} list="favoriteJokes" />
        </Column>
      </JokesWrapper>
    )
  }
}

export default Jokes
