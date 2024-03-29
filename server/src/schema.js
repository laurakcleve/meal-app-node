const { gql } = require('apollo-server')

// why itemById, why not item?
const typeDefs = gql`
  type Query {
    items: [Item]!
    itemById(id: ID!): Item
    itemByName(name: String!): Item
    dishes: [Dish]!
    dish(id: ID!): Dish
    inventoryItems: [InventoryItem]!
    inventoryItem(id: ID!): InventoryItem
    itemLocations: [ItemLocation]!
    itemCategories: [ItemCategory]!
    dishTags: [DishTag]!
    purchases: [Purchase]!
    purchase(id: ID!): Purchase
    purchaseLocations: [PurchaseLocation]
  }

  type Mutation {
    deleteItem(id: ID!): Int
    addPurchase(date: String!, location: String!): Purchase!
    deletePurchase(id: ID!): Int
    addPurchaseItem(
      purchaseId: ID!
      name: String!
      price: Float
      weightAmount: Float
      weightUnit: String
      quantityAmount: Float
      quantityUnit: String
      number: Int!
      itemType: String!
    ): PurchaseItem!
    updatePurchaseItem(
      id: ID!
      name: String!
      price: Float
      weightAmount: Float
      weightUnit: String
      quantityAmount: Float
      quantityUnit: String
    ): PurchaseItem!
    deletePurchaseItem(id: ID!): ID
    addInventoryItem(
      name: String!
      addDate: String
      expiration: String
      amount: String
      defaultShelflife: String
      category: String
      location: String
      itemType: String!
      number: Int!
    ): InventoryItem!
    updateInventoryItem(
      id: ID!
      addDate: String
      expiration: String
      amount: String
      location: String
      category: String
      itemType: String
    ): InventoryItem!
    deleteInventoryItem(id: ID!): ID
    editItem(
      id: ID!
      name: String!
      categoryId: Int
      defaultLocationId: Int
      defaultShelflife: Int
      itemType: String!
      countsAs: [String]
    ): Item!
    addDish(
      name: String!
      tags: [String]
      isActive: Boolean!
      ingredientSets: [IngredientSetInput]!
    ): Dish!
    updateDish(
      id: ID!
      name: String!
      tags: [String]!
      isActive: Boolean!
      ingredientSets: [IngredientSetInput]!
    ): Dish!
    deleteDish(id: ID!): String!
    addDishDate(dishId: ID!, date: String!): DishDate!
    deleteDishDate(id: ID!): ID
  }

  type Item {
    id: ID!
    name: String!
    category: ItemCategory
    dishes: [Dish]
    defaultLocation: ItemLocation
    defaultShelflife: Int
    itemType: String!
    purchases: [PurchaseItem]
    countsAs: [Item]
  }

  type ItemCategory {
    id: ID!
    name: String!
  }

  type Dish {
    id: ID!
    name: String!
    tags: [DishTag]
    isActiveDish: Boolean
    dates: [DishDate]
    ingredientSets: [IngredientSet]
  }

  type DishTag {
    id: ID!
    name: String!
  }

  type DishDate {
    id: ID!
    date: String!
  }

  type IngredientSet {
    id: ID!
    isOptional: Boolean
    ingredients: [Ingredient]
  }

  type Ingredient {
    id: ID!
    item: Item!
    isInInventory: Boolean
  }

  type InventoryItem {
    id: ID!
    item: Item!
    location: ItemLocation!
    expiration: String
    addDate: String
    amount: String
  }

  type ItemLocation {
    id: ID!
    name: String!
  }

  type Purchase {
    id: ID!
    date: String!
    location: PurchaseLocation
    items: [PurchaseItem]!
  }

  type PurchaseLocation {
    id: ID!
    name: String!
  }

  type PurchaseItem {
    id: ID!
    item: Item!
    price: Float
    weightAmount: Float
    weightUnit: String
    quantityAmount: Float
    quantityUnit: String
    purchaseId: Int
    purchase: Purchase
  }

  input IngredientSetInput {
    id: ID!
    isOptional: Boolean!
    ingredients: [IngredientInput]!
  }

  input IngredientInput {
    id: ID!
    item: IngredientItemInput!
    isInInventory: Boolean
  }

  input IngredientItemInput {
    id: ID
    name: String!
  }
`

module.exports = typeDefs
