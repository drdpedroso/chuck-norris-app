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
  id: PropTypes.number,
  joke: PropTypes.string,
  onChange: PropTypes.func,
  list: PropTypes.string,
  favorite: PropTypes.bool,
}

JokeListItem.defaultProps = {
  id: 0,
  joke: 'Filler',
  onChange: () => {},
  list: 'favorites',
  favorite: true,
}

export default JokeListItem
