const resolvers = {
  Query: {
    items: (_, __, { dataSources }) => dataSources.itemAPI.getAll(),
    item: (_, { id }, { dataSources }) => dataSources.itemAPI.getByID({ id }),
    dishes: (_, __, { dataSources }) => dataSources.dishAPI.getAll(),
    dish: (_, { id }, { dataSources }) => dataSources.dishAPI.getByID({ id }),
  },
}

module.exports = resolvers
