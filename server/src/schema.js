const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    items: [Item]!
    item(id: ID!): Item
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
    addPurchase(date: String!, location: String!): Purchase!
    deletePurchase(id: ID!): Int
  }

  type Item {
    id: ID!
    name: String!
    category: ItemCategory
    dishes: [Dish]
  }

  type ItemCategory {
    id: ID!
    name: String!
  }

  type Dish {
    id: ID!
    name: String!
    tags: [DishTag]
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
  }

  type PurchaseLocation {
    id: ID!
    name: String!
  }
`

module.exports = typeDefs
