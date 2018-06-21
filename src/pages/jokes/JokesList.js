import React from 'react'
import PropTypes from 'prop-types'
import JokeListItem from './jokesList/JokesListItem'

const JokesList = ({ jokes = [], onChange = () => {}, list }) => {
  const renderListItem = items => Object.keys(items).map((key) => {
    const { id, favorite, joke } = items[key]
    return (
      <JokeListItem
        key={id}
        {...{
          id,
          favorite,
          joke,
          onChange,
          list,
        }}
      />
    )
  })

  return (
    <React.Fragment>
      {renderListItem(jokes)}
    </React.Fragment>
  )
}


JokesList.propTypes = {
  jokes: PropTypes.shape({
    id: PropTypes.shape({
      id: PropTypes.number,
      joke: PropTypes.string,
      favorite: PropTypes.bool,
      categories: PropTypes.array,
    }),
  }).isRequired,
  onChange: PropTypes.func,
  list: PropTypes.string,
}

JokesList.defaultProps = {
  onChange: () => {},
  list: 'favorites',
}

export default JokesList
