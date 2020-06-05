import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import PropTypes from 'prop-types'
import moment from 'moment'

import * as Layout from '../Layout.styles'
import * as Styled from './Item.styles'
import { ListItem } from '../ListItem'
import { unitPrice, inventoryAmountString } from '../../utils'

const Item = ({ match, history }) => {
  const { data, loading, error } = useQuery(ITEM_QUERY, {
    variables: { id: match.params.id },
  })

  const [deleteItem] = useMutation(DELETE_ITEM_MUTATION, {
    onCompleted: () => history.push('/items'),
  })

  const submitDelete = (event) => {
    event.preventDefault()
    if (window.confirm('Delete item?')) {
      deleteItem({ variables: { id: match.params.id } })
    }
  }

  return (
    <Layout.Container>
      <Styled.Main>
        {loading && <h2>Loading...</h2>}
        {error && <h2>Error</h2>}

        {data && data.itemById && (
          <>
            <Styled.Header>
              <h1>{data.itemById.name}</h1>
              <button type="button" onClick={(event) => submitDelete(event)}>
                Delete
              </button>
            </Styled.Header>

            {data.itemById.category && (
              <Styled.Detail>
                <h2>Category</h2>
                <p>{data.itemById.category.name}</p>
              </Styled.Detail>
            )}

            <Styled.Detail>
              <h2>Type</h2>
              <p>{data.itemById.itemType}</p>
            </Styled.Detail>

            {data.itemById.defaultShelflife && (
              <Styled.Detail>
                <h2>Default shelflife</h2>
                <p>{data.itemById.defaultShelflife}</p>
              </Styled.Detail>
            )}

            {data.itemById.defaultLocation && (
              <Styled.Detail>
                <h2>Default location</h2>
                <p>{data.itemById.defaultLocation.name}</p>
              </Styled.Detail>
            )}
          </>
        )}

        <Layout.List>
          {data &&
            data.itemById.purchases.map((purchase) => (
              <ListItem key={purchase.id}>
                <Styled.Date>
                  {moment(Number(purchase.purchase.date)).format('M/D/YY')}
                </Styled.Date>
                <Styled.Location>
                  {purchase.purchase.location.name}
                </Styled.Location>
                <Styled.Price>
                  {purchase.price && `$${Number(purchase.price).toFixed(2)}`}
                </Styled.Price>
                <Styled.Amount>
                  {inventoryAmountString(
                    purchase.weightAmount,
                    purchase.weightUnit,
                    purchase.quantityAmount,
                    purchase.quantityUnit
                  )}
                </Styled.Amount>
                <Styled.UnitPrice>
                  {unitPrice(
                    purchase.price,
                    purchase.weightAmount,
                    purchase.weightUnit
                  )}
                </Styled.UnitPrice>
                <Styled.UnitPrice>
                  {unitPrice(
                    purchase.price,
                    purchase.quantityAmount,
                    purchase.quantityUnit
                  )}
                </Styled.UnitPrice>
              </ListItem>
            ))}
        </Layout.List>
      </Styled.Main>
    </Layout.Container>
  )
}

const ITEM_QUERY = gql`
  query itemById($id: ID!) {
    itemById(id: $id) {
      id
      name
      itemType
      defaultShelflife
      defaultLocation {
        id
        name
      }
      category {
        id
        name
      }
      purchases {
        id
        price
        weightAmount
        weightUnit
        quantityAmount
        quantityUnit
        purchase {
          date
          location {
            id
            name
          }
        }
      }
    }
  }
`

const DELETE_ITEM_MUTATION = gql`
  mutation deleteItem($id: ID!) {
    deleteItem(id: $id)
  }
`

Item.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default Item
