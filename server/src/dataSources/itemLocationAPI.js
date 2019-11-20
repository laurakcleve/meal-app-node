const { DataSource } = require('apollo-datasource')
const db = require('../db')

class itemLocationAPI extends DataSource {
  initialize(config) {
    this.context = config.context
  }

  getAll() {
    const queryString = `
      SELECT * FROM inventory_item_location 
      ORDER BY name ASC
    `
    return db.query(queryString).then((results) => results.rows)
  }
}

module.exports = itemLocationAPI
