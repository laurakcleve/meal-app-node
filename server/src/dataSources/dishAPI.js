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
      SELECT *, optional AS "isOptional" FROM ingredient_set 
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

  addDish({ name, tags, ingredientSets }) {
    // Building the return object
    const newDish = {}

    const newDishQueryString = `
      INSERT INTO item(name, item_type)
      VALUES($1, 'dish')
      RETURNING *
    `
    return db.query(newDishQueryString, [name]).then((newDishResults) => {
      const newDishID = newDishResults.rows[0].id
      const newDishName = newDishResults.rows[0].name

      // Building the return object
      newDish.id = newDishID
      newDish.name = newDishName
      newDish.ingredientSets = []
      newDish.tags = []

      const tagsPromises = tags.map((tag) => {
        const tagQueryString = `
            WITH retrieved_dish_tag_id AS (
              SELECT tag_id_for_insert($2)
            )
            INSERT INTO item_has_dish_tag(item_id, dish_tag_id) 
            SELECT 
              $1 as item_id, 
              (SELECT * FROM retrieved_dish_tag_id) AS dish_tag_id
            RETURNING *
          `
        return db.query(tagQueryString, [newDishID, tag]).then((tagResults) => {
          // Building the return object
          newDish.tags.push({ id: tagResults.rows[0].id, name: tag })
        })
      })

      return Promise.all(
        tagsPromises.concat(
          ingredientSets.map((ingredientSet, ingredientSetIndex) => {
            // Building the return object
            newDish.ingredientSets.push({})

            const newIngredientSetQueryString = `
              INSERT INTO ingredient_set(parent_item_id, optional)
              VALUES($1, $2)
              RETURNING *
            `
            return db
              .query(newIngredientSetQueryString, [
                newDishID,
                ingredientSet.isOptional,
              ])
              .then((newIngredientSetResults) => {
                const newIngredientSetID = newIngredientSetResults.rows[0].id

                // Building the return object
                newDish.ingredientSets[ingredientSetIndex].id = newIngredientSetID
                newDish.ingredientSets[ingredientSetIndex].isOptional =
                  newIngredientSetResults.rows[0].optional
                newDish.ingredientSets[ingredientSetIndex].ingredients = []

                return Promise.all(
                  ingredientSet.ingredients.map((ingredient, ingredientIndex) => {
                    const newIngredientQueryString = `
                      WITH new_item_id AS (
                        INSERT INTO item(name, item_type)
                        SELECT $1, 'baseItem'
                        WHERE NOT EXISTS (
                          SELECT 1
                          FROM item
                          WHERE name = $1
                        )
                        RETURNING id
                      ), existing_item_id AS (
                        SELECT id
                        FROM item
                        WHERE name = $1
                      ), item_id_for_insert AS (
                        SELECT id 
                        FROM new_item_id 
                        UNION SELECT id FROM existing_item_id
                      )
                      INSERT INTO ingredient(ingredient_set_id, item_id)
                      SELECT $2 AS ingredient_set_id, id AS item_id
                      FROM (SELECT id FROM item_id_for_insert) AS the_id
                      RETURNING *
                    `
                    return db
                      .query(newIngredientQueryString, [
                        ingredient.item.name,
                        newIngredientSetID,
                      ])
                      .then((newIngredientresults) => {
                        const newIngredient = newIngredientresults.rows[0]

                        // Building the return object
                        newDish.ingredientSets[ingredientSetIndex].ingredients[
                          ingredientIndex
                        ] = {
                          id: newIngredient.id,
                          item: {
                            id: newIngredient.item_id,
                            name: ingredient.name,
                          },
                        }
                      })
                  })
                )
              })
          })
        )
      ).then(() => Promise.resolve(newDish))
    })
  }

  updateDish({ id, name, tags, ingredientSets }) {
    // Building the return object
    const updatedDish = { id, name, tags: [] }

    const deleteTagsPromise = () => {
      const queryString = `
        DELETE FROM item_has_dish_tag
        WHERE item_id = $1  
      `
      return db.query(queryString, [Number(id)])
    }

    const deleteIngredientSetsPromise = () => {
      const queryString = `
      DELETE FROM ingredient_set
      WHERE parent_item_id = $1
      `
      return db.query(queryString, [Number(id)])
    }

    return Promise.all([deleteTagsPromise(), deleteIngredientSetsPromise()])
      .then(() => {
        const updateDishQueryString = `
          UPDATE item
          SET name = $2
          WHERE id = $1
          RETURNING *
        `
        const namePromise = db.query(updateDishQueryString, [Number(id), name])

        const tagsPromises = tags.map((tag) => {
          const tagQueryString = `
            WITH retrieved_dish_tag_id AS (
              SELECT tag_id_for_insert($2)
            )
            INSERT INTO item_has_dish_tag(item_id, dish_tag_id) 
            SELECT 
              $1 as item_id, 
              (SELECT * FROM retrieved_dish_tag_id) AS dish_tag_id
            RETURNING *
          `
          return db.query(tagQueryString, [id, tag]).then((tagResults) => {
            // Building the return object
            updatedDish.tags.push({ id: tagResults.rows[0].id, name: tag })
          })
        })

        return Promise.all([namePromise].concat(tagsPromises))
      })
      .then(() => {
        // Building the return object
        updatedDish.ingredientSets = []

        return Promise.all(
          ingredientSets.map((ingredientSet, ingredientSetIndex) => {
            // Building the return object
            updatedDish.ingredientSets.push({})

            const newIngredientSetQueryString = `
            INSERT INTO ingredient_set(parent_item_id, optional)
            VALUES($1, $2)
            RETURNING *
          `
            return db
              .query(newIngredientSetQueryString, [
                Number(id),
                ingredientSet.isOptional,
              ])
              .then((newIngredientSetResults) => {
                const newIngredientSetID = newIngredientSetResults.rows[0].id

                // Building the return object
                updatedDish.ingredientSets[
                  ingredientSetIndex
                ].id = newIngredientSetID
                updatedDish.ingredientSets[ingredientSetIndex].isOptional =
                  newIngredientSetResults.rows[0].optional
                updatedDish.ingredientSets[ingredientSetIndex].ingredients = []

                return Promise.all(
                  ingredientSet.ingredients.map((ingredient, ingredientIndex) => {
                    // fix this, this is the code in the database's function and is redundant
                    const newIngredientQueryString = `
                    WITH new_item_id AS (
                      INSERT INTO item(name, item_type)
                      SELECT $1, 'baseItem'
                      WHERE NOT EXISTS (
                        SELECT 1
                        FROM item
                        WHERE name = $1
                      )
                      RETURNING id
                    ), existing_item_id AS (
                      SELECT id
                      FROM item
                      WHERE name = $1
                    ), item_id_for_insert AS (
                      SELECT id 
                      FROM new_item_id 
                      UNION SELECT id FROM existing_item_id
                    )
                    INSERT INTO ingredient(ingredient_set_id, item_id)
                    SELECT $2 AS ingredient_set_id, id AS item_id
                    FROM (SELECT id FROM item_id_for_insert) AS the_id
                    RETURNING *
                  `
                    return db
                      .query(newIngredientQueryString, [
                        ingredient.item.name,
                        newIngredientSetID,
                      ])
                      .then((newIngredientresults) => {
                        const newIngredient = newIngredientresults.rows[0]

                        // Building the return object
                        updatedDish.ingredientSets[ingredientSetIndex].ingredients[
                          ingredientIndex
                        ] = {
                          id: newIngredient.id,
                          item: {
                            id: newIngredient.item_id,
                            name: ingredient.name,
                          },
                        }
                      })
                  })
                )
              })
          })
        ).then(() => Promise.resolve(updatedDish))
      })
  }
}

module.exports = DishAPI
