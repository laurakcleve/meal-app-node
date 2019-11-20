import React from 'react'
import PropTypes from 'prop-types'
import * as Styled from './ListItem.styles'
import ItemDetails from './ItemDetails'

const ListItem = ({ item, selectedItemID, setSelectedItemID }) => {
  const toggleOpen = () => {
    if (selectedItemID === item.id) {
      setSelectedItemID('')
    } else {
      setSelectedItemID(item.id)
    }
  }

  return (
    <Styled.ListItem onClick={toggleOpen}>
      <Styled.TitleBar>{item.name}</Styled.TitleBar>
      {selectedItemID === item.id && <ItemDetails item={item} />}
    </Styled.ListItem>
  )
}

ListItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  selectedItemID: PropTypes.string.isRequired,
  setSelectedItemID: PropTypes.func.isRequired,
}

export default ListItem
