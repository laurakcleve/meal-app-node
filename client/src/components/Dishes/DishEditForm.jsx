import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useMutation, gql } from '@apollo/client'

import DishForm from './DishForm'
import * as Styled from './DishEditForm.styles'

const DishEditForm = ({
  dishId,
  dishName,
  dishTags,
  isActiveDish,
  dishIngredientSets,
  setIsEditing,
}) => {
  const [isSaveComplete, setIsSaveComplete] = useState(false)

  const [updateDish] = useMutation(UPDATE_DISH_MUTATION, {
    onCompleted: () => {
      setIsEditing(false)
      setIsSaveComplete(true)
    },
  })

  const handleSave = (event, { name, tags, isActive, ingredientSets }) => {
    event.preventDefault()

    const newIngredientSets = ingredientSets.map((iSet) => {
      const { __typename, ...newISet } = iSet
      newISet.ingredients = newISet.ingredients.map((ingredient) => {
        const { __typename: ingredientTypename, ...newIngredient } = ingredient
        const { __typename: itemTypename, ...newItem } = ingredient.item
        newIngredient.item = newItem
        return newIngredient
      })
      return newISet
    })

    updateDish({
      variables: {
        id: dishId,
        name,
        tags,
        isActive,
        ingredientSets: newIngredientSets,
      },
    })
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  return (
    <Styled.Wrapper>
      <DishForm
        dishName={dishName}
        dishTags={dishTags}
        isActiveDish={isActiveDish}
        dishIngredientSets={dishIngredientSets}
        handleSave={handleSave}
        handleCancel={handleCancel}
        isSaveComplete={isSaveComplete}
        setIsSaveComplete={setIsSaveComplete}
      />
    </Styled.Wrapper>
  )
}

const UPDATE_DISH_MUTATION = gql`
  mutation updateDish(
    $id: ID!
    $name: String!
    $tags: [String]!
    $isActive: Boolean!
    $ingredientSets: [IngredientSetInput]!
  ) {
    updateDish(
      id: $id
      name: $name
      tags: $tags
      isActive: $isActive
      ingredientSets: $ingredientSets
    ) {
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
      isActiveDish
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

DishEditForm.defaultProps = {
  dishTags: [],
  dishIngredientSets: [],
}

DishEditForm.propTypes = {
  dishId: PropTypes.string.isRequired,
  dishName: PropTypes.string.isRequired,
  dishTags: PropTypes.arrayOf(PropTypes.string),
  isActiveDish: PropTypes.bool.isRequired,
  dishIngredientSets: PropTypes.arrayOf(PropTypes.shape({})),
  setIsEditing: PropTypes.func.isRequired,
}

export default DishEditForm
