import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import PropTypes from 'prop-types'

import * as Styled from './InventoryLocations.styles'

const InventoryLocations = ({ selectedLocationName, setSelectedLocationName }) => {
  const { data, loading } = useQuery(LOCATIONS_QUERY)
  return (
    <Styled.Container>
      {loading && <div>Loading...</div>}
      <ul>
        {data &&
          data.itemLocations &&
          [{ id: 1000, name: 'all' }].concat(data.itemLocations).map((location) => (
            <li
              key={location.id}
              className={location.name === selectedLocationName ? 'selected' : null}
            >
              <button
                type="button"
                onClick={() => setSelectedLocationName(location.name)}
              >
                {location.name}
              </button>
            </li>
          ))}
      </ul>
    </Styled.Container>
  )
}

const LOCATIONS_QUERY = gql`
  query itemLocations {
    itemLocations {
      id
      name
    }
  }
`

InventoryLocations.propTypes = {
  selectedLocationName: PropTypes.string.isRequired,
  setSelectedLocationName: PropTypes.func.isRequired,
}

export default InventoryLocations
