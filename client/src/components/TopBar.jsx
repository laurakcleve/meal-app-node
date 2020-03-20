import React from 'react'
import PropTypes from 'prop-types'

import StyledTopBar from './TopBar.styles'

const TopBar = ({ children }) => {
  return <StyledTopBar>{children}</StyledTopBar>
}

TopBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
}
export default TopBar
