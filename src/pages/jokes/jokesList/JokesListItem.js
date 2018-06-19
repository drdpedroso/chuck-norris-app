import React from 'react'
import PropTypes from 'prop-types'

const JokeListItem = ({
  id, joke, onChange, list, favorite = false,
}) => (
  <div>
    <input type="checkbox" checked={favorite} onChange={({ target }) => onChange({ id, joke }, target.checked, list)} />
    {joke}
  </div>
)

JokeListItem.propTypes = {
  joke: PropTypes.shape({
    color: PropTypes.string.isRequired,
    fontSize: PropTypes.number.isRequired,
  }).isRequired,
}

JokeListItem.defaultProps = {
  jokes: [],
}

export default JokeListItem
