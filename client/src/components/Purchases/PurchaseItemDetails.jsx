import React, { useState } from 'react'

import * as Styled from './PurchaseItemDetails.styles'
import PurchaseItemEditForm from './PurchaseItemEditForm'

const PurchaseItemDetails = ({ purchaseItem }) => {
  const [isEditing, setIsEditing] = useState(false)

  return (
    <Styled.Container>
      {isEditing && (
        <PurchaseItemEditForm
          id={purchaseItem.id}
          name={purchaseItem.item.name}
          weightAmount={
            purchaseItem.weightAmount
              ? purchaseItem.weightAmount.toString()
              : ''
          }
          weightUnit={purchaseItem.weightUnit || ''}
          quantityAmount={
            purchaseItem.quantityAmount
              ? purchaseItem.quantityAmount.toString()
              : ''
          }
          quantityUnit={purchaseItem.quantityUnit || ''}
          price={purchaseItem.price.toString()}
          setIsEditing={setIsEditing}
        />
      )}

      <button type="button">Delete</button>
      {!isEditing && (
        <button type="button" onClick={() => setIsEditing(true)}>
          Edit
        </button>
      )}
    </Styled.Container>
  )
}

export default PurchaseItemDetails
