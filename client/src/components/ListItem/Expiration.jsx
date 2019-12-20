import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const Expiration = ({ date }) => {
  return <div>{moment(Number(date)).fromNow()}</div>
}

Expiration.propTypes = {
  date: PropTypes.string.isRequired,
}

export default Expiration
