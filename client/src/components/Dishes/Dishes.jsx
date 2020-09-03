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
  const [selectedItemID, setSelectedItemID] = useState('')
  const [selectedTagNames, setSelectedTagNames] = useState(['all'])
  const [match, setMatch] = useState('all')
  const [isActiveRotation, setIsActiveRotation] = useState(true)
  const [searchText, setSearchText] = useState('')

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
      const matchesActive = (dish) => {
        return (
          (isActiveRotation && dish.isActiveDish) ||
          (!isActiveRotation && !dish.isActiveDish)
        )
      }

      const matchesTags = (dish) => {
        if (selectedTagNames.includes('all')) {
          return true
        }
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
      }

      let newDisplayedDishes = data.dishes.filter((dish) => {
        return matchesActive(dish) && matchesTags(dish)
      })

      // Search
      if (searchText.length > 0)
        newDisplayedDishes = newDisplayedDishes.filter((dish) => {
          return dish.name.includes(searchText)
        })

      setDisplayedDishes(newDisplayedDishes)
    }
  }, [
    data,
    isActiveRotation,
    match,
    searchText,
    searchText.length,
    selectedTagNames,
  ])

  return (
    <Layout.Container>
      <Sidebar>
        <Styled.CheckboxLabel htmlFor="isActiveRotation" className="checkbox">
          <input
            id="isActiveRotation"
            type="checkbox"
            checked={isActiveRotation}
            onChange={() => setIsActiveRotation(!isActiveRotation)}
          />
          <div className="labelText">Active rotation</div>
        </Styled.CheckboxLabel>

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
            <Search setSearchText={setSearchText} searchText={searchText} />
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
      isActiveDish
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
