import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import * as Layout from '../Layout.styles'
import * as Styled from './Dishes.styles'
import Sidebar from '../Sidebar'
import Search from '../Search'
import ListItem from '../ListItem'
import DishDetails from './DishDetails'
import DishTags from './DishTags'
import Expander from '../Expander'
import { formatDate } from '../../utils'

const Dishes = () => {
  const [displayedDishes, setDisplayedDishes] = useState([])
  const [filteredDishes, setFilteredDishes] = useState([])
  const [searchedDishes, setSearchedDishes] = useState([])
  const [selectedItemID, setSelectedItemID] = useState('')
  const [selectedTagNames, setSelectedTagNames] = useState(['all'])
  const [match, setMatch] = useState('all')
  const [isActive, setIsActive] = useState(true)

  const { data, loading } = useQuery(DISHES_QUERY)

  const toggleItemOpen = (id) => {
    if (selectedItemID === id) {
      setSelectedItemID('')
    } else {
      setSelectedItemID(id)
    }
  }

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
    <Layout.Container>
      <Sidebar>
        <label htmlFor="isActive" className="checkbox">
          <input
            type="checkbox"
            name="isActive"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
          />
          <div className="labelText">Active rotation</div>
        </label>

        <DishTags
          selectedTagNames={selectedTagNames}
          setSelectedTagNames={setSelectedTagNames}
          match={match}
          setMatch={setMatch}
        />
      </Sidebar>

      <Layout.List>
        {loading && <p>Loading...</p>}

        <>
          {data && data.dishes && (
            <Search items={filteredDishes} set={setSearchedDishes} />
          )}

          {displayedDishes.map((dish) => (
            <ListItem
              key={dish.id}
              onClick={() => toggleItemOpen(dish.id)}
              expander={
                selectedItemID === dish.id && (
                  <Expander>
                    <DishDetails dish={dish} />
                  </Expander>
                )
              }
            >
              <Styled.Name>{dish.name}</Styled.Name>
              {dish.dates.length > 0 && (
                <Styled.Date>{formatDate(dish.dates[0].date)}</Styled.Date>
              )}
            </ListItem>
          ))}
        </>
      </Layout.List>
    </Layout.Container>
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
      dates {
        id
        date
      }
      ingredientSets {
        id
        ingredients {
          id
          item {
            id
            name
          }
        }
      }
    }
  }
`

export default Dishes
