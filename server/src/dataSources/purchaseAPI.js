const { DataSource } = require('apollo-datasource')
const db = require('../db')

class PurchaseAPI extends DataSource {
  initialize(config) {
    this.context = config.context
  }

  getAll() {
    const queryString = `
      SELECT * FROM purchase
    `
    return db.query(queryString).then((results) => results.rows)
  }

  getByID({ id }) {
    const queryString = `
      SELECT * FROM purchase
      WHERE id = $1
    `
    return db.query(queryString, [id]).then((results) => results.rows[0])
  }

  getLocation({ id }) {
    const queryString = `
      SELECT purchase_location.*
      FROM purchase_location
      INNER JOIN purchase ON purchase.location_id = purchase_location.id
      WHERE purchase.id = $1
    `
    return db.query(queryString, [Number(id)]).then((results) => results.rows[0])
  }
}

module.exports = PurchaseAPI
