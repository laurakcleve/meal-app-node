import React from 'react'
import PropTypes from 'prop-types'

import StyledForm from './Form.styles'

const Form = ({ children, className }) => {
  return <StyledForm className={className}>{children}</StyledForm>
}

Form.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
  className: PropTypes.string.isRequired,
}

export default Form
