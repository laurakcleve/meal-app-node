import React from 'react'
import PropTypes from 'prop-types'

import * as Styled from './DetailListItem.styles'

const DetailListItem = ({ dishId, name }) => {
  return (
    <Styled.DetailListItem to={`/dishes/${dishId}`}>
      {name}
    </Styled.DetailListItem>
  )
}

DetailListItem.propTypes = {
  dishId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}

export default DetailListItem
