import React from 'react'
import PropTypes from 'prop-types'

import * as Styled from './ItemDetails.styles'

const ItemDetails = ({ item }) => {
  return <Styled.Details>ID: {item.id}</Styled.Details>
}

ItemDetails.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
}

export default ItemDetails
