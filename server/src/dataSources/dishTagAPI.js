const { DataSource } = require('apollo-datasource')
const db = require('../db')

class dishTagAPI extends DataSource {
  initialize(config) {
    this.context = config.context
  }

  getAll() {
    const queryString = `
      SELECT * FROM dish_tag 
      ORDER BY name ASC
    `
    return db.query(queryString).then((results) => results.rows)
  }
}

module.exports = dishTagAPI
