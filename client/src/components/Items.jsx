import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import * as Styled from './Layout.styles'
import Sidebar from './Sidebar'
import Search from './Search'
import ListItem from './ListItem'

const Items = () => {
  const client = useApolloClient()
  const [selectedItemID, setSelectedItemID] = useState('182')
  const { data, loading } = useQuery(ITEMS_QUERY)
  const { data: searchedItemsData } = useQuery(SEARCHED_ITEMS_QUERY)

  useEffect(() => {
    if (data && data.items) {
      client.writeData({ data: { searchedItems: data.items } })
    }
  }, [client, data])

  return (
    <Styled.Container>
      <Sidebar />
      <Styled.List>
        {loading && <p>Loading...</p>}

        {searchedItemsData && searchedItemsData.searchedItems && (
          <>
            {data && data.items && (
              <Search
                readQuery={ITEMS_QUERY}
                writeQuery={SEARCHED_ITEMS_QUERY}
                listName="items"
                cacheListName="searchedItems"
              />
            )}

            {searchedItemsData.searchedItems.map((item) => (
              <ListItem
                key={item.id}
                item={item}
                selectedItemID={selectedItemID}
                setSelectedItemID={setSelectedItemID}
              />
            ))}
          </>
        )}
      </Styled.List>
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
