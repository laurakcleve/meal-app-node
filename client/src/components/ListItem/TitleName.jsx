import React from 'react'
import PropTypes from 'prop-types'

import StyledTitleName from './TitleName.styles'

const TitleName = ({ name }) => {
  return <StyledTitleName>{name}</StyledTitleName>
}

TitleName.propTypes = {
  name: PropTypes.string.isRequired,
}

export default TitleName
