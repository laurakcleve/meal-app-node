import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import * as Styled from './Layout.styles'
import Search from './Search'
import ListItem from './ListItem'

const Dishes = () => {
  const client = useApolloClient()
  const { data, loading } = useQuery(DISHES_QUERY)
  const { data: searchedDishesData } = useQuery(SEARCHED_DISHES_QUERY)

  const [selectedItemID, setSelectedItemID] = useState('')

  useEffect(() => {
    if (data && data.dishes) {
      client.writeData({ data: { searchedDishes: data.dishes } })
    }
  }, [client, data])

  return (
    <Styled.Container>
      {loading && <p>Loading...</p>}

      {searchedDishesData && searchedDishesData.searchedDishes && (
        <>
          {data && data.dishes && (
            <Search
              readQuery={DISHES_QUERY}
              writeQuery={SEARCHED_DISHES_QUERY}
              listName="dishes"
              cacheListName="searchedDishes"
            />
          )}

          {searchedDishesData.searchedDishes.map((dish) => (
            <ListItem
              key={dish.id}
              item={dish}
              selectedItemID={selectedItemID}
              setSelectedItemID={setSelectedItemID}
            />
          ))}
        </>
      )}
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

const SEARCHED_DISHES_QUERY = gql`
  query searchedDishes {
    searchedDishes @client {
      id
      name
    }
  }
`

export default Dishes
