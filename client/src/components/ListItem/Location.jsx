import React from 'react'
import PropTypes from 'prop-types'

import StyledLocation from './Location.styles'

const Location = ({ name }) => {
  return <StyledLocation>{name}</StyledLocation>
}

Location.propTypes = {
  name: PropTypes.string.isRequired,
}

export default Location
