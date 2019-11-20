import React, { useState, useEffect } from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import Container from './Search.styles'

const Search = () => {
  const client = useApolloClient()
  const [searchText, setSearchText] = useState('')

  useEffect(() => {
    const { items } = client.readQuery({ query: ITEMS_QUERY })

    const searchedItems = items.filter((item) => item.name.includes(searchText))

    client.writeQuery({
      query: gql`
        query searchedItems @client {
          searchedItems {
            id
            name
          }
        }
      `,
      data: { searchedItems },
    })
  }, [client, searchText])

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

const ITEMS_QUERY = gql`
  query items {
    items {
      id
      name
    }
  }
`

export default Search
