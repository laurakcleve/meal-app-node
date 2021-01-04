import React, { useState } from 'react'
import { useMutation, gql } from '@apollo/client'

import * as Styled from './DishAddForm.styles'
import DishForm from './DishForm'

const DishAddForm = ({ setIsAdding }) => {
  const [isSaveComplete, setIsSaveComplete] = useState(false)

  const [addDish] = useMutation(ADD_DISH_MUTATION, {
    onCompleted: () => setIsSaveComplete(true),
    update: (cache, { data: { addDish } }) => {
      const data = cache.readQuery({ query: DISHES_QUERY })
      cache.writeQuery({
        query: DISHES_QUERY,
        data: { dishes: [addDish, ...data.dishes] },
      })
    },
  })

  const handleSave = (event, { name, tags, ingredientSets }) => {
    event.preventDefault()
    addDish({
      variables: {
        name,
        tags,
        ingredientSets,
      },
    })
  }

  const handleCancel = () => {
    setIsAdding(false)
  }

  return (
    <Styled.Wrapper>
      <h3>New Dish</h3>
      <DishForm
        handleSave={handleSave}
        handleCancel={handleCancel}
        isSaveComplete={isSaveComplete}
        setIsSaveComplete={setIsSaveComplete}
      />
    </Styled.Wrapper>
  )
}

const ADD_DISH_MUTATION = gql`
  mutation addDish(
    $name: String!
    $tags: [String]
    $ingredientSets: [IngredientSetInput]!
  ) {
    addDish(name: $name, tags: $tags, ingredientSets: $ingredientSets) {
      id
      name
      isActiveDish
      dates {
        id
        date
      }
      ingredientSets {
        id
        isOptional
        ingredients {
          id
          item {
            id
            name
          }
        }
      }
      tags {
        id
        name
      }
    }
  }
`

const DISHES_QUERY = gql`
  query dishes {
    dishes {
      id
      name
      tags {
        id
        name
      }
      ingredientSets {
        id
        isOptional
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

export default DishAddForm
