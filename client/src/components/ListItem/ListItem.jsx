import React from 'react'
import PropTypes from 'prop-types'

import * as Styled from './ListItem.styles'

const ListItem = ({ onClick, children, expander }) => {
  return (
    <Styled.ListItem onClick={onClick}>
      <Styled.FlexBar>{children}</Styled.FlexBar>
      {expander}
    </Styled.ListItem>
  )
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
