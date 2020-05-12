import React, { useState, useRef } from 'react'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PropTypes from 'prop-types'

import * as Styled from './PurchaseItemAddForm.styles'

const PurchaseItemAddForm = ({ purchaseId, PURCHASE_QUERY }) => {
  const [itemName, setItemName] = useState('')
  const [weightAmount, setWeightAmount] = useState('')
  const [weightUnit, setWeightUnit] = useState('')
  const [quantityAmount, setQuantityAmount] = useState('')
  const [quantityUnit, setQuantityUnit] = useState('')
  const [price, setPrice] = useState('')
  const [number, setNumber] = useState('1')
  const [isNonFoodItem, setIsNonFoodItem] = useState(false)
  const [doNotInventory, setDoNotInventory] = useState(false)

  const { data } = useQuery(ITEMS_QUERY)

  const [addPurchaseItem] = useMutation(ADD_PURCHASE_ITEM_MUTATION, {
    refetchQueries: [{ query: PURCHASE_QUERY, variables: { id: purchaseId } }],
    onCompleted: () => {
      resetInputs()
      focusItemNameInput()
    },
  })

  const list = data && data.items ? data.items : []

  const itemNameInput = useRef(null)

  const focusItemNameInput = () => {
    itemNameInput.current.focus()
  }

  const saveItem = (event) => {
    event.preventDefault()
    if (itemName) {
      addPurchaseItem({
        variables: {
          purchaseId: Number(purchaseId),
          name: itemName,
          price: Number(price) || null,
          weightAmount: Number(weightAmount) || null,
          weightUnit: weightUnit || null,
          quantityAmount: Number(quantityAmount) || null,
          quantityUnit: quantityUnit || null,
          number: Number(number) || 1,
        },
      })
    }
  }

  const resetInputs = () => {
    setItemName('')
    setPrice('')
    setWeightAmount('')
    setWeightUnit('')
    setQuantityAmount('')
    setQuantityUnit('')
    setNumber('1')
  }

  return (
    <Styled.AddForm>
      <Styled.Item
        id="itemName"
        label="Item"
        value={itemName}
        onChange={(event) => setItemName(event.target.value)}
        list={list}
        forwardRef={itemNameInput}
      />

      <Styled.Price
        id="price"
        label="Price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
      />

      <Styled.Combo>
        <Styled.Label>Weight</Styled.Label>
        <Styled.Amount
          className="input"
          id="weightAmount"
          value={weightAmount}
          onChange={(event) => setWeightAmount(event.target.value)}
          placeholder="1.23"
        />
        <Styled.Unit
          className="input"
          id="weightUnit"
          value={weightUnit}
          onChange={(event) => setWeightUnit(event.target.value)}
          placeholder="oz"
        />
      </Styled.Combo>

      <Styled.Combo>
        <Styled.Label>Quantity</Styled.Label>
        <Styled.Amount
          className="input"
          id="quantityAmount"
          value={quantityAmount}
          onChange={(event) => setQuantityAmount(event.target.value)}
          placeholder="12"
        />
        <Styled.Unit
          className="input"
          id="quantityUnit"
          value={quantityUnit}
          onChange={(event) => setQuantityUnit(event.target.value)}
          placeholder="units"
        />
      </Styled.Combo>

      <div>
        <Styled.Label>Add multiple?</Styled.Label>
        <Styled.Multiple
          id="number"
          value={number}
          onChange={(event) => setNumber(event.target.value)}
        />
      </div>

      <label htmlFor="isNonFoodItem" className="checkbox">
        <input
          type="checkbox"
          name="isNonFoodItem"
          checked={isNonFoodItem}
          onChange={() => setIsNonFoodItem(!isNonFoodItem)}
        />
        <Styled.Label className="labelText">Non food item</Styled.Label>
      </label>

      <label htmlFor="doNotInventory" className="checkbox">
        <input
          type="checkbox"
          name="doNotInventory"
          checked={doNotInventory}
          onChange={() => setDoNotInventory(!doNotInventory)}
        />
        <Styled.Label className="labelText">Do not inventory</Styled.Label>
      </label>

      <button type="submit" onClick={(event) => saveItem(event)}>
        Save
      </button>
    </Styled.AddForm>
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

const ADD_PURCHASE_ITEM_MUTATION = gql`
  mutation addPurchaseItem(
    $purchaseId: ID!
    $name: String!
    $price: Float
    $weightAmount: Float
    $weightUnit: String
    $quantityAmount: Float
    $quantityUnit: String
    $number: Int!
  ) {
    addPurchaseItem(
      purchaseId: $purchaseId
      name: $name
      price: $price
      weightAmount: $weightAmount
      weightUnit: $weightUnit
      quantityAmount: $quantityAmount
      quantityUnit: $quantityUnit
      number: $number
    ) {
      id
    }
  }
`

PurchaseItemAddForm.propTypes = {
  purchaseId: PropTypes.string.isRequired,
  PURCHASE_QUERY: PropTypes.shape({}).isRequired,
}

export default PurchaseItemAddForm
