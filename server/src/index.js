const { ApolloServer } = require('apollo-server')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const ItemAPI = require('./dataSources/itemAPI')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    itemAPI: new ItemAPI(),
  }),
})

server.listen().then(({ url }) => console.log(`Running on ${url}`))
