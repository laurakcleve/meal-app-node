const { gql } = require('apollo-server')

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
    addInventoryItem(
      name: String!
      addDate: String
      expiration: String
      amount: String
      defaultShelflife: String
      category: String
      location: String
      itemType: String!
    ): InventoryItem!
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
  }

  type ItemCategory {
    id: ID!
    name: String!
  }

  type Dish {
    id: ID!
    name: String!
    tags: [DishTag]
    isActive: Boolean
  }

  type DishTag {
    id: ID!
    name: String!
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
`

module.exports = typeDefs
