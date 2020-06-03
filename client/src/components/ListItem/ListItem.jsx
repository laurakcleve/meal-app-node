import React from 'react'
import PropTypes from 'prop-types'
import StyledListItem from './ListItem.styles'

const ListItem = ({ onClick, children }) => {
  return <StyledListItem onClick={onClick}>{children}</StyledListItem>
}

ListItem.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

ListItem.defaultProps = {
  onClick: null,
}

export default ListItem
