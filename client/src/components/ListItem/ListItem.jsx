import React from 'react'
import PropTypes from 'prop-types'
import StyledListItem from './ListItem.styles'

const ListItem = ({ children, onClick }) => {
  return <StyledListItem onClick={onClick}>{children}</StyledListItem>
}

ListItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ListItem
