import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { gql } from 'apollo-boost'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'

import * as Styled from './EditForm.styles'

const EditForm = ({ item, setIsEditing, history }) => {
  const initialCategory = item.category ? item.category.name : ''
  const initialDefaultLocation = item.defaultLocation
    ? item.defaultLocation.name
    : ''
  const initialDefaultShelflife = item.defaultShelflife || ''

  const [name, setName] = useState(item.name)
  const [category, setCategory] = useState(initialCategory)
  const [defaultShelflife, setDefaultShelflife] = useState(
    initialDefaultShelflife
  )
  const [defaultLocation, setDefaultLocation] = useState(initialDefaultLocation)
  const [itemType, setItemType] = useState(item.itemType)

  const [getCategories, { data: categoriesData }] = useLazyQuery(
    CATEGORIES_QUERY
  )

  const [getItemLocations, { data: itemLocationsData }] = useLazyQuery(
    ITEM_LOCATIONS_QUERY
  )

  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    onCompleted: () => history.push('/items'),
  })

  console.log(item)

  const submitDelete = (event) => {
    event.preventDefault()
    if (window.confirm('Delete item?')) {
      deleteItem({ variables: { id: item.id } })
    }
  }

  return (
    <Styled.EditForm>
      <Styled.FormContainer>
        <Styled.Label>Name</Styled.Label>
        <Styled.Name
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        ></Styled.Name>

        <Styled.Label>Category</Styled.Label>
        <Styled.Category
          id="category"
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          onFocus={() => getCategories()}
          list={
            categoriesData && categoriesData.itemCategories
              ? categoriesData.itemCategories
              : []
          }
        ></Styled.Category>

        <Styled.Label>Default location</Styled.Label>
        <Styled.Category
          id="defaultLocation"
          value={defaultLocation}
          onChange={(event) => setDefaultLocation(event.target.value)}
          onFocus={() => getItemLocations()}
          list={
            itemLocationsData && itemLocationsData.itemLocations
              ? itemLocationsData.itemLocations
              : []
          }
        ></Styled.Category>

        <Styled.Label>Default shelflife</Styled.Label>
        <Styled.DefaultShelflife
          id="defaultShelflife"
          value={defaultShelflife.toString()}
          onChange={(event) => setDefaultShelflife(event.target.value)}
        ></Styled.DefaultShelflife>

        <Styled.Label>Item Type</Styled.Label>
        <Styled.ItemType
          value={itemType}
          onChange={(event) => setItemType(event.target.value)}
        >
          <option value="baseItem">baseItem</option>
          <option value="dish">dish</option>
          <option value="nonFoodItem">nonFoodItem</option>
        </Styled.ItemType>

        <div>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>

          <button type="submit">Save</button>
        </div>
      </Styled.FormContainer>

      <Styled.ButtonContainer>
        <button type="button" onClick={(event) => submitDelete(event)}>
          Delete
        </button>
      </Styled.ButtonContainer>
    </Styled.EditForm>
  )
}

const CATEGORIES_QUERY = gql`
  query itemCategories {
    itemCategories {
      id
      name
    }
  }
`

const ITEM_LOCATIONS_QUERY = gql`
  query itemLocations {
    itemLocations {
      id
      name
    }
  }
`

const DELETE_ITEM_MUTATION = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id)
  }
`

EditForm.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    defaultShelflife: PropTypes.number,
    defaultLocation: PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }),
    itemType: PropTypes.string.isRequired,
  }).isRequired,
}

export default EditForm
