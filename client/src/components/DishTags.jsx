import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import PropTypes from 'prop-types'

import SidebarList from './SidebarList'

const DishTags = ({ selectedTagName, setSelectedTagName }) => {
  const { data, loading } = useQuery(DISH_TAGS_QUERY)

  return (
    <>
      {loading && <div>Loading...</div>}
      {data && data.dishTags && (
        <SidebarList
          items={[{ id: '1000', name: 'all' }].concat(data.dishTags)}
          selectedName={selectedTagName}
          setSelectedName={setSelectedTagName}
        />
      )}
    </>
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

DishTags.propTypes = {
  selectedTagName: PropTypes.string.isRequired,
  setSelectedTagName: PropTypes.func.isRequired,
}

export default DishTags
