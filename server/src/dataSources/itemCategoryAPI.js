const { DataSource } = require('apollo-datasource')
const db = require('../db')

class itemCategoryAPI extends DataSource {
  initialize(config) {
    this.context = config.context
  }

  getAll() {
    const queryString = `
      SELECT * FROM item_category 
      ORDER BY name ASC
    `
    return db.query(queryString).then((results) => results.rows)
  }
}

module.exports = itemCategoryAPI
