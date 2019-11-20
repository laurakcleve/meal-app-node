import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import * as Styled from './Layout.styles'
import Search from './Search'
import ListItem from './ListItem'

const Inventory = () => {
  const client = useApolloClient()
  const [selectedItemID, setSelectedItemID] = useState('')
  const { data, loading } = useQuery(INVENTORY_ITEMS_QUERY)
  const { data: searchedInventoryItemsData } = useQuery(
    SEARCHED_INVENTORY_ITEMS_QUERY
  )

  useEffect(() => {
    if (data && data.inventoryItems) {
      client.writeData({ data: { searchedInventoryItems: data.inventoryItems } })
    }
  }, [client, data])

  return (
    <Styled.Container>
      {loading && <p>Loading...</p>}

      {searchedInventoryItemsData &&
        searchedInventoryItemsData.searchedInventoryItems && (
          <>
            {data && data.inventoryItems && (
              <Search
                readQuery={INVENTORY_ITEMS_QUERY}
                writeQuery={SEARCHED_INVENTORY_ITEMS_QUERY}
                listName="inventoryItems"
                cacheListName="searchedInventoryItems"
              />
            )}

            {searchedInventoryItemsData.searchedInventoryItems.map((item) => (
              <ListItem
                key={item.id}
                item={{ id: item.id, name: item.item.name }}
                selectedItemID={selectedItemID}
                setSelectedItemID={setSelectedItemID}
              />
            ))}
          </>
        )}
    </Styled.Container>
  )
}

const INVENTORY_ITEMS_QUERY = gql`
  query inventoryItems {
    inventoryItems {
      id
      item {
        id
        name
      }
    }
  }
`

const SEARCHED_INVENTORY_ITEMS_QUERY = gql`
  query searchedInventoryItems {
    searchedInventoryItems @client {
      id
      item {
        id
        name
      }
    }
  }
`

export default Inventory
