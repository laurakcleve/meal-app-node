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

  getDishes({ id }) {
    const queryString = `
      WITH generic_items AS (
        SELECT gi.id AS itemID  
        FROM item gi
        INNER JOIN item_counts_as ica on ica.generic_item_id = gi.id
        WHERE ica.specific_item_id = $1
      )
      SELECT DISTINCT dish.*
      FROM item dish
      INNER JOIN ingredient_set ings ON ings.parent_item_id = dish.id
      INNER JOIN ingredient ing ON ing.ingredient_set_id = ings.id
      INNER JOIN item i ON i.id = ing.item_id
      WHERE i.id IN ((SELECT itemID FROM generic_items), $1)
    `
    return db
      .query(queryString, [Number(id)])
      .then((results) => Promise.resolve(results.rows))
  }
}

module.exports = ItemAPI
