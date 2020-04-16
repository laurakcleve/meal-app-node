import React, { useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import moment from 'moment'

import * as Styled from './Layout.styles'
import Sidebar from './Sidebar'
import Input from './Input'
import Form from './Form'
import ListItem from './ListItem/ListItem.styles'
import TitleBar from './ListItem/TitleBar'
import TitleName from './ListItem/TitleName'

const Purchases = () => {
  const { data: locationsData, loading, error } = useQuery(PURCHASE_LOCATIONS_QUERY)
  const { data: purchasesData } = useQuery(PURCHASES_QUERY)

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
            list={locationsData && locationsData.purchaseLocations}
          />
        </Form>

        {purchasesData &&
          purchasesData.purchases &&
          purchasesData.purchases.map((purchase) => (
            <ListItem>
              <TitleBar>
                <TitleName name={purchase.location.name} />
                {moment(Number(purchase.date)).format('M/D/YY')}
              </TitleBar>
            </ListItem>
          ))}
      </Styled.List>
    </Styled.Container>
  )
}

const PURCHASES_QUERY = gql`
  query purchases {
    purchases {
      id
      date
      location {
        id
        name
      }
    }
  }
`

const PURCHASE_LOCATIONS_QUERY = gql`
  query purchaseLocations {
    purchaseLocations {
      id
      name
    }
  }
`

export default Purchases
