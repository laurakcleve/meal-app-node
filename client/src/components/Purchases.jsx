import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import * as Styled from './Layout.styles'
import Sidebar from './Sidebar'

const Purchases = () => {
  const { locationsData, locationsLoading, locationsError } = useQuery(
    PURCHASE_LOCATIONS_QUERY
  )

  return (
    <Styled.Container>
      <Sidebar />
      <Styled.List>
        <form action="">
          <label htmlFor="date">
            Date
            <input type="date" />
          </label>

          <label htmlFor="location">
            Location
            <input type="text" />
          </label>

          <button type="submit">Save</button>
        </form>
      </Styled.List>
    </Styled.Container>
  )
}

const PURCHASE_LOCATIONS_QUERY = gql`
  query purchaseLocations {
    purchaseLocations {
      id
      name
    }
  }
`

export default Purchases
