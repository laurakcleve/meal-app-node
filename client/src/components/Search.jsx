import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

import * as Styled from './Search.styles'

const Search = ({ items, set }) => {
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const filteredItems = items.filter((item) => {
      if (item.name) {
        return item.name.includes(searchText)
      }
      return item.item.name.includes(searchText)
    })
    set(filteredItems)
  }, [items, searchText, set])

  return (
    <Styled.Container>
      <span>Search</span>
      <input
        type="text"
        onChange={(event) => setSearchText(event.target.value)}
        value={searchText}
      />
      <Styled.Button type="button" onClick={() => setSearchText('')}>
        <FontAwesomeIcon icon={faTimes} />
      </Styled.Button>
    </Styled.Container>
  )
}

Search.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.oneOfType([
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      }),
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        item: PropTypes.shape({
          id: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
      }),
    ]).isRequired
  ).isRequired,
  set: PropTypes.func.isRequired,
}

export default Search
