const { DataSource } = require('apollo-datasource')
const db = require('../db')

class ItemAPI extends DataSource {
  initialize(config) {
    this.context = config.context
  }

  getAll() {
    const queryString = `
    SELECT * FROM item 
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

  getCategory({ id }) {
    const queryString = `
      SELECT item_category.*
      FROM item_category
      INNER JOIN item ON item.category_id = item_category.id
      WHERE item.id = $1
    `
    return db
      .query(queryString, [Number(id)])
      .then((results) => Promise.resolve(results.rows[0]))
  }
}

module.exports = ItemAPI
