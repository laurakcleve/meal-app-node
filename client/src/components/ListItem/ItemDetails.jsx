import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

import * as Styled from './ItemDetails.styles'

const ItemDetails = ({ item }) => {
  return (
    <Styled.Details>
      <div className="details">
        <div>
          <h3>ADDED</h3>
          <p>
            {moment(Number(item.addDate)).format('M/D/YY')} (
            {moment(Number(item.addDate)).fromNow()})
          </p>
        </div>
        <div>
          {item.amount && (
            <>
              <h3>AMOUNT</h3>
              <p>{item.amount}</p>
            </>
          )}
        </div>
      </div>
      <div className="lists">Lists</div>
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
