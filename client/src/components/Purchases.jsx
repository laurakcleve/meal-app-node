import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import * as Styled from './Layout.styles'
import Sidebar from './Sidebar'
import Input from './Input'
import Form from './Form'

const Purchases = () => {
  const { data, loading, error } = useQuery(PURCHASE_LOCATIONS_QUERY)

  useEffect(() => {
    console.log({ data })
  })

  return (
    <Styled.Container>
      <Sidebar />
      <Styled.List>
        <Form>
          <Input id="date" label="Date" type="date" />
          <Input
            id="location"
            label="Location"
            type="text"
            list={data && data.purchaseLocations}
          />
        </Form>
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
