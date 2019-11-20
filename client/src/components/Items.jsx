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
  const { data: filteredItemsData } = useQuery(FILTERED_ITEMS_QUERY)

  useEffect(() => {
    if (data && data.items) {
      client.writeData({ data: { filteredItems: data.items } })
    }
  }, [client, data])

  return (
    <Styled.Container>
      <Sidebar />
      <Styled.List>
        {loading && <p>Loading...</p>}

        {filteredItemsData && filteredItemsData.filteredItems && (
          <>
            {data && data.items && (
              <Search
                readQuery={ITEMS_QUERY}
                writeQuery={FILTERED_ITEMS_QUERY}
                listName="items"
                cacheListName="filteredItems"
              />
            )}

            {filteredItemsData.filteredItems.map((item) => (
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

const FILTERED_ITEMS_QUERY = gql`
  query filteredItems {
    filteredItems @client {
      id
      name
    }
  }
`

export default Items
