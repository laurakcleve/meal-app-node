import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Ingredient = ({ ingredient, indented, notLast }) => {
  const style = {}
  if (indented) style.marginLeft = '5px'

  return (
    <Link to={`/item/${ingredient.item.id}`} style={style}>{`${
      ingredient.item.name
    }${notLast ? ' /' : ''}`}</Link>
  )
}

Ingredient.propTypes = {
  ingredient: PropTypes.shape({
    item: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  indented: PropTypes.bool.isRequired,
  notLast: PropTypes.bool.isRequired,
}

export default Ingredient
