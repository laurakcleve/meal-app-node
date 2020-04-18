import React, { useState } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
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
  const [addPurchase] = useMutation(ADD_PURCHASE_MUTATION, {
    onCompleted: () => {
      setDate('')
      setLocation('')
    },
  })

  const [date, setDate] = useState('')
  const [location, setLocation] = useState('')

  const submit = (event) => {
    event.preventDefault()
    if (date && location) {
      addPurchase({
        variables: {
          date,
          location,
        },
        refetchQueries: [{ query: PURCHASES_QUERY }],
      })
    }
  }

  return (
    <Styled.Container>
      <Sidebar />
      <Styled.List>
        <Form>
          <Input
            id="date"
            label="Date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <Input
            id="location"
            label="Location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            list={locationsData && locationsData.purchaseLocations}
          />
          <button type="submit" onClick={(e) => submit(e)}>
            SAVE
          </button>
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

const ADD_PURCHASE_MUTATION = gql`
  mutation addPurchase($date: String!, $location: String!) {
    addPurchase(date: $date, location: $location) {
      id
      date
      location {
        id
        name
      }
    }
  }
`

export default Purchases
