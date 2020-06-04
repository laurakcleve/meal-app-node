import React from 'react'
import { useQuery } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import PropTypes from 'prop-types'
import moment from 'moment'

import * as Layout from './Layout.styles'
import * as Styled from './Item.styles'
import { ListItem } from './ListItem'
import { unitPrice, inventoryAmountString } from '../utils'

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

        <Layout.List>
          {data &&
            data.itemById.purchases.map((purchaseInstance) => (
              <ListItem key={purchaseInstance.id}>
                <Styled.Date>
                  {moment(Number(purchaseInstance.purchase.date)).format(
                    'M/D/YY'
                  )}
                </Styled.Date>
                <Styled.Location>
                  {purchaseInstance.purchase.location.name}
                </Styled.Location>
                <Styled.Price>
                  {purchaseInstance.price &&
                    `$${Number(purchaseInstance.price).toFixed(2)}`}
                </Styled.Price>
                <Styled.Amount>
                  {inventoryAmountString(
                    purchaseInstance.weightAmount,
                    purchaseInstance.weightUnit,
                    purchaseInstance.quantityAmount,
                    purchaseInstance.quantityUnit
                  )}
                </Styled.Amount>
                <Styled.UnitPrice>
                  {unitPrice(
                    purchaseInstance.price,
                    purchaseInstance.weightAmount,
                    purchaseInstance.weightUnit
                  )}
                </Styled.UnitPrice>
                <Styled.UnitPrice>
                  {unitPrice(
                    purchaseInstance.price,
                    purchaseInstance.quantityAmount,
                    purchaseInstance.quantityUnit
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

Item.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
}

export default Item
