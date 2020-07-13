import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import moment from 'moment'

import * as Layout from '../Layout.styles'
import * as Styled from './Inventory.styles'
import Sidebar from '../Sidebar'
import InventoryLocations from './InventoryLocations'
import Search from '../Search'
import ListItem from '../ListItem'
import InventoryItemDetails from './InventoryItemDetails'
import AddItem from './AddItem'
import Expander from '../Expander'

const Inventory = () => {
  const [displayedItems, setDisplayedItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [searchedItems, setSearchedItems] = useState([])
  const [selectedItemID, setSelectedItemID] = useState('')
  const [selectedElement, setSelectedElement] = useState()
  const [selectedLocationName, setSelectedLocationName] = useState('all')
  const [adding, setAdding] = useState(true)

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
      window.scrollTo({
        top: selectedElement.offsetTop - 100,
        behavior: 'smooth',
      })
  }, [selectedElement])

  return (
    <Layout.Container>
      <Sidebar>
        <InventoryLocations
          selectedLocationName={selectedLocationName}
          setSelectedLocationName={setSelectedLocationName}
        />
      </Sidebar>

      <Layout.List>
        {loading && <p>Loading...</p>}

        <>
          {data && data.inventoryItems && (
            <Search items={filteredItems} set={setSearchedItems} />
          )}

          <button
            className="add"
            type="button"
            onClick={() => setAdding(!adding)}
          >
            <span className={adding ? 'close' : 'open'}>+</span>
          </button>

          {adding && <AddItem />}

          {displayedItems.map((item) => (
            <ListItem
              key={item.id}
              onClick={(e) => toggleItemOpen(e, item.id)}
              expander={
                selectedItemID === item.id && (
                  <Expander>
                    <InventoryItemDetails inventoryItem={item} />
                  </Expander>
                )
              }
            >
              <Styled.Name>{item.item.name}</Styled.Name>
              <Styled.Location>{item.location.name}</Styled.Location>
              <Styled.Expiration>
                {moment(Number(item.expiration)).fromNow()}
              </Styled.Expiration>
            </ListItem>
          ))}
        </>
      </Layout.List>
    </Layout.Container>
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
