import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import StyledAddItem from './AddItem.styles'

const AddItem = () => {
  const { data: itemsData, loading: itemsLoading, error: itemsError } = useQuery(
    ITEMS_QUERY
  )

  return (
    <StyledAddItem>
      <form action="">
        <label htmlFor="item" className="item">
          <div className="label">ITEM</div>
          <input type="text" id="item" list="itemList" />
        </label>
        {!itemsLoading && !itemsError && (
          <datalist id="itemList">
            {itemsData.items.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </datalist>
        )}

        <label htmlFor="location">
          <div className="label">LOCATION</div>
          <input type="text" id="location" />
        </label>

        <label htmlFor="daysLeft">
          <div className="label">DAYS LEFT</div>
          <input type="text" id="daysLeft" />
        </label>

        <label htmlFor="category">
          <div className="label">CATEGORY</div>
          <input type="text" id="category" />
        </label>

        <label htmlFor="addDate">
          <div className="label">ADD DATE</div>
          <input type="text" id="addDate" />
        </label>

        <label htmlFor="amount">
          <div className="label">AMOUNT</div>
          <input type="text" id="amount" />
        </label>

        <label htmlFor="quantity">
          <div className="label">QUANTITY</div>
          <input type="text" id="quantity" />
        </label>

        <button type="submit">SAVE</button>
      </form>
    </StyledAddItem>
  )
}

const ITEMS_QUERY = gql`
  query items {
    items {
      id
      name
    }
  }
`

export default AddItem
