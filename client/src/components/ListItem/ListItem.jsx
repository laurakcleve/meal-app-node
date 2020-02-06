import React from 'react'
import PropTypes from 'prop-types'
import StyledListItem from './ListItem.styles'

const ListItem = ({ children, refProp }) => {
  return <StyledListItem ref={refProp}>{children}</StyledListItem>
}

ListItem.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
}

export default ListItem
