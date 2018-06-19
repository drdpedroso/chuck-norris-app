import React from 'react'
import PropTypes from 'prop-types'
import JokeListItem from './jokesList/JokesListItem'

export const JokesList = ({ jokes = [], onChange = () => {}, list }) => {
  const renderListItem = items => Object.keys(items).map((key) => {
    const { id, favorite, joke } = items[key]
    return (<JokeListItem key={id} id={id} favorite={favorite} joke={joke} onChange={onChange} list={list} />)
  })

  return (
    <React.Fragment>
      {renderListItem(jokes)}
    </React.Fragment>
  )
}


JokesList.propTypes = {
  jokes: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
    joke: PropTypes.string,
    categories: PropTypes.arrayOf(PropTypes.string),
  })).isRequired,
}

JokesList.defaultProps = {
  jokes: [{
    id: 0,
    joke: 'Just a filler joke',
    categories: [],
  }],
}

export default JokesList
