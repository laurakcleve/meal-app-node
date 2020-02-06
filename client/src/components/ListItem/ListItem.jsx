import React from 'react'
import PropTypes from 'prop-types'
import StyledListItem from './ListItem.styles'

const ListItem = ({ children }) => {
  return <StyledListItem>{children}</StyledListItem>
}

ListItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
}

export default ListItem
