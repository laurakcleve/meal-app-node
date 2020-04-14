import React from 'react'
import PropTypes from 'prop-types'

import * as Styled from './Input.styles'

const Input = ({ id, label, type, list }) => {
  console.log(list)
  return (
    <>
      <Styled.Label htmlFor={id}>
        <div className="label">{label}</div>
        <Styled.Input type={type} list={list.length > 0 ? 'list' : null} />
      </Styled.Label>
      {list.length > 0 && (
        <datalist id="list">
          {list.map((item) => (
            <option key={item.id}>{item.name}</option>
          ))}
        </datalist>
      )}
    </>
  )
}

Input.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    })
  ),
}

Input.defaultProps = {
  type: 'text',
  list: [],
}

export default Input
