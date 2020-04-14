import React from 'react'
import PropTypes from 'prop-types'

import StyledForm from './Form.styles'

const Form = ({ children }) => {
  return <StyledForm>{children}</StyledForm>
}

Form.propTypes = {
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node])
    .isRequired,
}

export default Form
