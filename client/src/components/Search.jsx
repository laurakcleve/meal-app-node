import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import PropTypes from 'prop-types'

import Container from './Search.styles'

const Search = ({ readQuery, writeQuery, listName, cacheListName }) => {
  const client = useApolloClient()
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const data = client.readQuery({ query: readQuery })

    const filteredList = data[listName].filter((item) => {
      if (item.name) {
        return item.name.includes(searchText)
      }
      return item.item.name.includes(searchText)
    })

    const newData = { ...data }
    newData[cacheListName] = filteredList

    client.writeQuery({
      query: writeQuery,
      data: newData,
    })
  }, [cacheListName, client, listName, readQuery, searchText, writeQuery])

  return (
    <Container>
      <span>Search</span>
      <input
        type="text"
        onChange={(event) => setSearchText(event.target.value)}
        value={searchText}
      />
    </Container>
  )
}

Search.propTypes = {
  readQuery: PropTypes.shape({}).isRequired,
  writeQuery: PropTypes.shape({}).isRequired,
  listName: PropTypes.string.isRequired,
  cacheListName: PropTypes.string.isRequired,
}

export default Search
