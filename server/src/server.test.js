const { createTestClient } = require('apollo-server-testing')
const { gql } = require('apollo-server')
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

const { query } = createTestClient(server)

test('fetches all items', () => {
  expect.assertions(2)
  return query({ query: GET_ITEMS }).then((results) => {
    expect(results.errors).toBeUndefined()
    expect(results.data.items).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
        }),
      ])
    )
  })
})

test('fetches item by id', () => {
  expect.assertions(2)
  return query({ query: GET_ONE_ITEM }).then((results) => {
    expect(results.errors).toBeUndefined()
    expect(results.data.item).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
    })
  })
})

test('fetches all dishes', () => {
  expect.assertions(2)
  return query({ query: GET_DISHES }).then((results) => {
    expect(results.errors).toBeUndefined()
    expect(results.data.dishes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
        }),
      ])
    )
  })
})

test('fetches dish by id', () => {
  expect.assertions(2)
  return query({ query: GET_ONE_DISH }).then((results) => {
    expect(results.errors).toBeUndefined()
    expect(results.data.dish).toMatchObject({
      id: expect.any(String),
      name: expect.any(String),
    })
  })
})

test('fetches all inventory items', () => {
  expect.assertions(2)
  return query({ query: GET_INVENTORY_ITEMS }).then((results) => {
    expect(results.errors).toBeUndefined()
    expect(results.data.inventoryItems).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          item: expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
          }),
          location: expect.objectContaining({
            id: expect.any(String),
            name: expect.any(String),
          }),
        }),
      ])
    )
  })
})

test('fetches inventory item by id', () => {
  expect.assertions(2)
  return query({ query: GET_ONE_INVENTORY_ITEM }).then((results) => {
    expect(results.errors).toBeUndefined()
    expect(results.data.inventoryItem).toMatchObject({
      id: expect.any(String),
      item: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
      }),
      location: expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
      }),
    })
  })
})

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
    item(id: 182) {
      id
      name
    }
  }
`

const GET_DISHES = gql`
  query dishes {
    dishes {
      id
      name
    }
  }
`

const GET_ONE_DISH = gql`
  query dish {
    dish(id: 182) {
      id
      name
    }
  }
`

const GET_INVENTORY_ITEMS = gql`
  query inventoryItems {
    inventoryItems {
      id
      item {
        id
        name
      }
      location {
        id
        name
      }
    }
  }
`

const GET_ONE_INVENTORY_ITEM = gql`
  query inventoryItem {
    inventoryItem(id: 697) {
      id
      item {
        id
        name
      }
      location {
        id
        name
      }
    }
  }
`
