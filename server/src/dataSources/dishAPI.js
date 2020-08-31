const { DataSource } = require('apollo-datasource')
const db = require('../db')

class DishAPI extends DataSource {
  initialize(config) {
    this.context = config.context
  }

  getAll() {
    const queryString = `
      SELECT *, is_active_dish AS "isActiveDish" FROM item 
      WHERE item_type = 'dish'
      ORDER BY name
    `
    return db.query(queryString).then((results) => results.rows)
  }

  getByID({ id }) {
    const queryString = `
      SELECT *, is_active_dish AS "isActiveDish" FROM item
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

  getDates({ id }) {
    const queryString = `
      SELECT * FROM dish_date 
      WHERE dish_id = $1
      ORDER BY date DESC
    `
    return db.query(queryString, [id]).then((results) => results.rows)
  }

  getIngredientSets({ id }) {
    const queryString = `
      SELECT * FROM ingredient_set 
      WHERE parent_item_id = $1
    `
    return db.query(queryString, [id]).then((results) => results.rows)
  }

  getIngredientSetIngredients({ id }) {
    const queryString = `
      SELECT * FROM ingredient 
      WHERE ingredient_set_id = $1
    `
    return db.query(queryString, [id]).then((results) => results.rows)
  }

  getIngredientItem({ id }) {
    const queryString = `
      SELECT * FROM item 
      INNER JOIN ingredient ON ingredient.item_id = item.id
      WHERE ingredient.id = $1
    `
    return db.query(queryString, [id]).then((results) => results.rows[[0]])
  }
}

module.exports = DishAPI
