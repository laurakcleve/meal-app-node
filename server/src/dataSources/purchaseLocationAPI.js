const { DataSource } = require('apollo-datasource')
const db = require('../db')

class PurchaseLocationAPI extends DataSource {
  initialize(config) {
    this.context = config.context
  }

  getAll() {
    const queryString = `
      SELECT * FROM purchase_location
    `
    return db.query(queryString).then((results) => results.rows)
  }
}

module.exports = PurchaseLocationAPI
