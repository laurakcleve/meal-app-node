import React, { useState, useEffect } from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import * as Layout from './Layout.styles'
import * as Styled from './Items.styles'
import Sidebar from './Sidebar'
import ItemCategories from './ItemCategories'
import Search from './Search'
import { ListItem } from './ListItem'

const Items = () => {
  const [displayedItems, setDisplayedItems] = useState([])
  const [filteredItems, setFilteredItems] = useState([])
  const [searchedItems, setSearchedItems] = useState([])
  const [selectedCategoryName, setSelectedCategoryName] = useState('all')

  const { data, loading } = useQuery(ITEMS_QUERY)

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
    <Layout.Container>
      <Sidebar>
        <ItemCategories
          selectedCategoryName={selectedCategoryName}
          setSelectedCategoryName={setSelectedCategoryName}
        />
      </Sidebar>
      <Layout.List>
        {loading && <p>Loading...</p>}

        <>
          {data && data.items && (
            <Search items={filteredItems} set={setSearchedItems} />
          )}

          {displayedItems.map((item) => (
            <Styled.CustomLink to={`/item/${item.id}`} key={item.id}>
              <ListItem>
                <Styled.Name>{item.name}</Styled.Name>
              </ListItem>
            </Styled.CustomLink>
          ))}
        </>
      </Layout.List>
    </Layout.Container>
  )
}

export const ITEMS_QUERY = gql`
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
