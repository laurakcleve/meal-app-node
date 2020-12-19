const { DataSource } = require('apollo-datasource')
const db = require('../db')

class ItemAPI extends DataSource {
  initialize(config) {
    this.context = config.context
  }

  getAll() {
    const queryString = `
      SELECT *, default_shelflife AS "defaultShelflife", item_type AS "itemType"
      FROM item 
      ORDER BY name
    `
    return db.query(queryString).then((results) => results.rows)
  }

  getByID({ id }) {
    const queryString = `
      SELECT *, default_shelflife AS "defaultShelflife", item_type AS "itemType" 
      FROM item
      WHERE id = $1
    `
    return db.query(queryString, [id]).then((results) => results.rows[0])
  }

  getByName({ name }) {
    const queryString = `
      SELECT *, default_shelflife AS "defaultShelflife", item_type AS "itemType" 
      FROM item
      WHERE name = $1
    `
    return db.query(queryString, [name]).then((results) => results.rows[0])
  }

  edit({ id, name, categoryId, defaultLocationId, defaultShelflife, itemType }) {
    console.log({
      id,
      name,
      categoryId,
      defaultLocationId,
      defaultShelflife,
      itemType,
    })

    console.log('cat. number', Number(categoryId))

    const queryString = `
      UPDATE item
      SET name = $2,
          category_id = $3,
          default_location_id = $4,
          default_shelflife = $5,
          item_type = $6
      WHERE id = $1
      RETURNING *, item_type AS "itemType", default_shelflife AS "defaultShelflife"
    `
    return db
      .query(queryString, [
        id,
        name,
        categoryId,
        defaultLocationId,
        defaultShelflife,
        itemType,
      ])
      .then((results) => results.rows[0])
  }

  delete({ id }) {
    const queryString = `
      DELETE FROM item
      WHERE id = $1
    `
    return db.query(queryString, [Number(id)]).then((results) => results.rowCount)
  }

  getCategory({ id }) {
    const queryString = `
      SELECT item_category.*
      FROM item_category
      INNER JOIN item ON item.category_id = item_category.id
      WHERE item.id = $1
    `
    return db.query(queryString, [Number(id)]).then((results) => results.rows[0])
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
    return db.query(queryString, [Number(id)]).then((results) => results.rows)
  }

  getDefaultLocation({ id }) {
    const queryString = `
      SELECT inventory_item_location.* 
      FROM inventory_item_location
      INNER JOIN item on item.default_location_id = inventory_item_location.id
      WHERE item.id = $1
    `
    return db.query(queryString, [Number(id)]).then((results) => results.rows[0])
  }

  getPurchases({ id }) {
    const queryString = `
      SELECT *, 
        purchase_id AS "purchaseId", 
        item_id AS "itemId", 
        weight_amount AS "weightAmount", 
        weight_unit AS "weightUnit",
        quantity_amount AS "quantityAmount",
        quantity_unit AS "quantityUnit"
      FROM purchase_item
      WHERE item_id = $1
    `
    return db.query(queryString, [Number(id)]).then((results) => results.rows)
  }

  getCountsAs({ id }) {
    const queryString = `
      SELECT *
      FROM item generic
      JOIN item_counts_as ica ON ica.generic_item_id = generic.id
      WHERE ica.specific_item_id = $1
    `
    return db.query(queryString, [Number(id)]).then((results) => results.rows)
  }
}

module.exports = ItemAPI
