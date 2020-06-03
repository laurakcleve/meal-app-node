import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import PropTypes from 'prop-types'

import * as Layout from './Layout.styles'
import * as Styled from './Item.styles'

const Item = ({ match }) => {
  const { data, loading, error } = useQuery(ITEM_QUERY, {
    variables: { id: match.params.id },
  })

  return (
    <Layout.Container>
      <Styled.Main>
        {loading && <h2>Loading...</h2>}
        {error && <h2>Error</h2>}

        {data && data.itemById && <h1>{data.itemById.name}</h1>}
      </Styled.Main>
    </Layout.Container>
  )
}

const ITEM_QUERY = gql`
  query itemById($id: ID!) {
    itemById(id: $id) {
      id
      name
    }
  }
`

Item.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default Item
