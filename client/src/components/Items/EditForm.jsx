import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

import * as Styled from './EditForm.styles'

const EditForm = ({ item, setIsEditing, history }) => {
  const initialCategory = item && item.category ? item.category.name : ''
  const initialDefaultLocation =
    item && item.defaultLocation ? item.defaultLocation.name : ''
  const initialDefaultShelflife =
    item && item.defaultShelflife ? item.defaultShelflife.toString() : ''

  const [name, setName] = useState(item ? item.name : '')
  const [category, setCategory] = useState(initialCategory)
  const [defaultShelflife, setDefaultShelflife] = useState(
    initialDefaultShelflife
  )
  const [defaultLocation, setDefaultLocation] = useState(initialDefaultLocation)
  const [itemType, setItemType] = useState(item ? item.itemType : '')

  const { data: categoriesData } = useQuery(CATEGORIES_QUERY)

  const { data: itemLocationsData } = useQuery(ITEM_LOCATIONS_QUERY)

  const [editItem] = useMutation(EDIT_ITEM_MUTATION, {
    onCompleted: () => setIsEditing(false),
  })

  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    onCompleted: () => history.push('/items'),
  })

  const submitEdit = (event) => {
    event.preventDefault()

    /* State only holds the names of category and location, 
       we need to get the IDs to send to the database */
    const foundCategory =
      categoriesData &&
      categoriesData.itemCategories.find(
        (itemCategory) => itemCategory.name === category
      )
    const categoryId = foundCategory ? foundCategory.id : ''

    const foundDefaultLocation =
      itemLocationsData &&
      itemLocationsData.itemLocations.find(
        (itemLocation) => itemLocation.name === defaultLocation
      )
    const defaultLocationId = foundDefaultLocation
      ? foundDefaultLocation.id
      : ''

    editItem({
      variables: {
        id: Number(item.id),
        name,
        categoryId: Number(categoryId) || null,
        defaultLocationId: Number(defaultLocationId) || null,
        defaultShelflife: Number(defaultShelflife) || null,
        itemType,
      },
    })
  }

  const submitDelete = (event) => {
    event.preventDefault()
    if (window.confirm('Delete item?')) {
      deleteItem({ variables: { id: item.id } })
    }
  }

  return (
    <Styled.EditForm onSubmit={(event) => submitEdit(event)}>
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
          list={
            categoriesData && categoriesData.itemCategories
              ? categoriesData.itemCategories
              : []
          }
        ></Styled.Category>

        <Styled.Label>Item Type</Styled.Label>
        <Styled.ItemType
          value={itemType}
          onChange={(event) => setItemType(event.target.value)}
        >
          <option value="baseItem">baseItem</option>
          <option value="dish">dish</option>
          <option value="nonFoodItem">nonFoodItem</option>
        </Styled.ItemType>

        <Styled.Label>Default shelflife (days)</Styled.Label>
        <Styled.DefaultShelflife
          id="defaultShelflife"
          value={defaultShelflife.toString()}
          onChange={(event) => setDefaultShelflife(event.target.value)}
        ></Styled.DefaultShelflife>

        <Styled.Label>Default location</Styled.Label>
        <Styled.Category
          id="defaultLocation"
          value={defaultLocation}
          onChange={(event) => setDefaultLocation(event.target.value)}
          list={
            itemLocationsData && itemLocationsData.itemLocations
              ? itemLocationsData.itemLocations
              : []
          }
        ></Styled.Category>

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

const EDIT_ITEM_MUTATION = gql`
  mutation editItem(
    $id: ID!
    $name: String!
    $categoryId: Int
    $defaultLocationId: Int
    $defaultShelflife: Int
    $itemType: String!
  ) {
    editItem(
      id: $id
      name: $name
      categoryId: $categoryId
      defaultLocationId: $defaultLocationId
      defaultShelflife: $defaultShelflife
      itemType: $itemType
    ) {
      id
      name
      category {
        id
        name
      }
      defaultLocation {
        id
        name
      }
      defaultShelflife
      itemType
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
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    category: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    defaultLocation: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }),
    defaultShelflife: PropTypes.string.isRequired,
    itemType: PropTypes.string.isRequired,
  }).isRequired,
  setIsEditing: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default EditForm
