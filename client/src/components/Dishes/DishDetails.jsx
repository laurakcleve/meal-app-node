import React, { useState } from 'react'

import * as Styled from './DishDetails.styles'
import { formatDate } from '../../utils'

const DishDetails = ({ dish }) => {
  const [datesExpanded, setDatesExpanded] = useState(false)

  return (
    <Styled.Container>
      {dish.tags && (
        <Styled.Tags>
          <h3>Tags</h3>
          <ul>
            {dish.tags.map((tag) => (
              <li>{tag.name}</li>
            ))}
          </ul>
        </Styled.Tags>
      )}

      {dish.ingredientSets.length > 0 && (
        <Styled.Ingredients>
          <h3>Ingredients</h3>
          <ul>
            {dish.ingredientSets.map((ingredientSet) => (
              <li>
                {ingredientSet.ingredients.map(
                  (ingredient, index) =>
                    `${ingredient.item.name}${
                      index < ingredientSet.ingredients.length - 1 ? '/' : ''
                    }`
                )}
              </li>
            ))}
          </ul>
        </Styled.Ingredients>
      )}

      <Styled.Dates>
        <button type="button" onClick={() => setDatesExpanded(!datesExpanded)}>
          {datesExpanded ? 'Hide' : 'Show more dates...'}
        </button>
        {datesExpanded &&
          dish.dates.map((date) => <p>{formatDate(date.date)}</p>)}
      </Styled.Dates>
    </Styled.Container>
  )
}

export default DishDetails
