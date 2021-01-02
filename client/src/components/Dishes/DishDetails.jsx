import React, { useState } from 'react'
import PropTypes from 'prop-types'

import * as Styled from './DishDetails.styles'
import { formatDate } from '../../utils'
import DishEditForm from './DishEditForm'
import Ingredient from './Ingredient'

const DishDetails = ({ dish }) => {
  const [datesExpanded, setDatesExpanded] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

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
                        />
                      ))}

                      {ingredientSet.isOptional ? '(optional)' : ''}
                    </li>
                  ))}
                </ul>
              </Styled.Ingredients>
            )}
            {dish.tags.length > 0 && (
              <Styled.Tags>
                <h3>Tags</h3>
                <ul>
                  {dish.tags.map((tag) => (
                    <li key={tag.id}>{tag.name}</li>
                  ))}
                </ul>
              </Styled.Tags>
            )}{' '}
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
    </>
  )
}

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
