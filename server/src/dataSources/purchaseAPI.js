const { DataSource } = require('apollo-datasource')
const db = require('../db')

class PurchaseAPI extends DataSource {
  initialize(config) {
    this.context = config.context
  }

  getAll() {
    const queryString = `
      SELECT * FROM purchase
      ORDER BY date DESC
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

  add({ date, location }) {
    const queryString = `
      WITH retrieved_purchase_location_id AS (
        SELECT purchase_location_id_for_insert($2)
      )
      INSERT INTO purchase(date, location_id)
      SELECT 
        $1 AS date, 
        (SELECT * FROM retrieved_purchase_location_id) AS location_id
      RETURNING *
    `
    return db.query(queryString, [date, location]).then((results) => results.rows[0])
  }
}

module.exports = PurchaseAPI
