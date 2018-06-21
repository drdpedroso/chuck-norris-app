import React from 'react'
import PropTypes from 'prop-types'

const JokeListItem = ({
  id, joke, onChange, list, favorite = false,
}) => (
  <div>
    <label className="container" htmlFor={id}>
      <input type="checkbox" id={id} checked={favorite} onChange={({ target }) => onChange({ id, joke }, target.checked, list)} />
      {favorite ? <i className="fa fa-star" /> : <i className="far fa-star" />}
    </label>
    {joke}
  </div>
)

JokeListItem.propTypes = {
  id: PropTypes.number.isRequired,
  joke: PropTypes.string.isRequired,
  onChange: PropTypes.func,
  list: PropTypes.string,
  favorite: PropTypes.bool.isRequired,
}

JokeListItem.defaultProps = {
  onChange: () => {},
  list: 'favorites',
}

export default JokeListItem
