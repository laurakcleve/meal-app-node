const { createTestClient } = require('apollo-server-testing')
const { gql } = require('apollo-server')
const { ApolloServer } = require('apollo-server')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const ItemAPI = require('./dataSources/itemAPI')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ itemAPI: new ItemAPI() }),
})

const { query } = createTestClient(server)

const GET_ITEMS = gql`
  query items {
    items {
      id
      name
    }
  }
`

const GET_ONE_ITEM = gql`
  query item {
    item(id: 100) {
      id
      name
    }
  }
`

test('fetches all items', async () => {
  const res = await query({ query: GET_ITEMS })
  expect(res).toMatchSnapshot()
})

test('fetches item by id', () => {
  expect.assertions(1)
  return query({ GET_ONE_ITEM }).then((results) => expect(results).not.toBeNull())
})
