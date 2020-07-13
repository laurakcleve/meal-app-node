import React from 'react'
import moment from 'moment'
import PropTypes from 'prop-types'

import * as Styled from './InventoryItemDetails.styles'
import { formatDate } from '../../utils'
import UsedIn from './UsedIn'

const InventoryItemDetails = ({ inventoryItem }) => {
  return (
    <Styled.Container>
      <div className="column">
        {inventoryItem.addDate && (
          <Styled.AddDate>
            <h3>Added:</h3>
            <p>
              {formatDate(inventoryItem.addDate)} (
              {moment(Number(inventoryItem.addDate)).fromNow()})
            </p>
          </Styled.AddDate>
        )}

        {inventoryItem.amount && (
          <Styled.Amount>
            <h3>Amount:</h3>
            <p>{inventoryItem.amount}</p>
          </Styled.Amount>
        )}
      </div>

      <div className="column">
        {inventoryItem.item.dishes.length > 0 && (
          <Styled.UsedIn>
            {inventoryItem.item.dishes && (
              <UsedIn dishes={inventoryItem.item.dishes} />
            )}
          </Styled.UsedIn>
        )}
      </div>
    </Styled.Container>
  )
}

InventoryItemDetails.propTypes = {
  inventoryItem: PropTypes.shape({
    id: PropTypes.string.isRequired,
    addDate: PropTypes.string,
    amount: PropTypes.string,
    item: PropTypes.shape({
      dishes: PropTypes.arrayOf(PropTypes.shape({})),
    }),
  }).isRequired,
}

export default InventoryItemDetails
