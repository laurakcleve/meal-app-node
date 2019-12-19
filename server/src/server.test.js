const { createTestClient } = require('apollo-server-testing')
const { gql } = require('apollo-server')

const server = require('./index')

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
          expiration: expect.any(String),
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
      expiration: expect.any(String),
    })
  })
})

test('fetches all item locations', () => {
  expect.assertions(2)
  return query({ query: GET_ITEM_LOCATIONS }).then((results) => {
    expect(results.errors).toBeUndefined()
    expect(results.data.itemLocations).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
        }),
      ])
    )
  })
})

test('fetches all item categories', () => {
  expect.assertions(2)
  return query({ query: GET_ITEM_CATEGORIES }).then((results) => {
    expect(results.errors).toBeUndefined()
    expect(results.data.itemCategories).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
        }),
      ])
    )
  })
})

test('fetches all dish tags', () => {
  expect.assertions(2)
  return query({ query: GET_DISH_TAGS }).then((results) => {
    expect(results.errors).toBeUndefined()
    expect(results.data.dishTags).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: expect.any(String),
          name: expect.any(String),
        }),
      ])
    )
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
      expiration
    }
  }
`

const GET_ONE_INVENTORY_ITEM = gql`
  query inventoryItem {
    inventoryItem(id: 1092) {
      id
      item {
        id
        name
      }
      location {
        id
        name
      }
      expiration
    }
  }
`

const GET_ITEM_LOCATIONS = gql`
  query itemLocations {
    itemLocations {
      id
      name
    }
  }
`

const GET_ITEM_CATEGORIES = gql`
  query itemCategories {
    itemCategories {
      id
      name
    }
  }
`

const GET_DISH_TAGS = gql`
  query dishTags {
    dishTags {
      id
      name
    }
  }
`
