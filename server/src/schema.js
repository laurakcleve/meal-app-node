const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    items: [Item]!
    item(id: ID!): Item
    dishes: [Dish]!
    dish(id: ID!): Dish
  }

  type Item {
    id: ID!
    name: String!
  }

  type Dish {
    id: ID!
    name: String!
  }
`

module.exports = typeDefs
