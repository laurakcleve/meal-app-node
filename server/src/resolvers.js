const resolvers = {
  Query: {
    items: (_, __, { dataSources }) => dataSources.itemAPI.getAll(),
    item: (_, { id }, { dataSources }) => dataSources.itemAPI.getByID({ id }),
    dishes: (_, __, { dataSources }) => dataSources.dishAPI.getAll(),
    dish: (_, { id }, { dataSources }) => dataSources.dishAPI.getByID({ id }),
    inventoryItems: (_, __, { dataSources }) =>
      dataSources.inventoryItemAPI.getAll(),
    inventoryItem: (_, { id }, { dataSources }) =>
      dataSources.inventoryItemAPI.getByID({ id }),
  },

  InventoryItem: {
    item: (InventoryItem, __, { dataSources }) =>
      dataSources.inventoryItemAPI.getInventoryItemItem({
        id: InventoryItem.id,
      }),
  },
}

module.exports = resolvers
