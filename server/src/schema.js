const { gql } = require('apollo-server')

const typeDefs = gql`
  type Query {
    items: [Item]!
    item(id: ID!): Item
  }

  type Item {
    id: ID!
    name: String!
  }
`

module.exports = typeDefs
