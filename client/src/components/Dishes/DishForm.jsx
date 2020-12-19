import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import * as Styled from './DishForm.styles'

const DishForm = ({
  dishName,
  dishTags,
  dishIngredientSets,
  handleSave,
  handleCancel,
  isSaveComplete,
  setIsSaveComplete,
}) => {
  const { data: dishTagsData } = useQuery(DISH_TAGS_QUERY)
  const { data: itemsData } = useQuery(ITEMS_QUERY)

  const [name, setName] = useState(dishName)
  const [tags, setTags] = useState(dishTags)
  const [tagText, setTagText] = useState('')
  const [ingredientSets, setIngredientSets] = useState(dishIngredientSets)

  useEffect(() => {
    if (isSaveComplete) {
      resetFields()
      setIsSaveComplete(false)
    }
  }, [isSaveComplete, setIsSaveComplete])

  const initialIngredientSets = [
    {
      id: Date.now(),
      isOptional: false,
      ingredients: [
        {
          id: Date.now(),
          item: {
            name: '',
          },
        },
      ],
    },
  ]

  const addTag = () => {
    if (tags.includes(tagText)) return

    if (tagText.length > 0) {
      setTags([...tags, tagText])
    }
    setTagText('')
  }

  const deleteTag = (tagToDelete) => {
    const newTags = [...tags].filter((tag) => tag !== tagToDelete)
    setTags(newTags)
  }

  const setIngredientText = (
    ingredientSetIndex,
    ingredientIndex,
    ingredientText
  ) => {
    const newIngredientSets = [...ingredientSets]
    newIngredientSets[ingredientSetIndex].ingredients[
      ingredientIndex
    ].item.name = ingredientText
    setIngredientSets(newIngredientSets)
  }

  const addSubstitute = (ingredientSetIndex) => {
    const newIngredientSets = [...ingredientSets]
    newIngredientSets[ingredientSetIndex].ingredients.push({
      id: Date.now(),
      item: {
        name: '',
      },
    })
    setIngredientSets(newIngredientSets)
  }

  const deleteIngredient = (ingredientSetIndex, ingredientIndex) => {
    const newIngredientSets = [...ingredientSets]

    if (newIngredientSets[ingredientSetIndex].ingredients.length > 1) {
      newIngredientSets[ingredientSetIndex].ingredients.splice(
        ingredientIndex,
        1
      )
    } else if (newIngredientSets.length > 1) {
      newIngredientSets.splice(ingredientSetIndex, 1)
    }

    setIngredientSets(newIngredientSets)
  }

  const handleOptionalCheck = (ingredientSetIndex) => {
    const newIngredientSets = [...ingredientSets]
    const oldOptionalValue = newIngredientSets[ingredientSetIndex].isOptional
    newIngredientSets[ingredientSetIndex].isOptional = !oldOptionalValue
    setIngredientSets(newIngredientSets)
  }

  const resetFields = () => {
    setName('')
    setTagText('')
    setTags([])
    setIngredientSets([])
  }

  return (
    <Styled.DishForm>
      <Styled.Name
        id="name"
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      ></Styled.Name>

      <Styled.Tags>
        <div className="label">Tags</div>

        {tags.length > 0 && (
          <ul>
            {tags.map((tag) => (
              <Styled.Tag key={tag}>
                {tag}
                <button type="button" onClick={() => deleteTag(tag)}>
                  <FontAwesomeIcon icon={faTimesCircle} size="lg" />
                </button>
              </Styled.Tag>
            ))}
          </ul>
        )}

        <Styled.TagInput
          id="tagText"
          value={tagText}
          list={
            dishTagsData && dishTagsData.dishTags
              ? dishTagsData.dishTags.filter((tag) => !tags.includes(tag.name))
              : []
          }
          onChange={(event) => setTagText(event.target.value)}
          onBlur={() => addTag()}
        />
      </Styled.Tags>

      <Styled.Ingredients>
        <div className="label">Ingredients</div>
        {ingredientSets.map((ingredientSet, ingredientSetIndex) => (
          <Styled.IngredientSet key={ingredientSet.id}>
            <div className="inputs">
              {ingredientSet.ingredients.map((ingredient, ingredientIndex) => (
                <Styled.IngredientInputWrapper key={ingredient.id}>
                  <Styled.IngredientInput
                    id={`ingredient${ingredientSet.id}-${ingredientIndex}`}
                    type="text"
                    value={ingredient.item.name}
                    list="itemList"
                    onChange={(event) =>
                      setIngredientText(
                        ingredientSetIndex,
                        ingredientIndex,
                        event.target.value
                      )
                    }
                  />

                  {(ingredientSet.ingredients.length > 1 ||
                    ingredientSets.length > 1) && (
                    <button
                      type="button"
                      onClick={() =>
                        deleteIngredient(ingredientSetIndex, ingredientIndex)
                      }
                    >
                      <FontAwesomeIcon icon={faTimesCircle} size="lg" />
                    </button>
                  )}
                </Styled.IngredientInputWrapper>
              ))}

              <Styled.Checkbox
                htmlFor={`isOptional${ingredientSet.id}`}
                className="checkbox"
              >
                <input
                  id={`isOptional${ingredientSet.id}`}
                  type="checkbox"
                  checked={ingredientSets[ingredientSetIndex].isOptional}
                  onChange={() => handleOptionalCheck(ingredientSetIndex)}
                />
                <div className="labelText">Optional</div>
              </Styled.Checkbox>
            </div>

            <Styled.AddSubstitute>
              <button
                type="button"
                onClick={() => addSubstitute(ingredientSetIndex)}
              >
                Add substitute
              </button>
            </Styled.AddSubstitute>
          </Styled.IngredientSet>
        ))}

        <button
          type="button"
          onClick={() =>
            setIngredientSets([...ingredientSets, initialIngredientSets[0]])
          }
        >
          Add ingredient
        </button>

        {itemsData && itemsData.items && (
          <datalist id="itemList">
            {itemsData.items.map((item) => (
              <option key={item.id}>{item.name}</option>
            ))}
          </datalist>
        )}
      </Styled.Ingredients>

      <Styled.ButtonsWrapper>
        <button
          type="button"
          onClick={() => {
            resetFields()
            handleCancel()
          }}
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={(event) => handleSave(event, { name, tags, ingredientSets })}
        >
          Save
        </button>
      </Styled.ButtonsWrapper>
    </Styled.DishForm>
  )
}

const DISH_TAGS_QUERY = gql`
  query dishTags {
    dishTags {
      id
      name
    }
  }
`

const ITEMS_QUERY = gql`
  query items {
    items {
      id
      name
    }
  }
`

DishForm.defaultProps = {
  dishName: '',
  dishTags: [],
  dishIngredientSets: [
    {
      id: Date.now(),
      isOptional: false,
      ingredients: [
        {
          id: Date.now(),
          item: {
            name: '',
          },
        },
      ],
    },
  ],
}

DishForm.propTypes = {
  dishName: PropTypes.string,
  dishTags: PropTypes.arrayOf(PropTypes.string),
  dishIngredientSets: PropTypes.arrayOf(PropTypes.shape({})),
  handleSave: PropTypes.func.isRequired,
  handleCancel: PropTypes.func.isRequired,
  isSaveComplete: PropTypes.bool.isRequired,
  setIsSaveComplete: PropTypes.func.isRequired,
}

export default DishForm
