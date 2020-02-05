import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import * as Styled from './ItemDetails.styles'

const ItemDetails = ({ item }) => {
  console.log(item.amount)
  return (
    <Styled.Details>
      <div>Add date: {moment(Number(item.addDate)).format('M/D/YY')}</div>
      {item.amount && <div>Amount: {item.amount}</div>}
      <div>Location: {item.location.name}</div>
    </Styled.Details>
  )
}

ItemDetails.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    addDate: PropTypes.string.isRequired,
    amount: PropTypes.string,
    location: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
  }).isRequired,
}

export default ItemDetails
