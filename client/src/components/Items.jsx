import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'

import * as Styled from './Items.styles'
import ListItem from './ListItem'

const Items = () => {
  const { data, loading } = useQuery(ITEMS_QUERY)
  return (
    <Styled.Container>
      {loading && <p>Loading...</p>}
      {data &&
        data.items.map(
          (item) => console.log(item.name) || <ListItem name={item.name} />
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

export default Items
