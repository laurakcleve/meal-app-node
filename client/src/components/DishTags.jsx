import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import PropTypes from 'prop-types'

import SidebarListMulti from './SidebarListMulti'

const DishTags = ({ selectedTagNames, setSelectedTagNames, setMatch }) => {
  const { data, loading } = useQuery(DISH_TAGS_QUERY)

  return (
    <>
      {loading && <div>Loading...</div>}
      {data && data.dishTags && (
        <>
          <SidebarListMulti
            items={[{ id: '1000', name: 'all' }].concat(data.dishTags)}
            selectedNames={selectedTagNames}
            setSelectedNames={setSelectedTagNames}
          />
          <button type="button" onClick={() => setMatch('all')}>
            Match all
          </button>
          <button type="button" onClick={() => setMatch('any')}>
            Match any
          </button>
        </>
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
  selectedTagNames: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  setSelectedTagNames: PropTypes.func.isRequired,
  setMatch: PropTypes.func.isRequired,
}

export default DishTags
