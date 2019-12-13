import React, { useState, useEffect } from 'react'
import { useApolloClient, useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import * as Styled from './Layout.styles'
import Sidebar from './Sidebar'
import Search from './Search'
import ListItem from './ListItem'

const Dishes = () => {
  const [displayedDishes, setDisplayedDishes] = useState([])
  const [filteredDishes, setFilteredDishes] = useState([])
  const [searchedDishes, setSearchedDishes] = useState([])
  const [selectedItemID, setSelectedItemID] = useState('')

  const { data, loading } = useQuery(DISHES_QUERY)

  useEffect(() => {
    if (data && data.dishes) {
      setFilteredDishes(data.dishes)
    }
  }, [data])

  useEffect(() => {
    if (searchedDishes.length > 0) setDisplayedDishes(filteredDishes)
  }, [searchedDishes.length, filteredDishes])

  useEffect(() => {
    setDisplayedDishes(searchedDishes)
  }, [searchedDishes])

  return (
    <Styled.Container>
      <Sidebar />
      <Styled.List>
        {loading && <p>Loading...</p>}

        <>
          {data && data.dishes && (
            <Search items={filteredDishes} set={setSearchedDishes} />
          )}

          {displayedDishes.map((dish) => (
            <ListItem
              key={dish.id}
              item={dish}
              selectedItemID={selectedItemID}
              setSelectedItemID={setSelectedItemID}
            />
          ))}
        </>
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

export default Dishes
