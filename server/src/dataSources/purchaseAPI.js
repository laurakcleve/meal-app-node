const { DataSource } = require('apollo-datasource')
const db = require('../db')

class PurchaseAPI extends DataSource {
  initialize(config) {
    this.context = config.context
  }

  getAll() {
    const queryString = `
      SELECT * FROM purchase
      ORDER BY date DESC
    `
    return db.query(queryString).then((results) => results.rows)
  }

  getByID({ id }) {
    const queryString = `
      SELECT * FROM purchase
      WHERE id = $1
    `
    return db.query(queryString, [id]).then((results) => results.rows[0])
  }

  getLocation({ id }) {
    const queryString = `
      SELECT purchase_location.*
      FROM purchase_location
      INNER JOIN purchase ON purchase.location_id = purchase_location.id
      WHERE purchase.id = $1
    `
    return db.query(queryString, [Number(id)]).then((results) => results.rows[0])
  }

  getItems({ id }) {
    const queryString = `
      SELECT 
        id, 
        purchase_id AS "purchaseId",  
        item_id AS "itemId",
        price, 
        weight_amount AS "weightAmount",
        weight_unit AS "weightUnit",
        quantity_amount AS "quantityAmount",
        quantity_unit AS "quantityUnit"
      FROM purchase_item
      WHERE purchase_id = $1
      ORDER BY id DESC
    `
    return db.query(queryString, [Number(id)]).then((results) => results.rows)
  }

  getPurchaseItemSubItem({ id }) {
    const queryString = `
      SELECT *
      FROM item
      WHERE id = $1 
    `
    return db.query(queryString, [Number(id)]).then((results) => results.rows[0])
  }

  add({ date, location }) {
    const queryString = `
      WITH retrieved_purchase_location_id AS (
        SELECT purchase_location_id_for_insert($2)
      )
      INSERT INTO purchase(date, location_id)
      SELECT 
        $1 AS date, 
        (SELECT * FROM retrieved_purchase_location_id) AS location_id
      RETURNING *
    `
    return db.query(queryString, [date, location]).then((results) => results.rows[0])
  }

  delete({ id }) {
    const queryString = `
       DELETE FROM purchase
       WHERE id = $1
    `
    return db.query(queryString, [Number(id)]).then((results) => results.rowCount)
  }

  addPurchaseItem({
    purchaseId,
    name,
    price,
    weightAmount,
    weightUnit,
    quantityAmount,
    quantityUnit,
    number,
    itemType,
  }) {
    const queryString = `
      WITH retrieved_item_id AS (
        SELECT item_id_for_insert($2, CAST($9 AS itemtype)) 
      )
      INSERT INTO purchase_item(
        purchase_id,
        item_id, 
        price, 
        weight_amount, 
        weight_unit, 
        quantity_amount, 
        quantity_unit)
      SELECT
        $1 AS purchase_id,
        (SELECT * FROM retrieved_item_id),
        $3 AS price,
        $4 AS weight_amount,
        $5 AS weight_unit,
        $6 AS quantity_amount,
        $7 AS quantity_unit
      FROM GENERATE_SERIES(1, $8)
      RETURNING *
    `
    return db
      .query(queryString, [
        purchaseId,
        name,
        price,
        weightAmount,
        weightUnit,
        quantityAmount,
        quantityUnit,
        number,
        itemType,
      ])
      .then((results) => results.rows[0])
  }

  updatePurchaseItem({
    id,
    name,
    price,
    weightAmount,
    weightUnit,
    quantityAmount,
    quantityUnit,
  }) {
    const queryString = `
      WITH retrieved_item_id AS (
        SELECT item_id_for_insert($2) 
      )
      UPDATE purchase_item
      SET item_id = (SELECT * FROM retrieved_item_id), 
        price = $3, 
        weight_amount = $4, 
        weight_unit = $5, 
        quantity_amount = $6, 
        quantity_unit = $7
      WHERE id = $1
      RETURNING 
        id, 
        purchase_id AS "purchaseId",  
        item_id AS "itemId",
        price, 
        weight_amount AS "weightAmount",
        weight_unit AS "weightUnit",
        quantity_amount AS "quantityAmount",
        quantity_unit AS "quantityUnit"
    `
    return db
      .query(queryString, [
        Number(id),
        name,
        price,
        weightAmount,
        weightUnit,
        quantityAmount,
        quantityUnit,
      ])
      .then((results) => results.rows[0])
  }

  deletePurchaseItem({ id }) {
    const queryString = `
      DELETE FROM purchase_item
      WHERE id = $1
    `
    return db.query(queryString, [Number(id)]).then(() => id)
  }
}

module.exports = PurchaseAPI
