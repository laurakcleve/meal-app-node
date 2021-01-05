import React, { useState, useEffect } from 'react'
import { useQuery, gql } from '@apollo/client'
import moment from 'moment'

import * as Layout from '../Layout.styles'
import * as Styled from './Inventory.styles'
import Sidebar from '../Sidebar'
import SortingHeader from '../SortingHeader'
import InventoryLocations from './InventoryLocations'
import Search from '../Search'
import ListItem from '../ListItem'
import InventoryItemDetails from './InventoryItemDetails'
import AddItem from './AddItem'
import Expander from '../Expander'

const Inventory = () => {
  const [displayedItems, setDisplayedItems] = useState([])
  const [searchText, setSearchText] = useState('')
  const [selectedItemID, setSelectedItemID] = useState('')
  const [selectedElement, setSelectedElement] = useState()
  const [selectedElementHeight, setSelectedElementHeight] = useState()
  const [selectedLocationName, setSelectedLocationName] = useState('all')
  const [adding, setAdding] = useState(true)
  const [sortBy, setSortBy] = useState('expiration')
  const [sortOrder, setSortOrder] = useState('asc')

  const { data, loading } = useQuery(INVENTORY_ITEMS_QUERY)

  const toggleItemOpen = (event, id) => {
    setSelectedElement(event.target)
    setSelectedElementHeight(event.target.offsetHeight)

    if (selectedItemID === id) {
      setSelectedItemID('')
    } else {
      setSelectedItemID(id)
    }
  }

  useEffect(() => {
    if (selectedElement) {
      setSelectedElementHeight(selectedElement.offsetHeight)
    }
  }, [selectedElement])

  useEffect(() => {
    if (data && data.inventoryItems) {
      let newDisplayedItems = data.inventoryItems.filter((item) => {
        return (
          selectedLocationName === 'all' ||
          (item.location && item.location.name === selectedLocationName)
        )
      })

      // Search
      if (searchText.length > 0) {
        newDisplayedItems = newDisplayedItems.filter((item) => {
          return item.item.name.includes(searchText)
        })
      }

      console.log('sorting by', sortBy)
      // Sort
      newDisplayedItems = newDisplayedItems.sort((a, b) => {
        if (sortBy === 'name') {
          if (a.item.name < b.item.name) {
            return -1
          }
          if (a.item.name > b.item.name) {
            return 1
          }
          return 0
        }

        if (sortBy === 'location') {
          if (a.location.name < b.location.name) {
            return -1
          }
          if (a.location.name > b.location.name) {
            return 1
          }
          return 0
        }

        if (sortBy === 'expiration') {
          if (!a.expiration) {
            return -1
          }
          if (!b.expiration) {
            return 1
          }
          if (Number(a.expiration) < Number(b.expiration)) {
            return -1
          }
          if (Number(a.expiration) > Number(b.expiration)) {
            return 1
          }
          return 0
        }
        return 0
      })

      if (sortOrder === 'desc') {
        newDisplayedItems.reverse()
      }

      setDisplayedItems(newDisplayedItems)
    }
  }, [data, searchText, selectedLocationName, sortBy, sortOrder])

  useEffect(() => {
    if (selectedElement)
      window.scrollTo({
        top: selectedElement.offsetTop - 100,
        behavior: 'smooth',
      })
  }, [selectedElement, selectedElementHeight])

  const setSort = (newSortBy) => {
    let newSortOrder
    if (newSortBy === sortBy) {
      newSortOrder = sortOrder === 'asc' ? 'desc' : 'asc'
    } else {
      newSortOrder = 'asc'
    }

    setSortBy(newSortBy)
    setSortOrder(newSortOrder)
  }

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
            <Search searchText={searchText} setSearchText={setSearchText} />
          )}

          <button
            className="add"
            type="button"
            onClick={() => setAdding(!adding)}
          >
            <span className={adding ? 'close' : 'open'}>+</span>
          </button>

          {adding && <AddItem />}

          <SortingHeader>
            <div className="name">
              <button type="button" onClick={() => setSort('name')}>
                Name
              </button>
            </div>
            <div className="location">
              <button type="button" onClick={() => setSort('location')}>
                Location
              </button>
            </div>
            <div>
              <button type="button" onClick={() => setSort('expiration')}>
                Expiration
              </button>
            </div>
          </SortingHeader>

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
