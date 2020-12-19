import React, { useState } from 'react'
import PropTypes from 'prop-types'

import * as Styled from './DishDetails.styles'
import { formatDate } from '../../utils'
import DishEditForm from './DishEditForm'

const DishDetails = ({ dish }) => {
  const [datesExpanded, setDatesExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  return (
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
          <div>ID: {dish.id}</div>
          {dish.tags && (
            <Styled.Tags>
              <h3>Tags</h3>
              <ul>
                {dish.tags.map((tag) => (
                  <li key={tag.id}>{tag.name}</li>
                ))}
              </ul>
            </Styled.Tags>
          )}{' '}
          {dish.ingredientSets.length > 0 && (
            <Styled.Ingredients>
              <h3>Ingredients</h3>
              <ul>
                {dish.ingredientSets.map((ingredientSet) => (
                  <li key={ingredientSet.id}>
                    {ingredientSet.ingredients.map(
                      (ingredient, index) =>
                        `${ingredient.item.name}${
                          index < ingredientSet.ingredients.length - 1
                            ? '/'
                            : ''
                        }`
                    )}
                  </li>
                ))}
              </ul>
            </Styled.Ingredients>
          )}
          <Styled.Dates>
            <button
              type="button"
              onClick={() => setDatesExpanded(!datesExpanded)}
            >
              {datesExpanded ? 'Hide' : 'Show more dates...'}
            </button>
            <ul>
              {datesExpanded &&
                dish.dates.map((date) => (
                  <li key={date.id}>{formatDate(date.date)}</li>
                ))}
            </ul>
          </Styled.Dates>
          <Styled.Actions>
            <button type="button" onClick={() => setIsEditing(true)}>
              Edit
            </button>
          </Styled.Actions>
        </>
      )}
    </Styled.Container>
  )
}

DishDetails.propTypes = {
  dish: PropTypes.shape({
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
