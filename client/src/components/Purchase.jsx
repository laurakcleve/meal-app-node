import React from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { gql } from 'apollo-boost'
import PropTypes from 'prop-types'
import moment from 'moment'

import * as Styled from './Layout.styles'
import Sidebar from './Sidebar'

const Purchase = ({ match, history }) => {
  const { data, loading, error } = useQuery(PURCHASE_QUERY, {
    variables: { id: match.params.id },
  })

  const [deletePurchase] = useMutation(DELETE_PURCHASE_MUTATION, {
    onCompleted: () => history.push('/purchases'),
  })

  const submitDelete = (event) => {
    event.preventDefault()
    if (window.confirm('Delete purchase?')) {
      deletePurchase({ variables: { id: match.params.id } })
    }
  }

  return (
    <Styled.Container>
      <Sidebar>Sidebar</Sidebar>
      <Styled.List>
        {data && data.purchase && (
          <>
            <h2>
              {`${moment(Number(data.purchase.date)).format('M/D/YY')} - ${
                data.purchase.location.name
                }`}
            </h2>
            <button type="button" onClick={(event) => submitDelete(event)}>
              Delete
            </button>
          </>
        )}
      </Styled.List>
    </Styled.Container>
  )
}

const PURCHASE_QUERY = gql`
  query purchase($id: ID!) {
    purchase(id: $id) {
      id
      date
      location {
        id
        name
      }
    }
  }
`

const DELETE_PURCHASE_MUTATION = gql`
  mutation deletePurchase($id: ID!) {
    deletePurchase(id: $id)
  }
`

Purchase.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
}

export default Purchase
