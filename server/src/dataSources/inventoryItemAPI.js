const { DataSource } = require('apollo-datasource')
const db = require('../db')

class inventoryItemAPI extends DataSource {
  initialize(config) {
    this.context = config.context
  }

  getAll() {
    const queryString = `
    SELECT * FROM inventory_item 
    `
    return db.query(queryString).then((results) => results.rows)
  }

  getByID({ id }) {
    const queryString = `
      SELECT * FROM inventory_item
      WHERE id = $1
    `
    return db.query(queryString, [id]).then((results) => results.rows[0])
  }

  getInventoryItemItem({ id }) {
    const queryString = `
      SELECT item.id, item.name
      FROM item
      INNER JOIN inventory_item
        ON inventory_item.item_id = item.id
      WHERE inventory_item.id = $1
    `
    return db
      .query(queryString, [Number(id)])
      .then((results) => Promise.resolve(results.rows[0]))
  }
}

module.exports = inventoryItemAPI
