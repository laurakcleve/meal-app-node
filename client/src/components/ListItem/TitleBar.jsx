import React from 'react'
import PropTypes from 'prop-types'

import StyledTitleBar from './TitleBar.styles'

const TitleBar = ({ children, onClick }) => {
  return <StyledTitleBar onClick={onClick}>{children}</StyledTitleBar>
}

TitleBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
  onClick: PropTypes.func.isRequired,
}

export default TitleBar
