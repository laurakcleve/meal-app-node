import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import * as Styled from './Layout.styles'
import Sidebar from './Sidebar'
import ItemCategories from './ItemCategories'
import Search from './Search'
import { ListItem, TitleBar, TitleName } from './ListItem'
import { ItemDetails } from './ListItem/Details'

const Items = () => {
  const [displayedItems, setDisplayedItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [searchedItems, setSearchedItems] = useState([])
  const [selectedItemID, setSelectedItemID] = useState('')
  const [selectedCategoryName, setSelectedCategoryName] = useState('all')

  const { data, loading } = useQuery(ITEMS_QUERY)

  const toggleItemOpen = (id) => {
    if (selectedItemID === id) {
      setSelectedItemID('')
    } else {
      setSelectedItemID(id)
    }
  }

  useEffect(() => {
    if (data && data.items) {
      let newFilteredItems
      if (selectedCategoryName === 'all') {
        newFilteredItems = data.items
      } else {
        newFilteredItems = data.items.filter(
          (item) => item.category && item.category.name === selectedCategoryName
        )
      }
      setFilteredItems(newFilteredItems)
    }
  }, [data, selectedCategoryName])

  useEffect(() => {
    if (searchedItems.length > 0) setDisplayedItems(filteredItems)
  }, [filteredItems, searchedItems.length])

  useEffect(() => {
    setDisplayedItems(searchedItems)
  }, [searchedItems])

  return (
    <Styled.Container>
      <Sidebar>
        <ItemCategories
          selectedCategoryName={selectedCategoryName}
          setSelectedCategoryName={setSelectedCategoryName}
        />
      </Sidebar>
      <Styled.List>
        {loading && <p>Loading...</p>}
        <>
          {data && data.items && (
            <Search items={filteredItems} set={setSearchedItems} />
          )}

          {displayedItems.map((item) => (
            <ListItem key={item.id} onClick={() => toggleItemOpen(item.id)}>
              <TitleBar>
                <TitleName name={item.name} />
              </TitleBar>
              {selectedItemID === item.id && <ItemDetails item={item} />}
            </ListItem>
          ))}
        </>
      </Styled.List>
    </Styled.Container>
  )
}

const ITEMS_QUERY = gql`
  query items {
    items {
      id
      name
      category {
        id
        name
      }
    }
  }
`

export default Items
