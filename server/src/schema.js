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
  }

  type Item {
    id: ID!
    name: String!
  }

  type Dish {
    id: ID!
    name: String!
  }

  type InventoryItem {
    id: ID!
    item: Item!
    location: ItemLocation!
  }

  type ItemLocation {
    id: ID!
    name: String!
  }
`

module.exports = typeDefs
