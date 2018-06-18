import React from 'react'
import { getNRandomJokes } from '../services/api/jokesApi'

class Jokes extends React.Component {
  constructor() {
    super()
    this.state = {
      value: [],
    }
  }

  async componentDidMount() {
    const {value} = await getNRandomJokes(10)
    this.setState({value})
  }

  render() {
    return (
      <div>Joke</div>
    )
  }
}

export default Jokes
