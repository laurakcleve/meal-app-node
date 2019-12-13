import React, { useState, useEffect } from 'react'
import { useQuery, useApolloClient } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import * as Styled from './Layout.styles'
import Sidebar from './Sidebar'
import InventoryLocations from './InventoryLocations'
import Search from './Search'
import ListItem from './ListItem'

const Inventory = () => {
  const [displayedItems, setDisplayedItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [searchedItems, setSearchedItems] = useState([])
  const [selectedItemID, setSelectedItemID] = useState('')
  const [selectedLocationName, setSelectedLocationName] = useState('all')

  const { data, loading } = useQuery(INVENTORY_ITEMS_QUERY)

  useEffect(() => {
    if (data && data.inventoryItems) {
      let newFilteredItems
      if (selectedLocationName === 'all') {
        newFilteredItems = data.inventoryItems
      } else {
        newFilteredItems = data.inventoryItems.filter(
          (item) => item.location.name === selectedLocationName
        )
      }
      setFilteredItems(newFilteredItems)
    }
  }, [data, selectedLocationName])

  useEffect(() => {
    if (searchedItems.length > 0) setDisplayedItems(filteredItems)
  }, [filteredItems, searchedItems.length])

  useEffect(() => {
    setDisplayedItems(searchedItems)
  }, [searchedItems])

  return (
    <Styled.Container>
      <Sidebar>
        <InventoryLocations
          selectedLocationName={selectedLocationName}
          setSelectedLocationName={setSelectedLocationName}
        />
      </Sidebar>
      <Styled.List>
        {loading && <p>Loading...</p>}

        <>
          {data && data.inventoryItems && (
            <Search items={filteredItems} set={setSearchedItems} />
          )}

          {displayedItems.map((item) => (
            <ListItem
              key={item.id}
              item={{ id: item.id, name: item.item.name }}
              selectedItemID={selectedItemID}
              setSelectedItemID={setSelectedItemID}
            />
          ))}
        </>
      </Styled.List>
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
      location {
        id
        name
      }
    }
  }
`

export default Inventory
