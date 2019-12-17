import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import * as Styled from './Layout.styles'
import Sidebar from './Sidebar'
import Search from './Search'
import ListItem from './ListItem'
import DishTags from './DishTags'

const Dishes = () => {
  const [displayedDishes, setDisplayedDishes] = useState([])
  const [filteredDishes, setFilteredDishes] = useState([])
  const [searchedDishes, setSearchedDishes] = useState([])
  const [selectedItemID, setSelectedItemID] = useState('')
  const [selectedTagNames, setSelectedTagNames] = useState(['all'])
  const [match, setMatch] = useState('all')

  const { data, loading } = useQuery(DISHES_QUERY)

  useEffect(() => {
    if (data && data.dishes) {
      let newFilteredDishes
      if (selectedTagNames.includes('all')) {
        newFilteredDishes = data.dishes
      } else {
        newFilteredDishes = data.dishes.filter((dish) => {
          if (dish.tags && dish.tags.length <= 0) return false
          if (match === 'all') {
            return selectedTagNames.every((tagName) =>
              dish.tags.map((tag) => tag.name).includes(tagName)
            )
          }
          if (match === 'any') {
            return dish.tags
              .map((tag) => tag.name)
              .some((tagName) => selectedTagNames.includes(tagName))
          }
          return false
        })
      }
      setFilteredDishes(newFilteredDishes)
    }
  }, [data, match, selectedTagNames])

  useEffect(() => {
    if (searchedDishes.length > 0) setDisplayedDishes(filteredDishes)
  }, [searchedDishes.length, filteredDishes])

  useEffect(() => {
    setDisplayedDishes(searchedDishes)
  }, [searchedDishes])

  return (
    <Styled.Container>
      <Sidebar>
        <DishTags
          selectedTagNames={selectedTagNames}
          setSelectedTagNames={setSelectedTagNames}
          match={match}
          setMatch={setMatch}
        />
      </Sidebar>
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
      tags {
        id
        name
      }
    }
  }
`

export default Dishes
