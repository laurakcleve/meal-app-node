import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { gql } from 'apollo-boost'
import { useMutation } from '@apollo/react-hooks'

import * as Styled from './DishDetails.styles'
import { formatDate } from '../../utils'
import DishEditForm from './DishEditForm'
import Ingredient from './Ingredient'

const DishDetails = ({ dish }) => {
  const [datesExpanded, setDatesExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const [newDateText, setNewDateText] = useState('')

  const [addDishDate] = useMutation(ADD_DISH_DATE_MUTATION, {
    onCompleted: () => setNewDateText(''),
    update: (cache, { data: { addDishDate } }) => {
      const data = cache.readQuery({ query: DISHES_QUERY })

      const updatedDish = data.dishes.find((d) => d.id === dish.id)
      updatedDish.dates = [...updatedDish.dates, addDishDate]
      updatedDish.dates.sort((a, b) => {
        if (a.date > b.date) return -1
        if (a.date < b.date) return 1
        return 0
      })

      const updatedDishes = [...data.dishes]
      updatedDishes.splice(data.dishes.indexOf(updatedDish), 1)

      cache.writeQuery({
        query: DISHES_QUERY,
        data: { dishes: [updatedDish, ...updatedDishes] },
      })
    },
  })

  const dateListItem = (date) => <li key={date.id}>{formatDate(date.date)}</li>

  const saveNewDate = (event) => {
    event.preventDefault()
    addDishDate({
      variables: {
        dishId: dish.id,
        date: newDateText,
      },
    })
  }

  return (
    <>
      <div style={{ color: '#c1c1c1', marginBottom: '20px' }}>
        ID: {dish.id}
      </div>
      <Styled.Container>
        {isEditing ? (
          <DishEditForm
            dishId={dish.id}
            dishName={dish.name}
            dishTags={dish.tags.map((tag) => tag.name)}
            dishIngredientSets={dish.ingredientSets}
            setIsEditing={setIsEditing}
          />
        ) : (
          <>
            {dish.ingredientSets.length > 0 && (
              <Styled.Ingredients>
                <h3>Ingredients</h3>
                <ul>
                  {dish.ingredientSets.map((ingredientSet) => (
                    <li key={ingredientSet.id}>
                      {ingredientSet.ingredients.map((ingredient, index) => (
                        <Ingredient
                          key={ingredient.id}
                          ingredient={ingredient}
                          indented={index > 0}
                          notLast={index < ingredientSet.ingredients.length - 1}
                          isInInventory={ingredient.isInInventory}
                        />
                      ))}

                      {ingredientSet.isOptional ? '(optional)' : ''}
                    </li>
                  ))}
                </ul>
              </Styled.Ingredients>
            )}
            <Styled.Tags>
              {dish.tags.length > 0 && (
                <>
                  <h3>Tags</h3>
                  <ul>
                    {dish.tags.map((tag) => (
                      <li key={tag.id}>{tag.name}</li>
                    ))}
                  </ul>
                </>
              )}
            </Styled.Tags>

            <Styled.Dates>
              <>
                <Styled.DateForm>
                  <label htmlFor="newDateText">
                    Add date
                    <input
                      id="newDateText"
                      type="date"
                      value={newDateText}
                      onChange={(event) => setNewDateText(event.target.value)}
                    />
                  </label>
                  <button type="submit" onClick={(event) => saveNewDate(event)}>
                    Save
                  </button>
                </Styled.DateForm>

                {dish.dates.length > 1 && (
                  <Styled.DateList>
                    <ul>
                      {!datesExpanded
                        ? dish.dates
                            .slice(0, 3)
                            .map((date) => dateListItem(date))
                        : dish.dates.map((date) => dateListItem(date))}
                    </ul>
                    {dish.dates.length > 3 && (
                      <button
                        type="button"
                        onClick={() => setDatesExpanded(!datesExpanded)}
                      >
                        {datesExpanded ? 'Hide' : 'Show more dates...'}
                      </button>
                    )}
                  </Styled.DateList>
                )}
              </>
            </Styled.Dates>
          </>
        )}
      </Styled.Container>
      <Styled.Actions>
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      </Styled.Actions>
    </>
  )
}

const ADD_DISH_DATE_MUTATION = gql`
  mutation addDishDate($dishId: ID!, $date: String!) {
    addDishDate(dishId: $dishId, date: $date) {
      id
      date
    }
  }
`

const DISH_QUERY = gql`
  query dish($id: ID!) {
    dish(id: $id) {
      id
      dates {
        id
        date
      }
    }
  }
`

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
        isOptional
        ingredients {
          id
          isInInventory
          item {
            id
            name
          }
        }
      }
    }
  }
`

DishDetails.propTypes = {
  dish: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ),
    ingredientSets: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        ingredients: PropTypes.arrayOf(
          PropTypes.shape({
            id: PropTypes.string.isRequired,
            item: PropTypes.shape({
              id: PropTypes.string.isRequired,
              name: PropTypes.string.isRequired,
            }),
          })
        ).isRequired,
      })
    ),
    dates: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        date: PropTypes.string.isRequired,
      })
    ),
  }).isRequired,
}

export default DishDetails
