const { ApolloServer } = require('apollo-server')

const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const ItemAPI = require('./dataSources/itemAPI')
const DishAPI = require('./dataSources/dishAPI')
const InventoryItemAPI = require('./dataSources/inventoryItemAPI')

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    itemAPI: new ItemAPI(),
    dishAPI: new DishAPI(),
    inventoryItemAPI: new InventoryItemAPI(),
  }),
})

server.listen().then(({ url }) => console.log(`Running on ${url}`))
