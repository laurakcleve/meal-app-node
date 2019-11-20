import React, { useEffect } from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import * as Styled from './Items.styles'
import Search from './Search'
import ListItem from './ListItem'

const Items = () => {
  const client = useApolloClient()
  const { data, loading } = useQuery(ITEMS_QUERY)
  const { data: searchedItemsData } = useQuery(SEARCHED_ITEMS_QUERY)

  useEffect(() => {
    if (data && data.items) {
      client.writeData({ data: { searchedItems: data.items } })
    }
  }, [client, data])

  return (
    <Styled.Container>
      {loading && <p>Loading...</p>}
      {searchedItemsData && searchedItemsData.searchedItems && (
        <>
          {data && data.items && <Search allItems={data.items} />}

          {searchedItemsData.searchedItems.map((item) => (
            <ListItem key={item.id} name={item.name} />
          ))}
        </>
      )}
    </Styled.Container>
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

const SEARCHED_ITEMS_QUERY = gql`
  query searchedItems {
    searchedItems @client {
      id
      name
    }
  }
`

export default Items
