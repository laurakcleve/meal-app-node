import React, { useState, useEffect, useRef } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import * as Styled from './Layout.styles'
import Sidebar from './Sidebar'
import InventoryLocations from './InventoryLocations'
import Search from './Search'
import { ListItem, TitleBar, TitleName } from './ListItem'
// import { ItemDetails } from './ListItem/Details'
import ItemDetails from './ListItem/Details/ItemDetails'
import Expiration from './ListItem/Expiration'
import Location from './ListItem/Location'

const Inventory = () => {
  const [displayedItems, setDisplayedItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [searchedItems, setSearchedItems] = useState([])
  const [selectedItemID, setSelectedItemID] = useState('')
  const [selectedElement, setSelectedElement] = useState()
  const [selectedLocationName, setSelectedLocationName] = useState('all')

  const { data, loading } = useQuery(INVENTORY_ITEMS_QUERY)

  const toggleItemOpen = (event, id) => {
    setSelectedElement(event.target)

    if (selectedItemID === id) {
      setSelectedItemID('')
    } else {
      setSelectedItemID(id)
    }
  }

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

  useEffect(() => {
    if (selectedElement)
      window.scrollTo({ top: selectedElement.offsetTop - 100, behavior: 'smooth' })
  }, [selectedElement])

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
            <ListItem key={item.id}>
              <TitleBar onClick={(e) => toggleItemOpen(e, item.id)}>
                <TitleName name={item.item.name} />
                <Location name={item.location.name} />
                <Expiration date={item.expiration} />
              </TitleBar>
              {selectedItemID === item.id && <ItemDetails item={item} />}
            </ListItem>
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
        dishes {
          id
          name
        }
      }
      location {
        id
        name
      }
      expiration
      addDate
      amount
    }
  }
`

export default Inventory
