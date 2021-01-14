const { DataSource } = require('apollo-datasource')
const db = require('../db')

class inventoryItemAPI extends DataSource {
  initialize(config) {
    this.context = config.context
  }

  getAll() {
    const queryString = `
    SELECT id, item_id AS "itemID", add_date AS "addDate", expiration, amount, location_id AS "locationID"
    FROM inventory_item 
    ORDER BY expiration ASC
    `
    return db.query(queryString).then((results) => results.rows)
  }

  getByID({ id }) {
    const queryString = `
      SELECT id, item_id AS "itemID", add_date AS "addDate", expiration, amount, location_id AS "locationID" 
      FROM inventory_item
      WHERE id = $1
    `
    return db.query(queryString, [id]).then((results) => results.rows[0])
  }

  getSubItem({ id }) {
    const queryString = `
      SELECT item.*, item_type AS "itemType"
      FROM item
      INNER JOIN inventory_item
        ON inventory_item.item_id = item.id
      WHERE inventory_item.id = $1
    `
    return db
      .query(queryString, [Number(id)])
      .then((results) => Promise.resolve(results.rows[0]))
  }

  getLocation({ id }) {
    const queryString = `
      SELECT inventory_item_location.*
      FROM inventory_item_location
      INNER JOIN inventory_item 
        ON inventory_item.location_id = inventory_item_location.id
      WHERE inventory_item.id = $1 
    `
    return db
      .query(queryString, [Number(id)])
      .then((results) => Promise.resolve(results.rows[0]))
  }

  add({
    name,
    addDate,
    expiration,
    amount,
    defaultShelflife,
    category,
    location,
    itemType,
    number,
  }) {
    const queryString = `
      WITH retrieved_item_id AS (
        SELECT item_id_for_insert($1, CAST($6 AS itemtype))
      ), retrieved_location_id AS (
        SELECT location_id_for_insert($5)
      )
      INSERT INTO inventory_item(item_id, add_date, expiration, amount, location_id)
      SELECT
        (SELECT * FROM retrieved_item_id),
        $2 AS add_date,
        $3 AS expiration,
        $4 AS amount,
        (SELECT * FROM retrieved_location_id) AS location_id
      FROM GENERATE_SERIES(1, $7)
      RETURNING *
    `
    return db
      .query(queryString, [
        name,
        addDate,
        expiration,
        amount,
        location,
        itemType,
        number,
      ])
      .then((results) => {
        const shelfLifePromise = () => {
          const updateShelflifeQueryString = `
          UPDATE item
          SET default_shelflife = $1
          WHERE id = $2
          RETURNING *
        `
          return db.query(updateShelflifeQueryString, [
            defaultShelflife,
            results.rows[0].item_id,
          ])
        }

        const categoryPromise = () => {
          const categoryQueryString = `
            UPDATE item
            SET category_id = (SELECT category_id_for_insert($1))
            WHERE id = $2
            RETURNING *
          `
          return db
            .query(categoryQueryString, [category, results.rows[0].item_id])
            .then(() => results.rows[0])
        }

        return Promise.all([shelfLifePromise, categoryPromise]).then(
          () => results.rows[0]
        )
      })
  }

  update({ id, addDate, expiration, amount, location, category, itemType }) {
    console.log({ location, category, expiration })

    const queryString = `
      UPDATE inventory_item
      SET add_date = $2,
          amount = $3,
          expiration = $4
      WHERE id = $1
      RETURNING *
    `
    return db
      .query(queryString, [Number(id), addDate, amount, expiration])
      .then((results) => {
        // Building the return object
        const updatedInventoryItem = {
          id,
          addDate: results.rows[0].add_date,
          expiration: results.rows[0].expiration,
          amount,
        }

        const categoryPromise = () => {
          const categoryQuery = `
          UPDATE item
          SET category_id = (SELECT category_id_for_insert($1))
          WHERE id = $2
          RETURNING *
        `
          return db.query(categoryQuery, [category, results.rows[0].item_id])
        }

        const locationPromise = () => {
          const locationQuery = `
            UPDATE inventory_item
            SET location_id = (SELECT location_id_for_insert($1))
            WHERE id = $2
            RETURNING *
          `
          return db.query(locationQuery, [location, Number(id)])
        }

        return Promise.all([categoryPromise(), locationPromise()]).then(
          (categoryLocationResults) => {
            // Building the return object
            updatedInventoryItem.item = {
              id: results.rows[0].item_id,
              name: categoryLocationResults[0].rows[0].name,
            }

            updatedInventoryItem.category = category
              ? {
                  id: categoryLocationResults[0].rows[0].category_id,
                  name: category,
                }
              : null

            updatedInventoryItem.location = location
              ? {
                  id: categoryLocationResults[1].rows[0].location_id,
                  name: location,
                }
              : null

            return updatedInventoryItem
          }
        )
      })
  }

  delete({ id }) {
    const queryString = `
      DELETE FROM inventory_item
      WHERE id = $1
      RETURNING $1 as id
    `
    return db.query(queryString, [Number(id)]).then((results) => results.rows[0].id)
  }
}

module.exports = inventoryItemAPI
