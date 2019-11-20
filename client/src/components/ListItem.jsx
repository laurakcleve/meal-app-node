import React from 'react'
import PropTypes from 'prop-types'
import * as Styled from './ListItem.styles'

const ListItem = ({ name }) => {
  return <Styled.ListItem>{name}</Styled.ListItem>
}

ListItem.propTypes = {
  name: PropTypes.string.isRequired,
}

export default ListItem
