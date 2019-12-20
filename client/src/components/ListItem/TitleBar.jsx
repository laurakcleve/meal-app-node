import React from 'react'
import PropTypes from 'prop-types'

import StyledTitleBar from './TitleBar.styles'

const TitleBar = ({ children }) => {
  return <StyledTitleBar>{children}</StyledTitleBar>
}

TitleBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
}

export default TitleBar
