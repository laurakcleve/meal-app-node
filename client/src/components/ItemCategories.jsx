import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import PropTypes from 'prop-types'

const ItemCategories = ({ selectedCategoryName, setSelectedCategoryName }) => {
  const { data, loading } = useQuery(ITEM_CATEGORIES_QUERY)

  return <div>Item Categories</div>
}

ItemCategories.propTypes = {
  selectedCategoryName: PropTypes.string.isRequired,
  setSelectedCategoryName: PropTypes.func.isRequired,
}

const ITEM_CATEGORIES_QUERY = gql`
  query itemCategories {
    itemCategories {
      id
      name
    }
  }
`

export default ItemCategories
