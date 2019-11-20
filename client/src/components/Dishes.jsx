import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import * as Styled from './Layout.styles'
import Sidebar from './Sidebar'
import Search from './Search'
import ListItem from './ListItem'

const Dishes = () => {
  const client = useApolloClient()
  const { data, loading } = useQuery(DISHES_QUERY)
  const { data: filteredDishesData } = useQuery(FILTERED_DISHES_QUERY)

  const [selectedItemID, setSelectedItemID] = useState('')

  useEffect(() => {
    if (data && data.dishes) {
      client.writeData({ data: { filteredDishes: data.dishes } })
    }
  }, [client, data])

  return (
    <Styled.Container>
      <Sidebar />
      <Styled.List>
        {loading && <p>Loading...</p>}

        {filteredDishesData && filteredDishesData.filteredDishes && (
          <>
            {data && data.dishes && (
              <Search
                readQuery={DISHES_QUERY}
                writeQuery={FILTERED_DISHES_QUERY}
                listName="dishes"
                cacheListName="filteredDishes"
              />
            )}

            {filteredDishesData.filteredDishes.map((dish) => (
              <ListItem
                key={dish.id}
                item={dish}
                selectedItemID={selectedItemID}
                setSelectedItemID={setSelectedItemID}
              />
            ))}
          </>
        )}
      </Styled.List>
    </Styled.Container>
  )
}

const DISHES_QUERY = gql`
  query dishes {
    dishes {
      id
      name
    }
  }
`

const FILTERED_DISHES_QUERY = gql`
  query filteredDishes {
    filteredDishes @client {
      id
      name
    }
  }
`

export default Dishes
