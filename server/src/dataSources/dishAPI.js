const { DataSource } = require('apollo-datasource')
const db = require('../db')

class DishAPI extends DataSource {
  initialize(config) {
    this.context = config.context
  }

  getAll() {
    const queryString = `
      SELECT * FROM item 
      WHERE item_type = 'dish'
    `
    return db.query(queryString).then((results) => results.rows)
  }

  getByID({ id }) {
    const queryString = `
      SELECT * FROM item
      WHERE id = $1
    `
    return db.query(queryString, [id]).then((results) => results.rows[0])
  }
}

module.exports = DishAPI
