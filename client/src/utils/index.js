import pluralize from 'pluralize'

const unitPrice = (price, amount, unit) => {
  if (Number(amount) <= 0) {
    return null
  }

  const formattedAmount = (Number(price) / Number(amount)).toFixed(2).toString()
  const formattedUnit = unit ? pluralize(unit, 1) : 'ea'

  return `$${formattedAmount}/${formattedUnit}`
}

export default unitPrice
