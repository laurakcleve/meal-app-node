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
      ORDER BY name
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

  getTags({ id }) {
    const queryString = `
      SELECT * FROM dish_tag
      INNER JOIN item_has_dish_tag ihdt ON ihdt.dish_tag_id = dish_tag.id
      WHERE ihdt.item_id = $1
    `
    return db.query(queryString, [id]).then((results) => results.rows)
  }
}

module.exports = DishAPI
