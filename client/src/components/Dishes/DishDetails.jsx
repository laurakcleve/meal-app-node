import React, { useState } from 'react'

import * as Styled from './DishDetails.styles'
import { formatDate } from '../../utils'

const DishDetails = ({ dish }) => {
  const [datesExpanded, setDatesExpanded] = useState(false)

  return (
    <Styled.Container>
      {dish.tags && (
        <Styled.Tags>
          <p>Tags</p>
          {dish.tags.map((tag) => (
            <p>{tag.name}</p>
          ))}
        </Styled.Tags>
      )}

      {dish.ingredientSets.length > 0 && (
        <Styled.Ingredients>
          <p>Ingredients</p>
          {dish.ingredientSets.map((ingredientSet) => (
            <p>
              {ingredientSet.ingredients.map(
                (ingredient, index) =>
                  `${ingredient.item.name}${
                    index < ingredientSet.ingredients.length - 1 ? '/' : ''
                  }`
              )}
            </p>
          ))}
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
