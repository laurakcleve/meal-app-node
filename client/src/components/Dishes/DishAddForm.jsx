import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

import * as Styled from './DishAddForm.styles'

const DishAddForm = () => {
  const initialIngredientSet = [
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

  const { data: dishTagsData } = useQuery(DISH_TAGS_QUERY)
  const { data: itemsData } = useQuery(ITEMS_QUERY)

  const [addDish] = useMutation(ADD_DISH_MUTATION, {
    onCompleted: () => {
      setName('')
      setTagText('')
      setTags([])
      setIngredientSets(initialIngredientSet)
    },
    update: (cache, { data: { addDish } }) => {
      const data = cache.readQuery({ query: DISHES_QUERY })
      cache.writeQuery({
        query: DISHES_QUERY,
        data: { dishes: [addDish, ...data.dishes] },
      })
    },
  })

  const [name, setName] = useState('')
  const [tagText, setTagText] = useState('')
  const [tags, setTags] = useState([])
  const [ingredientSets, setIngredientSets] = useState(initialIngredientSet)

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

  const saveDish = (event) => {
    event.preventDefault()
    addDish({
      variables: {
        name,
        tags,
        ingredientSets,
      },
    })
  }

  return (
    <Styled.AddForm>
      <Styled.Name
        id="name"
        label="Name"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />

      <div className="tags">
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
      </div>

      <div style={{ width: '100%' }}>
        <div className="label ingredients">Ingredients</div>

        {ingredientSets.map((ingredientSet, ingredientSetIndex) => (
          <div key={ingredientSet.id} className="ingredient-set">
            <div className="inputs">
              {ingredientSet.ingredients.map((ingredient, ingredientIndex) => (
                <div key={ingredient.id} className="ingredient-input">
                  <Styled.IngredientInput
                    id={`ingredient${ingredientSetIndex}-${ingredientIndex}`}
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
                </div>
              ))}

              <Styled.Checkbox
                htmlFor={`isOptional${ingredientSetIndex}`}
                className="checkbox"
              >
                <input
                  id={`isOptional${ingredientSetIndex}`}
                  type="checkbox"
                  checked={ingredientSets[ingredientSetIndex].isOptional}
                  onChange={() => handleOptionalCheck(ingredientSetIndex)}
                />
                <div className="labelText">Optional</div>
              </Styled.Checkbox>
            </div>

            <div className="add-substitute">
              <button
                type="button"
                onClick={() => addSubstitute(ingredientSetIndex)}
              >
                Add substitute
              </button>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={() =>
            setIngredientSets([...ingredientSets, initialIngredientSet[0]])
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
      </div>

      <button type="submit" onClick={(event) => saveDish(event)}>
        Save
      </button>
    </Styled.AddForm>
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
